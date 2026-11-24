// Test del motore di Bauta. Si esegue con: node test/test-motore.js
// Legge il motore direttamente da index.html, così si prova esattamente il codice che usa la pagina.
const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
const code = html.split('// CORE-START')[1].split('// CORE-END')[0];
const Core = new Function(code + ';return Core;')();

let ok = 0, ko = 0;
const check = (nome, cond) => { if (cond) ok++; else { ko++; console.log('  ✗ ' + nome); } };

// 1. Ogni dato elencato deve sparire dal testo coperto
const casi = [
  ['nome con titolo', 'Ho parlato con la Dott.ssa Laura Bianchi ieri.', ['Laura Bianchi']],
  ['nome e cognome', 'Il dipendente Luca Ferraro è in ferie.', ['Luca Ferraro']],
  ['cognome ripetuto', 'Luca Ferraro ha chiamato. Ferraro richiamerà.', ['Luca Ferraro', 'Ferraro']],
  ['nome straniero a metà frase', 'Domani arriva anche Kowalczyk da Varsavia.', ['Kowalczyk', 'Varsavia']],
  ['nome in maiuscolo', 'Intestatario: ROSSI MARIO', ['ROSSI MARIO']],
  ['codice fiscale', 'C.F. RSSMRA85H12F205Y', ['RSSMRA85H12F205Y']],
  ['partita IVA', 'P.IVA 12345678903', ['12345678903']],
  ['IBAN con spazi', 'IBAN IT60 X054 2811 1010 0000 0123 456.', ['IT60 X054 2811 1010 0000 0123 456']],
  ['carta', 'carta 4111 1111 1111 1111', ['4111 1111 1111 1111']],
  ['email', 'scrivi a luca.ferraro@esempio.it', ['luca.ferraro@esempio.it']],
  ['telefono', 'chiama il +39 333.123.4567 o lo 0437 123456', ['333.123.4567', '0437 123456']],
  ['indirizzo', 'residente in Via Garibaldi 12, 32100 Belluno', ['Garibaldi 12', '32100 Belluno']],
  ['azienda', 'per conto della Dolomiti Impianti S.r.l. e di Dolomiti Impianti', ['Dolomiti Impianti']],
  ['data di nascita', 'nato il 01/01/1980', ['01/01/1980']],
  ['età', 'Ferraro, 45 anni, è stato assente', ['45 anni']],
  ['salute', 'è assente per un\'ernia del disco e assume insulina', ['ernia del disco', 'insulina']],
  ['salute con contesto', 'la paziente è affetta da diabete di tipo 2', ['diabete di tipo 2']],
  ['sindacato', 'è iscritto alla CGIL', ['CGIL']],
  ['religione', 'È musulmano e fa il Ramadan', ['musulmano', 'Ramadan']],
  ['giudiziario', 'ha precedenti penali', ['precedenti penali']],
  ['matricola e pratica', 'Matricola 4521, pratica n. PR-2024/0012', ['4521', 'PR-2024/0012']],
  ['targa', 'auto targata AB 123 CD', ['AB 123 CD']],
  ['documento', 'carta d\'identità CA12345AB', ['CA12345AB']],
  ['catasto', 'Foglio 12, particella 345, sub. 6', ['Foglio 12, particella 345, sub. 6']],
  ['importo', 'rimborso di 1.240 €', ['1.240']],
  ['sito e profilo', 'sito www.esempio.it e profilo @luca_ferraro', ['www.esempio.it', '@luca_ferraro']],
  ['IP', 'accesso da 192.168.1.10.', ['192.168.1.10']],
];
const copri = (t, opts = {}) => {
  const ents = Core.analyze(t, opts);
  let out = '', p = 0;
  for (const e of ents) { out += t.slice(p, e.s) + '[X]'; p = e.e; }
  return out + t.slice(p);
};
for (const [nome, testo, dati] of casi) {
  const out = copri(testo);
  for (const d of dati) check(`${nome}: "${d}" ancora visibile in → ${out}`, !out.includes(d));
}

// 2. Parole comuni e nomi di strumenti restano leggibili
const pulito = copri('Usiamo ChatGPT, Claude e Gemini in Microsoft Teams. Il Regolamento europeo prevede la Formazione del personale.');
for (const w of ['ChatGPT', 'Claude', 'Gemini', 'Microsoft', 'Teams', 'Regolamento', 'Formazione']) check(`"${w}" coperto senza motivo → ${pulito}`, pulito.includes(w));

// 3. Controlli matematici
check('CF valido', Core.cfValid('RSSMRA85H12F205Y'));
check('CF non valido', !Core.cfValid('RSSMRA85H12F205X'));
check('P.IVA valida', Core.pivaValid('12345678903'));
check('IBAN valido', Core.ibanValid('IT60X0542811101000000123456'));
check('Luhn', Core.luhn('4111111111111111'));

// 4. Liste personali
check('"copri sempre"', !copri('Il progetto aurora parte domani', { hide: [{ text: 'progetto aurora', type: 'ALTRO' }] }).includes('aurora'));
check('"non toccare mai"', copri('Il corso di Hyper Link a Belluno', { never: ['Belluno'] }).includes('Belluno'));

// 5. Ripristino nei formati usati dalle diverse AI
const tab = { '[PERSONA_1]': { value: 'Luca Ferraro' }, '[IBAN_1]': { value: 'IT60X0542811101000000123456' } };
for (const r of ['[PERSONA_1]', '**[PERSONA_1]**', '\\[PERSONA\\_1\\]', 'PERSONA_1', 'PERSONA-1', '{PERSONA_1}', '(PERSONA_1)', '«PERSONA_1»', '[Persona 1]', '[ PERSONA 1 ]']) {
  check(`ripristino di ${r}`, Core.restore(`Gentile ${r},`, tab).text.includes('Luca Ferraro'));
}
check('segnaposto inventato segnalato', Core.restore('[PERSONA_9]', tab).unknown.includes('[PERSONA_9]'));
check('"la persona 1" non viene toccato', Core.restore('la persona 1', tab).text === 'la persona 1');

// 6. Nomi in minuscolo, soprannomi e (in modalità Anonima) persone descritte a parole
const low = copri('ho parlato con mario rossi e poi con luca. Il Gigi, detto "il Biondo", ha chiamato.');
for (const d of ['mario rossi', 'luca', 'Gigi', 'il Biondo']) check(`minuscolo/soprannome: "${d}" ancora visibile in → ${low}`, !low.includes(d));
check('"ha detto che" non è un soprannome', copri('Luca Ferraro ha detto che arriva').includes('detto che arriva'));
check('"rosa" e "viola" come parole comuni restano', copri('ho visto fiori rosa e viola').includes('rosa e viola'));
const desc = 'La figlia del titolare è l\'unica donna del reparto vendite e il nuovo responsabile della logistica è in ferie.';
const an = copri(desc, { anon: true });
for (const d of ['figlia del titolare', "unica donna del reparto vendite", 'responsabile della logistica']) check(`descrizione: "${d}" ancora visibile in → ${an}`, !an.includes(d));
check('in modalità Reversibile le descrizioni restano', copri(desc).includes('figlia del titolare'));

console.log(`\n${ok} controlli superati, ${ko} non superati.`);
process.exit(ko ? 1 : 0);
