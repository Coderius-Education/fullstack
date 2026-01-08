---
sidebar_position: 5
---

# HTML in apart bestand

Tot nu toe hebben we HTML als strings in onze Python code geschreven. Dit werkt, maar het is niet handig als je dynamische content wilt tonen (bijvoorbeeld de naam van een gebruiker, of een lijst met items). Daarom gaan we nu **Jinja2 templates** gebruiken!

## Wat is Jinja2?

Jinja2 is een template engine voor Python. Het stelt je in staat om:
- Variabelen vanuit Python in je HTML te tonen
- Loops te gebruiken om lijsten weer te geven
- If-statements te gebruiken voor conditionele content
- HTML code herbruikbaar te maken

## Jinja2 installeren

Jinja2 is al geïnstalleerd als je `fastapi[standard]` hebt geïnstalleerd. Zo niet, installeer het met:

```bash
pip install jinja2
```

## Mappenstructuur aanmaken

Maak een `templates` map in je project:

```
je-project/
├── main.py
├── static/
│   └── css/
│       └── style.css
└── templates/
    └── home.html
```

## Templates configureren in FastAPI

Voeg deze imports toe aan je `main.py`:

```python
from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
```

Configureer Jinja2 na je app initialisatie:

```python
app = FastAPI()

# Static files
app.mount("/static", StaticFiles(directory="static"), name="static")

# Templates
templates = Jinja2Templates(directory="templates")
```

### Wat doet deze code?

- `Jinja2Templates(directory="templates")` - Vertelt FastAPI waar de template bestanden staan
- `templates` - Dit object gebruiken we om templates te renderen

## Je eerste template

Maak een bestand `templates/home.html`:

```html
<!DOCTYPE html>
<html>
    <head>
        <title>Home</title>
    </head>
    <body>
        <h1>Welkom, {{ naam }}!</h1>
        <p>Je bent {{ leeftijd }} jaar oud.</p>
    </body>
</html>
```

### Wat betekent `{{ }}` ?

- `{{ variabele }}` - Toont de waarde van een variabele vanuit Python
- Dit heet een **template variabele**

## Template gebruiken in FastAPI

Voeg deze endpoint toe aan `main.py`:

```python
@app.get("/", response_class=HTMLResponse)
async def home(request: Request):
    return templates.TemplateResponse(
        "home.html",
        {
            "request": request,
            "naam": "Jan",
            "leeftijd": 16
        }
    )
```

### Wat doet deze code?

- `request: Request` - FastAPI parameter die we door moeten geven aan de template
- `templates.TemplateResponse()` - Rendert een template
- `"home.html"` - De naam van het template bestand
- Het dictionary `{"request": request, "naam": "Jan", ...}` - De variabelen die beschikbaar zijn in de template

### Testen

Start je server en ga naar [http://127.0.0.1:8000/](http://127.0.0.1:8000/).

Je zou moeten zien: "Welkom, Jan! Je bent 16 jaar oud."

## Opdrachten

### Opdracht 1: Predict - Voorspel de output

Bekijk deze template `groet.html`:

```html
<!DOCTYPE html>
<html>
    <body>
        <h1>{{ groet }}, {{ naam }}!</h1>
        <p>Het is nu {{ tijd }}.</p>
    </body>
</html>
```

En deze Python code:

```python
@app.get("/groet", response_class=HTMLResponse)
async def groet(request: Request):
    return templates.TemplateResponse(
        "groet.html",
        {
            "request": request,
            "groet": "Goedemorgen",
            "naam": "Sarah",
            "tijd": "08:30"
        }
    )
```

**Vraag:** Wat zie je als je naar `/groet` gaat?

<details>
<summary>Klik hier voor het antwoord</summary>

Je ziet:

```
Goedemorgen, Sarah!
Het is nu 08:30.
```

De variabelen `{{ groet }}`, `{{ naam }}` en `{{ tijd }}` worden vervangen door de waarden uit het dictionary.

</details>

### Opdracht 2: Run - Test het uit

Maak de bestanden uit Opdracht 1 en test het in je browser.

**Vraag:** Kwam het overeen met je voorspelling?

## Samenvatting

Je hebt nu geleerd om:
- ✅ Jinja2 templates te configureren in FastAPI
- ✅ Variabelen door te geven van Python naar HTML

In de volgende les gaan we kijken naar formulieren en hoe we data van gebruikers kunnen ontvangen!
