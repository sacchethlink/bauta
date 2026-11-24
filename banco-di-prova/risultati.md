# Banco di prova di Bauta

Testi italiani usati per il voto: **2000**, diversi da quelli usati per cercare gli errori, dal dataset pubblico [ai4privacy/open-pii-masking-500k-ai4privacy](https://huggingface.co/datasets/ai4privacy/open-pii-masking-500k-ai4privacy) (licenza CC BY 4.0, testi sintetici).

## Modalità Reversibile

- Dati coperti per intero: **84,4%** (3807 su 4508)
- Caratteri di dati personali coperti: **91,7%**
- Testo normale coperto per eccesso: **1,5%**

| Tipo di dato (etichetta del dataset) | Quanti | Coperti per intero | Caratteri coperti |
|---|---:|---:|---:|
| GIVENNAME | 1356 | 93,1% | 94,9% |
| SURNAME | 611 | 95,7% | 97,9% |
| CITY | 343 | 91,5% | 95,4% |
| TELEPHONENUM | 341 | 97,4% | 98,6% |
| DATE | 256 | 100,0% | 100,0% |
| TIME | 208 | 0,0% | 0,6% |
| STREET | 206 | 92,7% | 97,0% |
| EMAIL | 206 | 96,6% | 98,9% |
| IDCARDNUM | 191 | 99,0% | 99,3% |
| BUILDINGNUM | 172 | 54,7% | 54,8% |
| TITLE | 153 | 47,1% | 43,7% |
| AGE | 110 | 41,8% | 41,5% |
| PASSPORTNUM | 69 | 100,0% | 100,0% |
| ZIPCODE | 60 | 31,7% | 32,7% |
| CREDITCARDNUMBER | 57 | 100,0% | 100,0% |
| TAXNUM | 53 | 92,5% | 97,7% |
| SEX | 48 | 31,3% | 69,1% |
| DRIVERLICENSENUM | 26 | 100,0% | 100,0% |
| SOCIALNUM | 24 | 79,2% | 88,6% |
| GENDER | 18 | 66,7% | 60,9% |

## Modalità Anonima

- Dati coperti per intero: **84,4%** (3807 su 4508)
- Caratteri di dati personali coperti: **91,7%**
- Testo normale coperto per eccesso: **1,8%**

| Tipo di dato (etichetta del dataset) | Quanti | Coperti per intero | Caratteri coperti |
|---|---:|---:|---:|
| GIVENNAME | 1356 | 93,1% | 94,9% |
| SURNAME | 611 | 95,7% | 97,9% |
| CITY | 343 | 91,5% | 95,4% |
| TELEPHONENUM | 341 | 97,4% | 98,6% |
| DATE | 256 | 100,0% | 100,0% |
| TIME | 208 | 0,0% | 0,6% |
| STREET | 206 | 92,7% | 97,0% |
| EMAIL | 206 | 96,6% | 98,9% |
| IDCARDNUM | 191 | 99,0% | 99,3% |
| BUILDINGNUM | 172 | 54,7% | 54,8% |
| TITLE | 153 | 47,1% | 43,7% |
| AGE | 110 | 41,8% | 41,5% |
| PASSPORTNUM | 69 | 100,0% | 100,0% |
| ZIPCODE | 60 | 31,7% | 32,7% |
| CREDITCARDNUMBER | 57 | 100,0% | 100,0% |
| TAXNUM | 53 | 92,5% | 97,7% |
| SEX | 48 | 31,3% | 69,1% |
| DRIVERLICENSENUM | 26 | 100,0% | 100,0% |
| SOCIALNUM | 24 | 79,2% | 88,6% |
| GENDER | 18 | 66,7% | 60,9% |

_Il dataset usa le sue categorie: alcune (per esempio SEX, GENDER, TIME, TITLE) Bauta non le considera dati da coprire, quindi lì percentuali basse sono attese._
