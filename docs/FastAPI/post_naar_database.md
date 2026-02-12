---
sidebar_position: 11
---

# POST naar database

Nu combineren we formulieren met een database: data van een gebruiker permanent opslaan.

## Voorbeeld: Naam opslaan

### Formulier (`static/pages/naam_opslaan.html`):

```html
<!DOCTYPE html>
<html>
    <body>
        <h1>Bewaar je naam</h1>
        <form method="post" action="/opslaan">
            <input type="text" name="naam" required>
            <button type="submit">Opslaan</button>
        </form>
    </body>
</html>
```

### Endpoints (`main.py`):

```python
from fastapi import FastAPI, Form
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from sqlitedict import SqliteDict

app = FastAPI()
app.mount("/static", StaticFiles(directory="static"), name="static")

@app.get("/naam")
async def naam_formulier():
    return FileResponse("static/pages/naam_opslaan.html")

@app.post("/opslaan")
async def naam_opslaan(naam: str = Form(...)):
    with SqliteDict("namen.db") as db:
        db["laatste_naam"] = naam
        db.commit()

    return {"bericht": f"'{naam}' opgeslagen!"}
```

## Testen

1. Ga naar `http://127.0.0.1:8000/naam`
2. Vul een naam in en klik Opslaan
3. **Stop de server** en start opnieuw
4. De naam staat nog in `namen.db`!

## Data terug lezen

```python
@app.get("/toon_naam")
async def toon_naam():
    with SqliteDict("namen.db") as db:
        naam = db.get("laatste_naam", "Nog niets opgeslagen")
    return {"naam": naam}
```

## Opdrachten

### Opdracht 1: Predict - Overschrijven

Je slaat eerst "Jan" op, dan "Sarah". Wat staat er in de database?

<details>
<summary>Antwoord</summary>

Alleen "Sarah" — de nieuwe waarde overschrijft de oude bij dezelfde key.

</details>

### Opdracht 2: Make - Score opslaan

Maak een formulier met een number input voor een game score. Sla de score op in `scores.db` en maak een endpoint om de score te bekijken.

### Opdracht 3: Make - Gastenboek

Maak een gastenboek met naam en bericht. Gebruik `time.time()` als unieke key zodat berichten niet overschreven worden:

```python
import time

key = f"bericht_{int(time.time())}"
db[key] = {"naam": naam, "bericht": bericht}
```
