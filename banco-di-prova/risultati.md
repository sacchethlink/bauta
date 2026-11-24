# Banco di prova di Bauta

Testi italiani provati: **2000**, dal dataset pubblico [ai4privacy/open-pii-masking-500k-ai4privacy](https://huggingface.co/datasets/ai4privacy/open-pii-masking-500k-ai4privacy) (licenza CC BY 4.0, testi sintetici).

## Modalità Reversibile

- Dati coperti per intero: **84,6%** (3916 su 4629)
- Caratteri di dati personali coperti: **91,8%**
- Testo normale coperto per eccesso: **1,4%**

| Tipo di dato (etichetta del dataset) | Quanti | Coperti per intero | Caratteri coperti |
|---|---:|---:|---:|
| GIVENNAME | 1405 | 92,5% | 94,6% |
| SURNAME | 625 | 98,1% | 99,1% |
| CITY | 396 | 90,2% | 94,0% |
| TELEPHONENUM | 317 | 96,5% | 98,1% |
| DATE | 290 | 100,0% | 100,0% |
| EMAIL | 211 | 96,2% | 98,8% |
| STREET | 206 | 88,3% | 95,4% |
| TIME | 194 | 0,0% | 0,2% |
| BUILDINGNUM | 193 | 59,6% | 60,1% |
| IDCARDNUM | 179 | 100,0% | 100,0% |
| TITLE | 137 | 43,1% | 41,2% |
| AGE | 100 | 43,0% | 42,2% |
| ZIPCODE | 84 | 29,8% | 32,2% |
| PASSPORTNUM | 73 | 100,0% | 100,0% |
| SEX | 50 | 36,0% | 63,6% |
| CREDITCARDNUMBER | 48 | 100,0% | 100,0% |
| TAXNUM | 43 | 93,0% | 97,9% |
| DRIVERLICENSENUM | 37 | 100,0% | 100,0% |
| SOCIALNUM | 22 | 95,5% | 97,5% |
| GENDER | 19 | 42,1% | 39,2% |

## Modalità Anonima

- Dati coperti per intero: **84,6%** (3916 su 4629)
- Caratteri di dati personali coperti: **91,8%**
- Testo normale coperto per eccesso: **1,7%**

| Tipo di dato (etichetta del dataset) | Quanti | Coperti per intero | Caratteri coperti |
|---|---:|---:|---:|
| GIVENNAME | 1405 | 92,5% | 94,6% |
| SURNAME | 625 | 98,1% | 99,1% |
| CITY | 396 | 90,2% | 94,0% |
| TELEPHONENUM | 317 | 96,5% | 98,1% |
| DATE | 290 | 100,0% | 100,0% |
| EMAIL | 211 | 96,2% | 98,8% |
| STREET | 206 | 88,3% | 95,4% |
| TIME | 194 | 0,0% | 0,2% |
| BUILDINGNUM | 193 | 59,6% | 60,1% |
| IDCARDNUM | 179 | 100,0% | 100,0% |
| TITLE | 137 | 43,1% | 41,2% |
| AGE | 100 | 43,0% | 42,2% |
| ZIPCODE | 84 | 29,8% | 32,2% |
| PASSPORTNUM | 73 | 100,0% | 100,0% |
| SEX | 50 | 36,0% | 63,6% |
| CREDITCARDNUMBER | 48 | 100,0% | 100,0% |
| TAXNUM | 43 | 93,0% | 97,9% |
| DRIVERLICENSENUM | 37 | 100,0% | 100,0% |
| SOCIALNUM | 22 | 95,5% | 97,5% |
| GENDER | 19 | 42,1% | 39,2% |

_Il dataset usa le sue categorie: alcune (per esempio SEX, GENDER, TIME, TITLE) Bauta non le considera dati da coprire, quindi lì percentuali basse sono attese._
