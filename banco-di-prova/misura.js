// Misura quanti dati personali Bauta lascia scoperti sul banco di prova.
// Uso: node banco-di-prova/misura.js banco-di-prova/dati.jsonl
const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
const Core = new Function(html.split('// CORE-START')[1].split('// CORE-END')[0] + ';return Core;')();
const righe = fs.readFileSync(process.argv[2] || path.join(__dirname, 'dati.jsonl'), 'utf8').trim().split('\n').map(JSON.parse);

function misura(opts) {
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
out.push(`Testi italiani provati: **${righe.length}**, dal dataset pubblico [ai4privacy/open-pii-masking-500k-ai4privacy](https://huggingface.co/datasets/ai4privacy/open-pii-masking-500k-ai4privacy) (licenza CC BY 4.0, testi sintetici).\n`);
for (const [nome, opts] of [['Reversibile', {}], ['Anonima', { anon: true }]]) {
  const m = misura(opts);
  out.push(`## Modalità ${nome}\n`);
  out.push(`- Dati coperti per intero: **${pct(m.datiInteri, m.datiTot)}** (${m.datiInteri} su ${m.datiTot})`);
  out.push(`- Caratteri di dati personali coperti: **${pct(m.piiCoperti, m.piiTot)}**`);
  out.push(`- Testo normale coperto per eccesso: **${pct(m.altroCoperti, m.altroTot)}**\n`);
  out.push(`| Tipo di dato (etichetta del dataset) | Quanti | Coperti per intero | Caratteri coperti |`);
  out.push(`|---|---:|---:|---:|`);
  for (const [k, v] of Object.entries(m.perLabel).sort((a, b) => b[1].tot - a[1].tot)) out.push(`| ${k} | ${v.tot} | ${pct(v.interi, v.tot)} | ${pct(v.carCop, v.car)} |`);
  out.push('');
}
out.push(`_Il dataset usa le sue categorie: alcune (per esempio SEX, GENDER, TIME, TITLE) Bauta non le considera dati da coprire, quindi lì percentuali basse sono attese._`);
const md = out.join('\n');
console.log(md);
if (process.env.GITHUB_STEP_SUMMARY) fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, md + '\n');
fs.writeFileSync(path.join(__dirname, 'risultati.md'), md + '\n');
