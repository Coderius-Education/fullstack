---
sidebar_position: 5
---

# HTML in bestanden

Tot nu toe schrijf je HTML als strings in Python. Dat wordt onoverzichtelijk bij grote pagina's. In deze les leer je hoe je HTML in aparte bestanden zet.

## Mappenstructuur

Maak een `pages` folder in je `static` folder:

```
je-project/
├── main.py
└── static/
    ├── css/
    │   └── style.css
    └── pages/
        └── home.html
```

## HTML bestand maken

Maak `static/pages/home.html`:

```html
<!DOCTYPE html>
<html>
    <head>
        <title>Home</title>
        <link rel="stylesheet" href="/static/css/style.css">
    </head>
    <body>
        <h1>Welkom!</h1>
        <p>Dit is een HTML bestand, geen Python string.</p>
    </body>
</html>
```

## FileResponse gebruiken

Pas je `main.py` aan:

```python
from fastapi import FastAPI
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles

app = FastAPI()
app.mount("/static", StaticFiles(directory="static"), name="static")

@app.get("/")
async def home():
    return FileResponse("static/pages/home.html")
```

### Wat is nieuw?

- `FileResponse("static/pages/home.html")` - Stuurt een bestand terug in plaats van een string
- De HTML staat nu in een apart `.html` bestand
- Je krijgt syntax highlighting in je editor

## Testen

Ga naar [http://127.0.0.1:8000](http://127.0.0.1:8000). Je ziet de HTML pagina met CSS styling!

## Opdrachten

### Opdracht 1: Predict - Wat gebeurt er?

```python
@app.get("/contact")
async def contact():
    return FileResponse("static/pages/contact.html")
```

**Vraag:** Wat gebeurt er als `contact.html` niet bestaat?

<details>
<summary>Klik hier voor het antwoord</summary>

Je krijgt een error (500 Internal Server Error) omdat het bestand niet gevonden kan worden.

</details>

### Opdracht 2: Make - Twee pagina's

Maak twee HTML bestanden (`home.html` en `about.html`) met elk een eigen endpoint. Voeg op elke pagina een link naar de andere toe:

```html
<a href="/about">Over Mij</a>
```

### Opdracht 3: Make - Drie pagina's met navigatie

Maak drie pagina's (home, about, contact) die allemaal dezelfde CSS laden en links naar elkaar hebben.
