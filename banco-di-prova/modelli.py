# Prova di modelli già addestrati (nessun addestramento da parte nostra), sugli stessi testi dei banchi di prova.
# Gira su GitHub Actions. Per ogni modello scrive, per ogni testo, i tratti che il modello considera dati personali.
import json, os, sys, time
import numpy as np

def leggi(f):
    return [json.loads(l) for l in open(f, encoding="utf8") if l.strip()] if os.path.exists(f) else []

TESTI = {"ai4privacy": leggi("banco-di-prova/dati.jsonl"), "gretel": leggi("banco-di-prova/dati-gretel.jsonl")}
print({k: len(v) for k, v in TESTI.items()})

def salva(nome, risultati):
    with open(f"banco-di-prova/spans-{nome}.json", "w", encoding="utf8") as out:
        json.dump(risultati, out)

# ---------- 1. newmean-ai/pii-small (7 MB, Apache 2.0, pensato per girare anche nel browser) ----------
def newmean():
    from huggingface_hub import hf_hub_download
    import onnxruntime as ort
    from tokenizers import Tokenizer
    repo = "newmean-ai/pii-small"
    cfg = json.load(open(hf_hub_download(repo, "config.json")))
    tok = Tokenizer.from_file(hf_hub_download(repo, "tokenizer.json"))
    sess = ort.InferenceSession(hf_hub_download(repo, "onnx/model_q4.onnx"), providers=["CPUExecutionProvider"])
    id2label = cfg.get("id2label") or {str(i): t for i, t in enumerate(cfg.get("tags") or cfg.get("labels") or [])}
    id2label = {int(k): v for k, v in id2label.items()}
    print("newmean: etichette", list(id2label.values())[:30], "input", [i.name for i in sess.get_inputs()])
    finestra = 900
    def predici(testo):
        spans = []
        passo = finestra - 200
        for inizio in range(0, max(1, len(testo)), passo):
            pezzo = testo[inizio:inizio + finestra]
            enc = tok.encode(pezzo)
            ids = np.array([enc.ids[:512]], dtype=np.int64)
            feed = {}
            for i in sess.get_inputs():
                if "input_ids" in i.name: feed[i.name] = ids
                elif "attention" in i.name: feed[i.name] = np.ones_like(ids)
                elif "token_type" in i.name: feed[i.name] = np.zeros_like(ids)
            logits = sess.run(None, feed)[0][0]
            tags = [id2label.get(int(k), "O") for k in logits.argmax(-1)]
            cur = None
            for (a, b), t in zip(enc.offsets[:512], tags):
                if a == b: continue
                if not t or t == "O":
                    cur = None; continue
                lab = t.split("-", 1)[-1]
                if t.startswith("B") or cur is None or cur[2] != lab:
                    cur = [inizio + a, inizio + b, lab]; spans.append(cur)
                else:
                    cur[1] = inizio + b
            if inizio + finestra >= len(testo): break
        return spans
    t0 = time.time()
    salva("newmean", {k: [predici(r["testo"]) for r in v] for k, v in TESTI.items()})
    print(f"newmean: fatto in {time.time()-t0:.0f}s")

# ---------- 2. DeepMount00/Italian_NER_XXL_v2 (italiano, 52 categorie, Apache 2.0) ----------
def italian_ner():
    from transformers import pipeline
    nlp = pipeline("ner", model="DeepMount00/Italian_NER_XXL_v2", aggregation_strategy="simple", device=-1)
    def predici(testo):
        spans = []
        for inizio in range(0, max(1, len(testo)), 1500):
            pezzo = testo[inizio:inizio + 1700]
            for e in nlp(pezzo):
                spans.append([inizio + int(e["start"]), inizio + int(e["end"]), str(e["entity_group"])])
            if inizio + 1700 >= len(testo): break
        return spans
    t0 = time.time()
    salva("italian_ner", {k: [predici(r["testo"]) for r in v] for k, v in TESTI.items()})
    print(f"italian_ner: fatto in {time.time()-t0:.0f}s")

for nome, fn in [("newmean", newmean), ("italian_ner", italian_ner)]:
    try:
        fn()
    except Exception as e:
        print(f"{nome}: non riuscito: {e}", file=sys.stderr)
