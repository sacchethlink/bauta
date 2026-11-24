# Banco di prova di Bauta

Due banchi di prova pubblici con testi italiani sintetici. Per ognuno, metà dei testi serve a cercare gli errori e l'altra metà, mai guardata, a dare il voto.

## ai4privacy (frasi brevi) · modalità Reversibile

Testi: 2000 ([ai4privacy/open-pii-masking-500k-ai4privacy](https://huggingface.co/datasets/ai4privacy/open-pii-masking-500k-ai4privacy), CC BY 4.0).

- Dati coperti per intero: **89,9%** (4054 su 4508)
- Caratteri di dati personali coperti: **95,2%**
- Testo normale coperto per eccesso: **1,5%**

| Tipo di dato (etichetta del dataset) | Quanti | Coperti per intero | Caratteri coperti |
|---|---:|---:|---:|
| GIVENNAME | 1356 | 93,1% | 94,9% |
| SURNAME | 611 | 95,7% | 97,9% |
| CITY | 343 | 93,9% | 96,2% |
| TELEPHONENUM | 341 | 97,4% | 98,6% |
| DATE | 256 | 100,0% | 100,0% |
| TIME | 208 | 77,9% | 82,8% |
| STREET | 206 | 92,7% | 97,1% |
| EMAIL | 206 | 96,6% | 98,9% |
| IDCARDNUM | 191 | 99,0% | 99,3% |
| BUILDINGNUM | 172 | 57,0% | 57,0% |
| TITLE | 153 | 75,8% | 72,3% |
| AGE | 110 | 47,3% | 46,9% |
| PASSPORTNUM | 69 | 100,0% | 100,0% |
| ZIPCODE | 60 | 46,7% | 46,0% |
| CREDITCARDNUMBER | 57 | 100,0% | 100,0% |
| TAXNUM | 53 | 92,5% | 97,7% |
| SEX | 48 | 52,1% | 79,6% |
| DRIVERLICENSENUM | 26 | 100,0% | 100,0% |
| SOCIALNUM | 24 | 79,2% | 88,6% |
| GENDER | 18 | 88,9% | 92,8% |

## ai4privacy (frasi brevi) · modalità Anonima

Testi: 2000 ([ai4privacy/open-pii-masking-500k-ai4privacy](https://huggingface.co/datasets/ai4privacy/open-pii-masking-500k-ai4privacy), CC BY 4.0).

- Dati coperti per intero: **92,4%** (4164 su 4508)
- Caratteri di dati personali coperti: **96,2%**
- Testo normale coperto per eccesso: **1,9%**

| Tipo di dato (etichetta del dataset) | Quanti | Coperti per intero | Caratteri coperti |
|---|---:|---:|---:|
| GIVENNAME | 1356 | 93,1% | 94,9% |
| SURNAME | 611 | 95,7% | 97,9% |
| CITY | 343 | 93,9% | 96,2% |
| TELEPHONENUM | 341 | 98,2% | 98,9% |
| DATE | 256 | 100,0% | 100,0% |
| TIME | 208 | 77,9% | 89,6% |
| STREET | 206 | 92,7% | 97,1% |
| EMAIL | 206 | 96,6% | 99,0% |
| IDCARDNUM | 191 | 99,0% | 99,3% |
| BUILDINGNUM | 172 | 80,2% | 79,5% |
| TITLE | 153 | 75,8% | 72,3% |
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

- Dati coperti per intero: **51,0%** (1554 su 3050)
- Caratteri di dati personali coperti: **71,1%**
- Testo normale coperto per eccesso: **13,3%**

| Tipo di dato (etichetta del dataset) | Quanti | Coperti per intero | Caratteri coperti |
|---|---:|---:|---:|
| name | 952 | 64,4% | 78,2% |
| company | 582 | 33,5% | 53,2% |
| street_address | 462 | 8,9% | 74,6% |
| date | 395 | 62,3% | 70,6% |
| time | 113 | 43,4% | 54,5% |
| phone_number | 84 | 83,3% | 86,6% |
| email | 78 | 91,0% | 92,3% |
| date_of_birth | 41 | 82,9% | 77,5% |
| first_name | 36 | 94,4% | 94,1% |
| customer_id | 29 | 62,1% | 77,5% |
| account_pin | 28 | 67,9% | 75,0% |
| iban | 24 | 79,2% | 95,6% |
| credit_card_number | 24 | 66,7% | 73,7% |
| swift_bic_code | 20 | 95,0% | 99,5% |
| credit_card_security_code | 19 | 10,5% | 10,7% |
| passport_number | 18 | 100,0% | 100,0% |
| employee_id | 17 | 64,7% | 79,6% |
| bank_routing_number | 17 | 94,1% | 94,1% |
| ssn | 17 | 58,8% | 65,8% |
| last_name | 17 | 88,2% | 88,8% |
| driver_license_number | 15 | 40,0% | 65,1% |
| ipv4 | 13 | 100,0% | 100,0% |
| password | 11 | 0,0% | 11,3% |
| bban | 8 | 100,0% | 100,0% |
| local_latlng | 8 | 62,5% | 61,3% |
| api_key | 8 | 12,5% | 5,0% |
| user_name | 7 | 42,9% | 53,1% |
| ipv6 | 4 | 0,0% | 1,9% |
| date_time | 3 | 66,7% | 89,1% |

## Gretel (documenti finanziari) · modalità Anonima

Testi: 600 ([gretelai/synthetic_pii_finance_multilingual](https://huggingface.co/datasets/gretelai/synthetic_pii_finance_multilingual), Apache 2.0).

- Dati coperti per intero: **53,0%** (1615 su 3050)
- Caratteri di dati personali coperti: **72,8%**
- Testo normale coperto per eccesso: **13,6%**

| Tipo di dato (etichetta del dataset) | Quanti | Coperti per intero | Caratteri coperti |
|---|---:|---:|---:|
| name | 952 | 64,5% | 78,3% |
| company | 582 | 33,5% | 53,2% |
| street_address | 462 | 15,8% | 79,6% |
| date | 395 | 62,5% | 71,3% |
| time | 113 | 44,2% | 54,9% |
| phone_number | 84 | 83,3% | 89,9% |
| email | 78 | 91,0% | 92,3% |
| date_of_birth | 41 | 82,9% | 77,5% |
| first_name | 36 | 94,4% | 94,1% |
| customer_id | 29 | 62,1% | 77,5% |
| account_pin | 28 | 85,7% | 88,9% |
| iban | 24 | 79,2% | 97,0% |
| credit_card_number | 24 | 91,7% | 94,8% |
| swift_bic_code | 20 | 95,0% | 99,5% |
| credit_card_security_code | 19 | 89,5% | 91,1% |
| passport_number | 18 | 100,0% | 100,0% |
| employee_id | 17 | 64,7% | 79,6% |
| bank_routing_number | 17 | 94,1% | 94,1% |
| ssn | 17 | 58,8% | 77,7% |
| last_name | 17 | 88,2% | 88,8% |
| driver_license_number | 15 | 40,0% | 65,1% |
| ipv4 | 13 | 100,0% | 100,0% |
| password | 11 | 0,0% | 11,3% |
| bban | 8 | 100,0% | 100,0% |
| local_latlng | 8 | 62,5% | 61,3% |
| api_key | 8 | 12,5% | 5,0% |
| user_name | 7 | 42,9% | 53,1% |
| ipv6 | 4 | 0,0% | 1,9% |
| date_time | 3 | 66,7% | 89,1% |

_I testi dei banchi di prova sono sintetici: nessun dato reale. Ogni dataset usa le sue categorie, che non coincidono sempre con quelle di Bauta._
