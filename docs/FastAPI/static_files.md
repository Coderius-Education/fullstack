---
sidebar_position: 4
---

# Static files

In de vorige les zette je CSS in een `<style>` tag in je Python code. Dat wordt snel rommelig. In deze les leer je hoe je bestanden (CSS, afbeeldingen, etc.) in een aparte folder zet.

## Mappenstructuur

Maak een `static` folder met een `css` subfolder:

```
je-project/
├── main.py
└── static/
    └── css/
        └── style.css
```

## Static files configureren

Pas je `main.py` aan:

```python
from fastapi import FastAPI
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles

app = FastAPI()

app.mount("/static", StaticFiles(directory="static"), name="static")
```

### Wat doet `app.mount`?

Alle bestanden in de `static` folder worden bereikbaar via `/static/...` in de browser. Bijvoorbeeld:
- `static/css/style.css` → `/static/css/style.css`

## CSS in apart bestand

Maak `static/css/style.css`:

```css
h1 {
    color: blue;
}

p {
    color: gray;
}
```

## CSS koppelen aan HTML

```python
@app.get("/mooi", response_class=HTMLResponse)
async def mooi():
    return """
    <!DOCTYPE html>
    <html>
        <head>
            <title>Mooi</title>
            <link rel="stylesheet" href="/static/css/style.css">
        </head>
        <body>
            <h1>Mooie pagina</h1>
            <p>De CSS komt uit een apart bestand!</p>
        </body>
    </html>
    """
```

### Wat is nieuw?

- `<link rel="stylesheet" href="/static/css/style.css">` - Laadt CSS uit het aparte bestand
- De CSS geldt nu voor deze hele pagina
- Je kunt dezelfde CSS gebruiken op meerdere pagina's

## Testen

Ga naar [http://127.0.0.1:8000/mooi](http://127.0.0.1:8000/mooi). De heading is blauw en de tekst grijs — de CSS uit het aparte bestand werkt!

## Opdrachten

### Opdracht 1: Predict - Wat gebeurt er?

Je maakt twee endpoints die allebei dezelfde CSS laden:

```python
@app.get("/pagina1", response_class=HTMLResponse)
async def pagina1():
    return """...<link rel="stylesheet" href="/static/css/style.css">..."""

@app.get("/pagina2", response_class=HTMLResponse)
async def pagina2():
    return """...<link rel="stylesheet" href="/static/css/style.css">..."""
```

**Vraag:** Wat gebeurt er met pagina2 als je de CSS in `style.css` aanpast?

<details>
<summary>Klik hier voor het antwoord</summary>

Pagina2 verandert ook! Beide pagina's laden hetzelfde CSS bestand. Als je dat bestand aanpast, veranderen alle pagina's die het gebruiken.

</details>

### Opdracht 2: Make - Eigen CSS

Maak een eigen `style.css` met minimaal 3 CSS regels en een endpoint dat deze CSS gebruikt.

### Opdracht 3: Make - Twee CSS bestanden

Maak twee CSS bestanden (`style1.css` en `style2.css`) met verschillende kleuren. Maak twee endpoints die elk een ander CSS bestand gebruiken.
