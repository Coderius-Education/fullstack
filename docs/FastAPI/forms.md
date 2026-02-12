---
sidebar_position: 8
---

# Eigen POST request

In deze les maak je een formulier dat data verstuurt naar je server via POST.

## Het formulier

Maak `static/pages/naam_form.html`:

```html
<!DOCTYPE html>
<html>
    <body>
        <h1>Wat is je naam?</h1>
        <form method="post" action="/verstuur">
            <input type="text" name="naam" required>
            <button type="submit">Verstuur</button>
        </form>
    </body>
</html>
```

### Belangrijke onderdelen

- `method="post"` — Stuurt data via POST
- `action="/verstuur"` — Naar welk endpoint
- `name="naam"` — Deze naam gebruiken we in Python

## De endpoints

In `main.py`:

```python
from fastapi import FastAPI, Form
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles

app = FastAPI()
app.mount("/static", StaticFiles(directory="static"), name="static")

@app.get("/naam")
async def toon_formulier():
    return FileResponse("static/pages/naam_form.html")

@app.post("/verstuur")
async def ontvang_naam(naam: str = Form(...)):
    print(f"Naam ontvangen: {naam}")
    return {"bericht": f"Hallo {naam}!"}
```

### Wat is nieuw?

- `Form(...)` — Haalt het veld `naam` uit het formulier
- De `name` in HTML moet **matchen** met de parameter in Python

## Testen

1. Ga naar `http://127.0.0.1:8000/naam`
2. Vul je naam in en klik Verstuur
3. Je ziet: `{"bericht": "Hallo Jan!"}`
4. In de terminal: `Naam ontvangen: Jan`

## Opdrachten

### Opdracht 1: Predict - Wat zie je?

```html
<form method="post" action="/groet">
    <input type="text" name="naam">
    <button type="submit">Verstuur</button>
</form>
```

```python
@app.post("/groet")
async def groet(naam: str = Form(...)):
    return {"groet": f"Hallo {naam}!"}
```

**Vraag:** Je vult "Sarah" in. Wat zie je?

<details>
<summary>Antwoord</summary>

`{"groet": "Hallo Sarah!"}`

</details>

### Opdracht 2: Make - Eigen formulier

Maak een formulier voor je favoriete kleur met een GET endpoint (formulier tonen) en POST endpoint (data ontvangen). Print de kleur in de terminal.

### Opdracht 3: Make - Twee velden

Maak een formulier met naam en leeftijd:

```html
<input type="text" name="naam" required>
<input type="number" name="leeftijd" required>
```

```python
@app.post("/profiel")
async def profiel(naam: str = Form(...), leeftijd: int = Form(...)):
    return {"naam": naam, "leeftijd": leeftijd}
```
