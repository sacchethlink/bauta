<img src="logo/bauta-logo-nero.svg" width="72" alt="Logo di Bauta">

# Bauta

**Copri i dati personali prima di chiederli all'AI.**

Versione 0.11.1 · 25/11/2026

Bauta sostituisce nomi, recapiti, codici, dati sanitari e gli altri dati personali che riconosce con segnaposto come `[PERSONA_1]`. Così puoi incollare il testo in un assistente AI (Claude, ChatGPT, Gemini, Copilot, Le Chat, Perplexity o altri). Quando l'AI risponde, Bauta rimette i dati veri al loro posto.

Lavora solo nel browser: il testo non viene inviato a nessuno.

> **Strumento d'esempio dei corsi Hyper Link.** Serve a mostrare come proteggere i dati quando si usa l'AI. Prima di usarlo in azienda con dati reali, fallo approvare da chi di dovere: titolare, DPO o responsabile IT.

## Perché si chiama Bauta

La bauta è la maschera del Carnevale di Venezia che copriva tutto il viso: chi la indossava poteva parlare senza togliersela e senza farsi riconoscere. Bauta fa lo stesso con i tuoi testi: l'AI capisce di cosa parli, ma non sa di chi.

## Come si usa

1. **Incolla** il testo, oppure apri un file .docx o .txt.
2. **Controlla** cosa viene coperto: clicca su un dato per lasciarlo in chiaro, seleziona col mouse ciò che manca.
3. **Copia** il testo con i segnaposto e incollalo nell'assistente AI.
4. **Ripristina**: incolla la risposta dell'AI e tornano i dati veri.

La guida completa, con le infografiche, è in [`guida.html`](guida.html).

## Si usa solo dal tuo computer

Bauta non funziona da un sito: la pagina online serve solo a scaricarla.

1. Scarica `bauta.zip` dalla pagina del progetto (o il pulsante **Code → Download ZIP** di questo repository).
2. Estrai la cartella.
3. Apri `index.html` con un doppio clic. Funziona anche senza internet.

Il testo che incolli resta sul tuo computer e non viene salvato da nessuna parte online. Le liste "Copri sempre" e "Non toccare mai" restano nel browser del tuo computer.

## Cosa copre

| Famiglia | Dati |
|---|---|
| Chi è la persona | nomi e cognomi (anche in minuscolo), soprannomi, aziende ed enti, altri nomi propri, età; in modalità Anonima anche le persone descritte a parole |
| Come contattarla | email, telefoni, indirizzi, siti, profili social |
| Codici e documenti | codice fiscale e partita IVA (con controllo della cifra), documenti d'identità, targhe, matricole, protocolli, numeri di pratica |
| Soldi | IBAN e carte (con controllo matematico), importi |
| Dati particolari | salute, religione, opinioni politiche, sindacato, orientamento sessuale, origine etnica, dati genetici e biometrici, dati giudiziari |
| Contesto | luoghi, date, dati catastali, indirizzi IP |

Nel dubbio Bauta copre: meglio un segnaposto in più che un dato in chiaro.

## Modalità

- **Reversibile**: i dati diventano segnaposto e, quando l'AI risponde, tornano i dati veri.
- **Anonima**: copre anche le persone descritte a parole e i cognomi in minuscolo; età, date e importi diventano fasce; il collegamento con i dati veri non viene conservato.

## Limiti

- Non riconosce tutto: riconosce i nomi in minuscolo e i soprannomi più comuni e, in modalità Anonima, le descrizioni più frequenti di persone (ruoli, parentele). Nomi rari scritti in minuscolo o descrizioni insolite possono sfuggire. Il controllo al passaggio 2 è obbligatorio per poter copiare.
- Non legge immagini e scansioni.
- Non rende un testo anonimo in senso legale: il contesto può permettere di riconoscere una persona. Un testo con i segnaposto è *pseudonimizzato* e contiene ancora dati personali.
- Non sostituisce le regole della tua azienda sull'uso dell'AI.

## Come verificare che non invia nulla

- Apri la pagina e stacca internet: continua a funzionare.
- La pagina dichiara al browser `Content-Security-Policy: connect-src 'none'`: ogni connessione verso l'esterno è bloccata.
- Tutto il codice è in `index.html`, senza librerie esterne.

## Banco di prova

A ogni modifica del motore, e ogni lunedì, GitHub misura quanti dati personali Bauta lascia scoperti su testi italiani di due dataset pubblici: [ai4privacy/open-pii-masking-500k-ai4privacy](https://huggingface.co/datasets/ai4privacy/open-pii-masking-500k-ai4privacy) (licenza CC BY 4.0, frasi brevi) e [gretelai/synthetic_pii_finance_multilingual](https://huggingface.co/datasets/gretelai/synthetic_pii_finance_multilingual) (licenza Apache 2.0, documenti finanziari). Chi li pubblica li dichiara sintetici, cioè inventati: non contengono dati di persone reali. Metà dei testi serve a cercare gli errori, l'altra metà, mai usata per correggere Bauta, serve a misurare. I risultati sono in [`banco-di-prova/risultati.md`](banco-di-prova/risultati.md).

Il banco di prova serve a sapere dove Bauta sbaglia, non a confrontarla con altri strumenti.

## Test

Il motore di riconoscimento si prova con Node.js:

```
node test/test-motore.js
```

## Struttura

```
index.html          lo strumento (si usa aprendo il file dal computer)
bauta.zip           il pacchetto da scaricare: strumento, guida e istruzioni
guida.html          guida all'uso con infografiche
test/               test del motore di riconoscimento
banco-di-prova/     misura automatica su testi italiani pubblici
logo/               il marchio di Bauta (nero e bianco, con i fori trasparenti)
LICENSE             licenza MIT
```

## Licenza e responsabilità

Licenza MIT. Il carattere Figtree, incluso nelle pagine, ha licenza SIL Open Font License. Bauta è uno strumento d'esempio, fornito così com'è e senza garanzie. La responsabilità di cosa si invia a un servizio AI resta di chi lo invia.

I nomi degli assistenti AI citati sono marchi dei rispettivi titolari e sono indicati solo per spiegare con quali strumenti si può usare.

---

Realizzato da **Hyper Link** per i corsi di formazione sull'uso consapevole dell'AI in azienda.
Hyper Link di Sacchet Marco & C. s.a.s. · P.IVA IT01219960257 · [hyperlink-ai.netlify.app](https://hyperlink-ai.netlify.app/)
