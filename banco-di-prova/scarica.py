# Scarica i testi italiani dei banchi di prova pubblici. Gira su GitHub Actions: i dati non vengono salvati nel repository.
# 1. ai4privacy/open-pii-masking-500k-ai4privacy (licenza CC BY 4.0): frasi brevi sintetiche
# 2. gretelai/synthetic_pii_finance_multilingual (licenza Apache 2.0): documenti finanziari sintetici più lunghi
import json, os, sys
from huggingface_hub import list_repo_files, hf_hub_download
import pandas as pd

def leggi(repo, filtro_file, quanti, colonna_testo, colonna_dati, lingua_ok, uscita):
    files = [f for f in list_repo_files(repo, repo_type="dataset") if filtro_file(f) and f.endswith((".jsonl", ".json", ".parquet"))]
    if not files:
        sys.exit(f"Nessun file trovato in {repo}")
    righe = []
    for f in sorted(files):
        path = hf_hub_download(repo, f, repo_type="dataset")
        df = pd.read_parquet(path) if f.endswith(".parquet") else pd.read_json(path, lines=f.endswith(".jsonl"))
        df = df[df["language"].astype(str).map(lingua_ok)]
        for _, r in df.iterrows():
            pm = r[colonna_dati]
            if isinstance(pm, str):
                pm = json.loads(pm)
            righe.append({"testo": r[colonna_testo], "dati": [{"label": str(d["label"]), "start": int(d["start"]), "end": int(d["end"])} for d in pm]})
            if len(righe) >= quanti: break
        if len(righe) >= quanti: break
    with open(uscita, "w", encoding="utf8") as out:
        for r in righe: out.write(json.dumps(r, ensure_ascii=False) + "\n")
    print(f"{repo}: {len(righe)} testi italiani")

leggi("ai4privacy/open-pii-masking-500k-ai4privacy", lambda f: "validation" in f, int(os.environ.get("QUANTI", "4000")),
      "source_text", "privacy_mask", lambda l: l == "it", "banco-di-prova/dati.jsonl")
leggi("gretelai/synthetic_pii_finance_multilingual", lambda f: "test" in f, int(os.environ.get("QUANTI_GRETEL", "1200")),
      "generated_text", "pii_spans", lambda l: l.lower().startswith("ital") or l == "it", "banco-di-prova/dati-gretel.jsonl")
