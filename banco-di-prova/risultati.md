# Banco di prova di Bauta

Testi italiani provati: **2000**, dal dataset pubblico [ai4privacy/open-pii-masking-500k-ai4privacy](https://huggingface.co/datasets/ai4privacy/open-pii-masking-500k-ai4privacy) (licenza CC BY 4.0, testi sintetici).

## Modalità Reversibile

- Dati coperti per intero: **67,0%** (3102 su 4629)
- Caratteri di dati personali coperti: **79,7%**
- Testo normale coperto per eccesso: **1,2%**

| Tipo di dato (etichetta del dataset) | Quanti | Coperti per intero | Caratteri coperti |
|---|---:|---:|---:|
| GIVENNAME | 1405 | 77,9% | 87,3% |
| SURNAME | 625 | 94,6% | 98,4% |
| CITY | 396 | 80,3% | 93,8% |
| TELEPHONENUM | 317 | 68,5% | 82,6% |
| DATE | 290 | 30,3% | 41,8% |
| EMAIL | 211 | 96,2% | 98,8% |
| STREET | 206 | 76,2% | 90,8% |
| TIME | 194 | 0,0% | 0,0% |
| BUILDINGNUM | 193 | 33,7% | 35,0% |
| IDCARDNUM | 179 | 53,6% | 59,0% |
| TITLE | 137 | 41,6% | 39,7% |
| AGE | 100 | 29,0% | 28,1% |
| ZIPCODE | 84 | 6,0% | 6,5% |
| PASSPORTNUM | 73 | 50,7% | 53,5% |
| SEX | 50 | 34,0% | 60,1% |
| CREDITCARDNUMBER | 48 | 100,0% | 100,0% |
| TAXNUM | 43 | 76,7% | 89,6% |
| DRIVERLICENSENUM | 37 | 100,0% | 100,0% |
| SOCIALNUM | 22 | 9,1% | 21,2% |
| GENDER | 19 | 42,1% | 39,2% |

## Modalità Anonima

- Dati coperti per intero: **67,0%** (3102 su 4629)
- Caratteri di dati personali coperti: **79,7%**
- Testo normale coperto per eccesso: **1,6%**

| Tipo di dato (etichetta del dataset) | Quanti | Coperti per intero | Caratteri coperti |
|---|---:|---:|---:|
| GIVENNAME | 1405 | 77,9% | 87,3% |
| SURNAME | 625 | 94,6% | 98,4% |
| CITY | 396 | 80,3% | 93,8% |
| TELEPHONENUM | 317 | 68,5% | 82,6% |
| DATE | 290 | 30,3% | 41,8% |
| EMAIL | 211 | 96,2% | 98,8% |
| STREET | 206 | 76,2% | 90,8% |
| TIME | 194 | 0,0% | 0,0% |
| BUILDINGNUM | 193 | 33,7% | 35,0% |
| IDCARDNUM | 179 | 53,6% | 59,0% |
| TITLE | 137 | 41,6% | 39,7% |
| AGE | 100 | 29,0% | 28,1% |
| ZIPCODE | 84 | 6,0% | 6,5% |
| PASSPORTNUM | 73 | 50,7% | 53,5% |
| SEX | 50 | 34,0% | 60,1% |
| CREDITCARDNUMBER | 48 | 100,0% | 100,0% |
| TAXNUM | 43 | 76,7% | 89,6% |
| DRIVERLICENSENUM | 37 | 100,0% | 100,0% |
| SOCIALNUM | 22 | 9,1% | 21,2% |
| GENDER | 19 | 42,1% | 39,2% |

_Il dataset usa le sue categorie: alcune (per esempio SEX, GENDER, TIME, TITLE) Bauta non le considera dati da coprire, quindi lì percentuali basse sono attese._
