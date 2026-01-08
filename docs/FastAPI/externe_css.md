---
sidebar_position: 4
---

# CSS in apart bestand

In de vorige les hebben we CSS inline in onze HTML strings gezet. Dit werkt, maar het wordt al snel onoverzichtelijk. In deze les leren we hoe we externe CSS bestanden kunnen gebruiken en hoe we static files (zoals CSS, JavaScript, afbeeldingen) kunnen serveren met FastAPI.

## Mappenstructuur aanmaken

Maak de volgende mappenstructuur in je project:

```
je-project/
├── main.py
└── static/
    ├── css/
    │   └── style.css
    └── images/
```

Of via de File Explorer / Finder en maak de mappen handmatig aan.

## Static files configureren

Voeg bovenaan je `main.py` de volgende import toe:

```python
from fastapi import FastAPI
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
```

Voeg na `app = FastAPI()` deze regel toe:

```python
app = FastAPI()

# Mount de static files directory
app.mount("/static", StaticFiles(directory="static"), name="static")
```

### Wat doet deze code?

- `StaticFiles(directory="static")` - Vertelt FastAPI dat de map `static` statische bestanden bevat
- `app.mount("/static", ...)` - Maakt alle bestanden in de `static` map beschikbaar via de `/static` URL
- `name="static"` - Geeft deze mount een naam voor later gebruik

## Een CSS bestand maken

Maak een nieuw bestand aan: `static/css/style.css` en voeg deze CSS toe:

```css
body {
    background-color: blue;
}
p {
    color: red;
}
```

## HTML pagina met externe CSS

Voeg deze nieuwe endpoint toe aan je `main.py`:

```python
@app.get("/extern", response_class=HTMLResponse)
async def extern_css():
    return """
    <!DOCTYPE html>
    <html>
        <head>
            <title>Externe CSS</title>
            <link rel="stylesheet" href="/static/css/style.css">
        </head>
        <body>
            <div class="container">
                <h1>Externe CSS Voorbeeld</h1>
                <p>Deze pagina gebruikt een extern CSS bestand!</p>
                <p>De styling staat nu netjes gescheiden in static/css/style.css</p>
                <a href="/" class="button">Terug naar home</a>
            </div>
        </body>
    </html>
    """
```

### Belangrijk detail

Let op deze regel in de HTML:

```html
<link rel="stylesheet" href="/static/css/style.css">
```

- `href="/static/css/style.css"` - Dit pad komt overeen met hoe we de static files gemount hebben
- De browser laadt nu het CSS bestand van de server

### Testen

Start je server en ga naar [http://127.0.0.1:8000/extern](http://127.0.0.1:8000/extern).

Je zou een mooi gestylede pagina moeten zien!

## Voordelen van externe CSS

1. **Herbruikbaarheid** - Gebruik dezelfde CSS op meerdere pagina's
2. **Onderhoudbaarheid** - Wijzig styling op één plek
3. **Overzichtelijkheid** - HTML en CSS zijn gescheiden
4. **Caching** - Browsers kunnen CSS bestanden cachen voor betere performance

## Samenvatting

Je hebt nu geleerd om:
- ✅ Static files te configureren in FastAPI
- ✅ Externe CSS bestanden te maken en te gebruiken
- ✅ Meerdere CSS bestanden te linken in één HTML pagina
- ✅ Een goede mappenstructuur aan te maken voor je project

In de volgende les gaan we kijken naar HTML templates met Jinja2, waarmee we dynamische content kunnen genereren!
