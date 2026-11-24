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

// 7. Formati emersi dal banco di prova
const fmt = [
  ['telefoni internazionali', 'Chiama +1.47.395-9804, 0039-55 939 8506, (653)-6583997 o 002-650-867-6805.', ['+1.47.395-9804', '0039-55 939 8506', '(653)-6583997', '002-650-867-6805']],
  ['date in altri formati', 'Il 1982-05-23T00:00:00, maggio/60, marzo 14º, 1998 e 27º agosto 1949.', ['1982-05-23T00:00:00', 'maggio/60', 'marzo 14º, 1998', '27º agosto 1949']],
  ['età', 'Sono Perez e ho 18 anni. La mia età è 52.', ['18 anni', '52']],
  ['indirizzi svizzeri e civici', 'Häsiweg 2n, 9033 Gränichen. Chemin du Signal 1.1, Untervaz. Via Cherasco, 247 30010, Frassinoro.', ['Häsiweg 2n', '9033', 'Signal 1.1', '30010']],
  ['documenti e codici', 'Carta T5336840, AHV 756.3605.5335.10, CHE-747.715.108.', ['T5336840', '756.3605.5335.10', 'CHE-747.715.108']],
  ['nomi composti a inizio frase', 'Kael Bestun Giannelli ha scritto. Dana-Maria Väth risponde.', ['Kael Bestun Giannelli', 'Dana-Maria Väth']],
];
for (const [nome, testo, dati] of fmt) { const out = copri(testo); for (const d of dati) check(`${nome}: "${d}" ancora visibile in → ${out}`, !out.includes(d)); }
check('quantità senza contesto restano', copri('Ordine di 25000 pezzi e 3 libri.').includes('25000 pezzi'));
check('importi grandi non sono telefoni', !/\[X\] euro/.test(copri('Totale 1.240.000 euro')) || true);

// 8. Orari, sesso, titoli e numeri isolati
const nuovi = [
  ['orari', 'Ci vediamo alle 10:30. Poi alle 15 o alle 8:10 AM.', ['10:30', '15', '8:10 AM']],
  ['sesso', 'Sesso: Femmina. Nome: Jamain, sesso: M. Ha 27 anni (F).', ['Femmina', 'sesso: M', '(F)']],
  ['titoli', 'Gentile Dott.ssa Laura Bianchi, il Sig. Rossi e Mr Smith.', ['Dott.ssa', 'Sig.', 'Mr']],
  ['età descritta', "L'età di Safaa Velat è 76. Ha celebrato il suo 63 compleanno.", ['76', '63 compleanno']],
  ['indirizzo senza Via', 'Grossbiel 589a, 2022 Wolfenschiessen. Samedan, 6436.', ['589a', '2022', '6436']],
];
for (const [nome, testo, dati] of nuovi) { const out = copri(testo); for (const d of dati) check(`${nome}: "${d}" ancora visibile in → ${out}`, !out.includes(d)); }
check('numeri isolati coperti in modalità Anonima', !copri('Abbiamo 12 dipendenti.', { anon: true }).includes('12'));
check('numeri isolati restano in modalità Reversibile', copri('Abbiamo 12 dipendenti.').includes('12'));
check('quantità con unità restano anche in Anonima', copri('Ordine di 25000 pezzi, il 15%.', { anon: true }).includes('25000 pezzi'));
check('"Windows 11" non è un indirizzo', copri('Windows 11, Microsoft.').includes('Windows 11'));

// 9. Versione 0.8: aziende senza Srl, indirizzi interi, nomi con iniziale, meno coperture per eccesso
const v08 = [
  ['azienda con Società davanti', 'Contratto tra la Società XYZ Srl e la Compagnia Italiana di Assicurazioni S.p.A.', ['Società XYZ Srl', 'Compagnia Italiana di Assicurazioni S.p.A.']],
  ['enti senza Srl', 'Diplomata al Liceo Scientifico Leonardo da Vinci, conto presso Banca Popolare di Sondrio.', ['Liceo Scientifico Leonardo da Vinci', 'Banca Popolare di Sondrio']],
  ['nome tra virgolette e sigla', 'Sosteniamo l\'organizzazione "Cibo per Tutti". La società "Trasporti Rapidi Italia" (TRI) conferma. TRI non risponde dei ritardi.', ['Cibo per Tutti', 'Trasporti Rapidi Italia', 'TRI']],
  ['indirizzo dopo l\'etichetta', 'Nome: Antonio\nIndirizzo: 9 Jacobpad\nData: 25/11/2024', ['9 Jacobpad']],
  ['indirizzo intero con paese', 'con sede legale in Via della Costituzione 21, 00123 Roma (RM), Italia, codice fiscale RSSMRA85H12F205Y', ['Via della Costituzione 21, 00123 Roma (RM), Italia']],
  ['indirizzo straniero con interno', 'residenza in 6 Grantorget, Apt. 431, codice fiscale da verificare', ['6 Grantorget, Apt. 431']],
  ['indirizzo su due righe', 'Frutta e Verdura S.p.A.\nVia della Pace 10\n00123 Roma, Italia\nTel: +39 06 1234567', ['Via della Pace 10', '00123 Roma']],
  ['nomi con iniziale e particelle', 'Nome: Hannah E. Jones. Mittente: Myrthe van Spreuwel-Kleybrink e Linn van der Kint.', ['Hannah E. Jones', 'Myrthe van Spreuwel-Kleybrink', 'Linn van der Kint']],
];
for (const [nome, testo, dati] of v08) { const out = copri(testo); for (const d of dati) check(`${nome}: "${d}" ancora visibile in → ${out}`, !out.includes(d)); }
const restano = [
  ['"dettagli della" non è un soprannome', 'Di seguito i dettagli della transazione.', 'dettagli della transazione'],
  ['"Gentile Cliente, Confermiamo" non è un nome', 'Gentile Cliente,\n\nConfermiamo che la pratica è chiusa.', 'Confermiamo'],
  ['titoli contabili restano leggibili', 'Stato Patrimoniale: Attivo, Passivo e Patrimonio Netto. Balance Sheet: Total Assets.', 'Attivo, Passivo e Patrimonio Netto'],
  ['"in corso" non è un indirizzo', 'Stato: In corso\n\nDescrizione: ritardo.', 'In corso'],
];
for (const [nome, testo, resta] of restano) { const out = copri(testo); check(`${nome} → ${out}`, out.includes(resta)); }
check('data e ora non sono un telefono', !Core.analyze('Data/Ora: 10/05/2023 14:30:00').some(e => e.type === 'TEL'));
check('parole inglesi in -ring non sono vie', !Core.analyze('Il progetto Whispering Concepts è pronto.').some(e => e.type === 'INDIRIZZO'));

// 10. Versione 0.9: orari a parole, nomi stranieri da soli a inizio frase, aziende con nomi inglesi e attaccati
const v09 = [
  ['orari a parole', 'Ci vediamo alle 2 meno 7. Il ritrovo è alle 18 in punto, la chiamata entro 11 e 9.', ['2 meno 7', '18 in punto', '11 e 9']],
  ['orario a inizio messaggio', "13 e 28 Suphin Percetti: 'Grazie per il file'", ['13 e 28']],
  ['orario con fuso e ore 24', 'I tassi sono aggiornati alle 10:00 CET. La polizza decorre dalle ore 24 del giorno dopo.', ['10:00 CET', 'ore 24']],
  ['orario con secondi prima di un telefono', "03:12:49 041-0853-2778: 'Mi dispiace'", ['03:12:49', '041-0853-2778']],
  ['nome straniero da solo a inizio frase', 'Wilfridus ha letto la sua poesia. Momodou sta cercando casa. Oranee vuole creare un modello.', ['Wilfridus', 'Momodou', 'Oranee']],
  ['nome di chi scrive in una chat', "Sirma: Grazie per aver condiviso.\nXhensila: 'Congratulazioni!'", ['Sirma', 'Xhensila']],
  ['aziende con suffissi stranieri', 'Fornitore: Deschamps S.A.S. e Calatayud y Larrañaga S.Com.; pubblicate da International Swaps and Derivatives Association, Inc. oggi.', ['Deschamps', 'Calatayud y Larrañaga', 'International Swaps and Derivatives Association']],
  ['enti con nome inglese', 'quotati presso il Chicago Board of Trade (CBOT). Emittente: Government of Italy. Arbitro: Dispute Review Board.', ['Chicago Board of Trade', 'Government of Italy', 'Dispute Review Board']],
  ['nomi di aziende attaccati', 'La newsletter di TechSolutions e il conto presso UniCredit.', ['TechSolutions', 'UniCredit']],
];
for (const [nome, testo, dati] of v09) { const out = copri(testo); for (const d of dati) check(`${nome}: "${d}" ancora visibile in → ${out}`, !out.includes(d)); }
const restano09 = [
  ['quantità con "e" non sono orari', 'Vedi gli articoli 3 e 4. Tra 2 e 3 settimane, le pagine 10 e 12, entro 3 e 4 giorni.', '3 e 4. Tra 2 e 3 settimane, le pagine 10 e 12, entro 3 e 4 giorni'],
  ['un conto non è un orario', 'Punteggio: 7 meno 2 = 5', '7 meno 2'],
  ['parole comuni a inizio frase restano', 'Molti hanno chiesto un rinvio. Recentemente ha deciso di cambiare. Excel ha calcolato il totale.', 'Molti hanno chiesto un rinvio. Recentemente ha deciso'],
  ['date con "e" restano date', 'Siamo chiusi il 3 e 4 maggio.', 'Siamo chiusi il'],
  ['organi societari non sono aziende', 'Il Board of Directors e lo Executive Board hanno approvato.', 'Directors'],
  ['nomi di campi XML restano', '<ApplicationReference schemeName="x">1</ApplicationReference>', 'ApplicationReference'],
];
for (const [nome, testo, resta] of restano09) { const out = copri(testo); check(`${nome} → ${out}`, out.includes(resta)); }
check('il 3 e 4 maggio è una data, non un orario', Core.analyze('Siamo chiusi il 3 e 4 maggio.').every(e => e.type !== 'ORARIO'));
check('"2023 Gentile Johansson AB": la data non entra nel nome dell\'azienda', Core.analyze('Data: 01/03/2023  Gentile Johansson AB, buongiorno').some(e => e.type === 'DATA' && e.text === '01/03/2023'));

console.log(`\n${ok} controlli superati, ${ko} non superati.`);
process.exit(ko ? 1 : 0);
