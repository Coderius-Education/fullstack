---
sidebar_position: 2
---

# Je eerste endpoint

In deze les maak je je eerste FastAPI endpoint. Een endpoint is een URL waarop je server reageert.

## main.py aanmaken

Maak een bestand `main.py` in je project:

```python
from fastapi import FastAPI

app = FastAPI()

@app.get("/")
async def root():
    return {"bericht": "Hallo wereld!"}
```

### Wat doet deze code?

- `FastAPI()` - Maakt een nieuwe app
- `@app.get("/")` - Reageert op de URL `/`
- `return {"bericht": "..."}` - Stuurt JSON data terug

## Server starten

Start je server in de terminal:

```bash
fastapi dev main.py
```

Ga naar [http://127.0.0.1:8000](http://127.0.0.1:8000) in je browser. Je ziet:

```json
{"bericht": "Hallo wereld!"}
```

:::tip Wijzigingen niet zichtbaar?
Je browser slaat pagina's op (caching). Als je iets aanpast en het verandert niet, druk dan op **Ctrl+Shift+R** om de pagina opnieuw te laden zonder cache.
:::

## Meerdere endpoints

Je kunt meerdere endpoints toevoegen:

```python
@app.get("/info")
async def info():
    return {"naam": "Jouw Naam", "leeftijd": 16}
```

Ga naar [http://127.0.0.1:8000/info](http://127.0.0.1:8000/info) om dit te testen.

## Opdrachten

### Opdracht 1: Predict - Wat zie je?

```python
@app.get("/school")
async def school():
    return {"school": "Corderius", "vak": "Informatica"}
```

**Vraag:** Wat zie je als je naar `/school` gaat?

<details>
<summary>Klik hier voor het antwoord</summary>

```json
{"school": "Corderius", "vak": "Informatica"}
```

</details>

### Opdracht 2: Make - Eigen endpoint

Maak een endpoint `/hobby` dat jouw favoriete hobby teruggeeft als JSON.

### Opdracht 3: Make - Meerdere endpoints

Maak drie endpoints: `/eten`, `/muziek`, en `/game` die elk jouw favorieten teruggeven.
