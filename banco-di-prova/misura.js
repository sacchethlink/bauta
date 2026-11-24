// Misura quanti dati personali Bauta lascia scoperti sul banco di prova.
// Uso: node banco-di-prova/misura.js banco-di-prova/dati.jsonl
const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
const Core = new Function(html.split('// CORE-START')[1].split('// CORE-END')[0] + ';return Core;')();
const leggi = f => fs.existsSync(f) ? fs.readFileSync(f, 'utf8').trim().split('\n').filter(Boolean).map(JSON.parse) : [];
const tutte = leggi(process.argv[2] || path.join(__dirname, 'dati.jsonl'));
const gretelTutte = leggi(path.join(__dirname, 'dati-gretel.jsonl'));
const metaG = Math.floor(gretelTutte.length / 2), esempiG = gretelTutte.slice(0, metaG), gretel = gretelTutte.slice(metaG);
// Metà dei testi serve a trovare gli errori (esempi), l'altra metà, mai guardata, serve a misurare: così il voto non è gonfiato.
const meta = Math.floor(tutte.length / 2);
const esempi = tutte.slice(0, meta), righe = tutte.length > 1 ? tutte.slice(meta) : tutte;

function misura(opts, righe) {
  const perLabel = {}; let piiTot = 0, piiCoperti = 0, altroTot = 0, altroCoperti = 0, datiInteri = 0, datiTot = 0;
  for (const r of righe) {
    const t = r.testo, n = t.length;
    const pii = new Uint8Array(n), cop = new Uint8Array(n);
    for (const d of r.dati) for (let i = d.start; i < d.end && i < n; i++) pii[i] = 1;
    for (const e of Core.analyze(t, opts)) for (let i = e.s; i < e.e; i++) cop[i] = 1;
    for (let i = 0; i < n; i++) {
      if (/\s/.test(t[i])) continue;
      if (pii[i]) { piiTot++; if (cop[i]) piiCoperti++; } else { altroTot++; if (cop[i]) altroCoperti++; }
    }
    for (const d of r.dati) {
      const L = (perLabel[d.label] ||= { tot: 0, interi: 0, car: 0, carCop: 0 });
      let tutti = true;
      for (let i = d.start; i < d.end && i < n; i++) { if (/\s/.test(t[i])) continue; L.car++; if (cop[i]) L.carCop++; else tutti = false; }
      L.tot++; datiTot++; if (tutti) { L.interi++; datiInteri++; }
    }
  }
  return { perLabel, piiTot, piiCoperti, altroTot, altroCoperti, datiInteri, datiTot };
}
const pct = (a, b) => b ? (100 * a / b).toFixed(1).replace('.', ',') + '%' : '–';
const out = [];
out.push(`# Banco di prova di Bauta\n`);
out.push(`Due banchi di prova pubblici con testi italiani sintetici. Per ognuno, metà dei testi serve a cercare gli errori e l'altra metà, mai guardata, a dare il voto.\n`);
const banchi = [['ai4privacy (frasi brevi)', righe, '[ai4privacy/open-pii-masking-500k-ai4privacy](https://huggingface.co/datasets/ai4privacy/open-pii-masking-500k-ai4privacy), CC BY 4.0'], ['Gretel (documenti finanziari)', gretel, '[gretelai/synthetic_pii_finance_multilingual](https://huggingface.co/datasets/gretelai/synthetic_pii_finance_multilingual), Apache 2.0']].filter(b => b[1].length);
for (const [banco, dati, fonte] of banchi) for (const [nome, opts] of [['Reversibile', {}], ['Anonima', { anon: true }]]) {
  const m = misura(opts, dati);
  out.push(`## ${banco} · modalità ${nome}\n`);
  out.push(`Testi: ${dati.length} (${fonte}).\n`);
  out.push(`- Dati coperti per intero: **${pct(m.datiInteri, m.datiTot)}** (${m.datiInteri} su ${m.datiTot})`);
  out.push(`- Caratteri di dati personali coperti: **${pct(m.piiCoperti, m.piiTot)}**`);
  out.push(`- Testo normale coperto per eccesso: **${pct(m.altroCoperti, m.altroTot)}**\n`);
  out.push(`| Tipo di dato (etichetta del dataset) | Quanti | Coperti per intero | Caratteri coperti |`);
  out.push(`|---|---:|---:|---:|`);
  for (const [k, v] of Object.entries(m.perLabel).sort((a, b) => b[1].tot - a[1].tot)) out.push(`| ${k} | ${v.tot} | ${pct(v.interi, v.tot)} | ${pct(v.carCop, v.car)} |`);
  out.push('');
}
out.push(`_I testi dei banchi di prova sono sintetici: nessun dato reale. Ogni dataset usa le sue categorie, che non coincidono sempre con quelle di Bauta._`);
// esempi di dati non coperti, per capire cosa migliorare (testi sintetici del dataset)
const mancati = {};
for (const r of [...esempi, ...esempiG]) {
  const t = r.testo, cop = new Uint8Array(t.length);
  for (const e of Core.analyze(t, {})) for (let i = e.s; i < e.e; i++) cop[i] = 1;
  for (const d of r.dati) {
    let tutti = true; for (let i = d.start; i < d.end; i++) if (!/\s/.test(t[i]) && !cop[i]) tutti = false;
    if (!tutti && (mancati[d.label] ||= []).length < 40) mancati[d.label].push(`«${t.slice(d.start, d.end)}» … ${t.slice(Math.max(0, d.start - 45), d.start)}[[${t.slice(d.start, d.end)}]]${t.slice(d.end, d.end + 30)}`.replace(/\n/g, ' '));
  }
}
fs.writeFileSync(path.join(__dirname, 'esempi-mancati.txt'), Object.entries(mancati).map(([k, v]) => `## ${k}\n` + v.join('\n')).join('\n\n'));
const md = out.join('\n');
console.log(md);
if (process.env.GITHUB_STEP_SUMMARY) fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, md + '\n');
fs.writeFileSync(path.join(__dirname, 'risultati.md'), md + '\n');
