---
sidebar_position: 7
---

# GET vs POST

Tot nu toe gebruiken we alleen GET requests. In deze les leer je het verschil tussen GET en POST.

## GET = Data ophalen

Alles wat je tot nu toe hebt gedaan is GET. De browser vraagt data op van de server.

```python
@app.get("/pagina")
async def pagina():
    return FileResponse("static/pages/home.html")
```

Data kan meegestuurd worden in de URL:
```
http://127.0.0.1:8000/zoek?term=python
```

```python
@app.get("/zoek")
async def zoek(term: str):
    return {"je_zocht": term}
```

## POST = Data versturen

POST gebruik je als een gebruiker data naar de server stuurt, bijvoorbeeld via een formulier.

```python
from fastapi import Form

@app.post("/verstuur")
async def verstuur(naam: str = Form(...)):
    return {"ontvangen": naam}
```

De data zit in de request body — niet zichtbaar in de URL.

## Wanneer gebruik je wat?

| | GET | POST |
|---|---|---|
| **Doel** | Data ophalen | Data versturen |
| **Data in** | URL | Request body |
| **Voorbeeld** | Pagina laden, zoeken | Formulier versturen, inloggen |

**Vuistregel:** GET = "Geef me iets" / POST = "Hier is iets"

## Opdrachten

### Opdracht 1: Predict - GET of POST?

Wat gebruik je voor:
1. Een pagina met zoekresultaten
2. Een inlogformulier versturen
3. Een foto tonen

<details>
<summary>Antwoord</summary>

1. **GET** — je haalt data op
2. **POST** — je stuurt gevoelige data (wachtwoord)
3. **GET** — je haalt een pagina op

</details>

### Opdracht 2: Run - GET met parameter

Maak dit endpoint en test het met verschillende namen in de URL:

```python
@app.get("/groet")
async def groet(naam: str = "Bezoeker"):
    return {"bericht": f"Hallo {naam}!"}
```

Test: `http://127.0.0.1:8000/groet?naam=Jan`
