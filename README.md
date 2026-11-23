<img src="logo/bauta-logo-nero.svg" width="72" alt="Logo di Bauta">

# Bauta

**Copri i dati personali prima di chiederli all'AI.**

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

## Due modi per usarlo

- **Online**, dalla pagina del progetto.
- **Dal tuo computer**: scarica `index.html` e `guida.html`, poi apri `index.html` con un doppio clic. Funziona anche senza internet.

## Cosa copre

| Famiglia | Dati |
|---|---|
| Chi è la persona | nomi e cognomi, aziende ed enti, altri nomi propri, età |
| Come contattarla | email, telefoni, indirizzi, siti, profili social |
| Codici e documenti | codice fiscale e partita IVA (con controllo della cifra), documenti d'identità, targhe, matricole, protocolli, numeri di pratica |
| Soldi | IBAN e carte (con controllo matematico), importi |
| Dati particolari | salute, religione, opinioni politiche, sindacato, orientamento sessuale, origine etnica, dati genetici e biometrici, dati giudiziari |
| Contesto | luoghi, date, dati catastali, indirizzi IP |

Nel dubbio Bauta copre: meglio un segnaposto in più che un dato in chiaro.

## Limiti

- Non riconosce tutto: nomi scritti in minuscolo, soprannomi, dati descritti a parole. Il controllo al passaggio 2 è obbligatorio per poter copiare.
- Non legge immagini e scansioni.
- Non rende un testo anonimo in senso legale: il contesto può permettere di riconoscere una persona. Un testo con i segnaposto è *pseudonimizzato* e contiene ancora dati personali.
- Non sostituisce le regole della tua azienda sull'uso dell'AI.

## Come verificare che non invia nulla

- Apri la pagina e stacca internet: continua a funzionare.
- La pagina dichiara al browser `Content-Security-Policy: connect-src 'none'`: ogni connessione verso l'esterno è bloccata.
- Tutto il codice è in `index.html`, senza librerie esterne.

## Test

Il motore di riconoscimento si prova con Node.js:

```
node test/test-motore.js
```

## Struttura

```
index.html          lo strumento (pagina unica, funziona offline)
guida.html          guida all'uso con infografiche
test/               test del motore di riconoscimento
logo/               il marchio di Bauta (nero e bianco, con i fori trasparenti)
LICENSE             licenza MIT
```

## Licenza e responsabilità

Licenza MIT. Il carattere Figtree, incluso nelle pagine, ha licenza SIL Open Font License. Bauta è uno strumento d'esempio, fornito così com'è e senza garanzie. La responsabilità di cosa si invia a un servizio AI resta di chi lo invia.

I nomi degli assistenti AI citati sono marchi dei rispettivi titolari e sono indicati solo per spiegare con quali strumenti si può usare.

---

Realizzato da **Hyper Link** per i corsi di formazione sull'uso consapevole dell'AI in azienda.
Hyper Link di Sacchet Marco & C. s.a.s. · P.IVA IT01219960257 · [h-link.it](https://h-link.it)
