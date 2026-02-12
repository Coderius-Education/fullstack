---
sidebar_position: 3
---

# HTML tonen

In de vorige les gaf je endpoint JSON terug. In deze les leer je hoe je een HTML pagina teruggeeft.

## HTMLResponse importeren

Pas je `main.py` aan:

```python
from fastapi import FastAPI
from fastapi.responses import HTMLResponse

app = FastAPI()
```

## Een HTML pagina tonen

```python
@app.get("/pagina", response_class=HTMLResponse)
async def pagina():
    return """
    <!DOCTYPE html>
    <html>
        <head>
            <title>Mijn Pagina</title>
        </head>
        <body>
            <h1>Hallo!</h1>
            <p>Dit is mijn eerste HTML pagina.</p>
        </body>
    </html>
    """
```

### Wat is nieuw?

- `response_class=HTMLResponse` - Vertelt FastAPI dat je HTML terugstuurt (niet JSON)
- De functie returnt een string met HTML code
- `"""..."""` is een multi-line string

## Testen

Ga naar [http://127.0.0.1:8000/pagina](http://127.0.0.1:8000/pagina). Je ziet nu een echte webpagina!

## CSS toevoegen

Je kunt CSS in een `<style>` tag zetten:

```python
@app.get("/styled", response_class=HTMLResponse)
async def styled():
    return """
    <!DOCTYPE html>
    <html>
        <head>
            <title>Met CSS</title>
            <style>
                h1 { color: blue; }
                p { color: gray; }
            </style>
        </head>
        <body>
            <h1>Gestylede pagina</h1>
            <p>Deze tekst is grijs.</p>
        </body>
    </html>
    """
```

## Opdrachten

### Opdracht 1: Predict - JSON of HTML?

```python
@app.get("/test")
async def test():
    return {"titel": "<h1>Hallo</h1>"}
```

**Vraag:** Zie je een heading of JSON?

<details>
<summary>Klik hier voor het antwoord</summary>

Je ziet JSON: `{"titel": "<h1>Hallo</h1>"}`. Zonder `response_class=HTMLResponse` stuurt FastAPI altijd JSON terug.

</details>

### Opdracht 2: Make - Eigen pagina

Maak een endpoint `/profiel` dat een HTML pagina toont met:
- Jouw naam als heading
- Een paragraaf over jezelf
- Een gekleurde heading via CSS

### Opdracht 3: Make - Twee pagina's

Maak twee endpoints (`/pagina1` en `/pagina2`) die elk een andere HTML pagina tonen. Voeg op elke pagina een link toe naar de andere:

```html
<a href="/pagina2">Ga naar pagina 2</a>
```
