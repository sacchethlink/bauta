# Banco di prova di Bauta

Due banchi di prova pubblici con testi italiani sintetici. Per ognuno, metà dei testi serve a cercare gli errori e l'altra metà, mai guardata, a dare il voto.

## ai4privacy (frasi brevi) · modalità Reversibile

Testi: 2000 ([ai4privacy/open-pii-masking-500k-ai4privacy](https://huggingface.co/datasets/ai4privacy/open-pii-masking-500k-ai4privacy), CC BY 4.0).

- Dati coperti per intero: **92,4%** (4166 su 4508)
- Caratteri di dati personali coperti: **96,6%**
- Testo normale coperto per eccesso: **1,5%**

| Tipo di dato (etichetta del dataset) | Quanti | Coperti per intero | Caratteri coperti |
|---|---:|---:|---:|
| GIVENNAME | 1356 | 96,6% | 97,6% |
| SURNAME | 611 | 96,9% | 98,5% |
| CITY | 343 | 94,8% | 96,5% |
| TELEPHONENUM | 341 | 97,9% | 98,8% |
| DATE | 256 | 100,0% | 100,0% |
| TIME | 208 | 95,2% | 96,5% |
| STREET | 206 | 93,2% | 97,9% |
| EMAIL | 206 | 96,6% | 98,9% |
| IDCARDNUM | 191 | 99,0% | 99,3% |
| BUILDINGNUM | 172 | 66,3% | 66,6% |
| TITLE | 153 | 74,5% | 71,3% |
| AGE | 110 | 47,3% | 46,9% |
| PASSPORTNUM | 69 | 100,0% | 100,0% |
| ZIPCODE | 60 | 50,0% | 49,3% |
| CREDITCARDNUMBER | 57 | 100,0% | 100,0% |
| TAXNUM | 53 | 92,5% | 97,7% |
| SEX | 48 | 52,1% | 79,6% |
| DRIVERLICENSENUM | 26 | 100,0% | 100,0% |
| SOCIALNUM | 24 | 79,2% | 88,6% |
| GENDER | 18 | 88,9% | 92,8% |

## ai4privacy (frasi brevi) · modalità Anonima

Testi: 2000 ([ai4privacy/open-pii-masking-500k-ai4privacy](https://huggingface.co/datasets/ai4privacy/open-pii-masking-500k-ai4privacy), CC BY 4.0).

- Dati coperti per intero: **94,7%** (4269 su 4508)
- Caratteri di dati personali coperti: **97,4%**
- Testo normale coperto per eccesso: **1,9%**

| Tipo di dato (etichetta del dataset) | Quanti | Coperti per intero | Caratteri coperti |
|---|---:|---:|---:|
| GIVENNAME | 1356 | 96,6% | 97,6% |
| SURNAME | 611 | 96,9% | 98,5% |
| CITY | 343 | 94,8% | 96,5% |
| TELEPHONENUM | 341 | 98,8% | 99,1% |
| DATE | 256 | 100,0% | 100,0% |
| TIME | 208 | 95,2% | 97,9% |
| STREET | 206 | 93,2% | 97,9% |
| EMAIL | 206 | 96,6% | 99,0% |
| IDCARDNUM | 191 | 99,0% | 99,3% |
| BUILDINGNUM | 172 | 86,0% | 86,0% |
| TITLE | 153 | 75,2% | 72,3% |
| AGE | 110 | 80,9% | 82,6% |
| PASSPORTNUM | 69 | 100,0% | 100,0% |
| ZIPCODE | 60 | 96,7% | 96,7% |
| CREDITCARDNUMBER | 57 | 100,0% | 100,0% |
| TAXNUM | 53 | 92,5% | 97,7% |
| SEX | 48 | 52,1% | 79,6% |
| DRIVERLICENSENUM | 26 | 100,0% | 100,0% |
| SOCIALNUM | 24 | 79,2% | 93,1% |
| GENDER | 18 | 88,9% | 92,8% |

## Gretel (documenti finanziari) · modalità Reversibile

Testi: 600 ([gretelai/synthetic_pii_finance_multilingual](https://huggingface.co/datasets/gretelai/synthetic_pii_finance_multilingual), Apache 2.0).

- Dati coperti per intero: **70,1%** (2139 su 3050)
- Caratteri di dati personali coperti: **80,9%**
- Testo normale coperto per eccesso: **10,0%**

| Tipo di dato (etichetta del dataset) | Quanti | Coperti per intero | Caratteri coperti |
|---|---:|---:|---:|
| name | 952 | 71,1% | 80,4% |
| company | 582 | 61,5% | 75,3% |
| street_address | 462 | 84,2% | 94,3% |
| date | 395 | 62,8% | 71,0% |
| time | 113 | 43,4% | 54,5% |
| phone_number | 84 | 88,1% | 89,6% |
| email | 78 | 91,0% | 91,8% |
| date_of_birth | 41 | 82,9% | 77,5% |
| first_name | 36 | 94,4% | 94,1% |
| customer_id | 29 | 75,9% | 85,4% |
| account_pin | 28 | 60,7% | 69,4% |
| iban | 24 | 79,2% | 95,6% |
| credit_card_number | 24 | 66,7% | 70,6% |
| swift_bic_code | 20 | 95,0% | 99,1% |
| credit_card_security_code | 19 | 10,5% | 10,7% |
| passport_number | 18 | 100,0% | 100,0% |
| employee_id | 17 | 70,6% | 80,3% |
| bank_routing_number | 17 | 94,1% | 94,1% |
| ssn | 17 | 58,8% | 65,8% |
| last_name | 17 | 88,2% | 88,8% |
| driver_license_number | 15 | 40,0% | 65,1% |
| ipv4 | 13 | 100,0% | 100,0% |
| password | 11 | 0,0% | 11,3% |
| bban | 8 | 100,0% | 100,0% |
| local_latlng | 8 | 62,5% | 61,3% |
| api_key | 8 | 12,5% | 6,1% |
| user_name | 7 | 42,9% | 53,1% |
| ipv6 | 4 | 0,0% | 1,9% |
| date_time | 3 | 100,0% | 100,0% |

## Gretel (documenti finanziari) · modalità Anonima

Testi: 600 ([gretelai/synthetic_pii_finance_multilingual](https://huggingface.co/datasets/gretelai/synthetic_pii_finance_multilingual), Apache 2.0).

- Dati coperti per intero: **72,2%** (2203 su 3050)
- Caratteri di dati personali coperti: **82,2%**
- Testo normale coperto per eccesso: **10,5%**

| Tipo di dato (etichetta del dataset) | Quanti | Coperti per intero | Caratteri coperti |
|---|---:|---:|---:|
| name | 952 | 74,3% | 82,7% |
| company | 582 | 61,5% | 75,3% |
| street_address | 462 | 85,3% | 94,9% |
| date | 395 | 63,0% | 71,7% |
| time | 113 | 44,2% | 54,9% |
| phone_number | 84 | 88,1% | 91,1% |
| email | 78 | 91,0% | 91,8% |
| date_of_birth | 41 | 82,9% | 77,5% |
| first_name | 36 | 94,4% | 94,1% |
| customer_id | 29 | 75,9% | 85,4% |
| account_pin | 28 | 82,1% | 86,1% |
| iban | 24 | 79,2% | 97,0% |
| credit_card_number | 24 | 91,7% | 94,8% |
| swift_bic_code | 20 | 95,0% | 99,1% |
| credit_card_security_code | 19 | 89,5% | 91,1% |
| passport_number | 18 | 100,0% | 100,0% |
| employee_id | 17 | 70,6% | 80,3% |
| bank_routing_number | 17 | 94,1% | 94,1% |
| ssn | 17 | 58,8% | 77,7% |
| last_name | 17 | 88,2% | 88,8% |
| driver_license_number | 15 | 40,0% | 65,1% |
| ipv4 | 13 | 100,0% | 100,0% |
| password | 11 | 0,0% | 11,3% |
| bban | 8 | 100,0% | 100,0% |
| local_latlng | 8 | 62,5% | 61,3% |
| api_key | 8 | 12,5% | 6,1% |
| user_name | 7 | 42,9% | 53,1% |
| ipv6 | 4 | 0,0% | 1,9% |
| date_time | 3 | 100,0% | 100,0% |

_I testi dei banchi di prova sono sintetici: nessun dato reale. Ogni dataset usa le sue categorie, che non coincidono sempre con quelle di Bauta._
