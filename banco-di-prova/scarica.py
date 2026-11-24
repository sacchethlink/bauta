# Scarica i testi italiani del banco di prova pubblico ai4privacy (licenza CC BY 4.0).
# Gira su GitHub Actions: i dati non vengono salvati nel repository.
import json, os, sys
from huggingface_hub import list_repo_files, hf_hub_download
import pandas as pd

REPO = "ai4privacy/open-pii-masking-500k-ai4privacy"
QUANTI = int(os.environ.get("QUANTI", "4000"))  # 2.000 per trovare gli errori, 2.000 diversi per il voto
files = [f for f in list_repo_files(REPO, repo_type="dataset") if "validation" in f and f.endswith((".jsonl", ".json", ".parquet"))]
if not files:
    sys.exit("Nessun file di validazione trovato")
righe = []
for f in sorted(files):
    path = hf_hub_download(REPO, f, repo_type="dataset")
    df = pd.read_parquet(path) if f.endswith(".parquet") else pd.read_json(path, lines=f.endswith(".jsonl"))
    df = df[df["language"] == "it"]
    for _, r in df.iterrows():
        pm = r["privacy_mask"]
        if isinstance(pm, str):
            pm = json.loads(pm)
        righe.append({"testo": r["source_text"], "dati": [{"label": d["label"], "start": int(d["start"]), "end": int(d["end"])} for d in pm]})
        if len(righe) >= QUANTI:
            break
    if len(righe) >= QUANTI:
        break
with open("banco-di-prova/dati.jsonl", "w", encoding="utf8") as out:
    for r in righe:
        out.write(json.dumps(r, ensure_ascii=False) + "\n")
print(f"Testi italiani scaricati: {len(righe)}")
