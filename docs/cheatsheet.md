---
sidebar_class_name: hidden
---

# Cheatsheet

Snelle referentie voor alles wat je hebt geleerd. Klik op een onderwerp om het te openen.

## JavaScript

<details>
<summary>Script toevoegen aan HTML</summary>

```html
<body>
    <!-- Je HTML hier -->

    <script>
        // Je JavaScript hier
    </script>
</body>
```

Zet `<script>` altijd **onderaan** de `<body>`!

</details>

<details>
<summary>Variabelen (let en const)</summary>

```javascript
let score = 0;       // Kan veranderen
score = 10;

const naam = "Jan";  // Kan NIET veranderen
```

</details>

<details>
<summary>Element selecteren</summary>

```javascript
document.getElementById("mijn_id")
```

Geeft het HTML element met `id="mijn_id"` terug.

</details>

<details>
<summary>Inhoud veranderen (innerHTML)</summary>

```javascript
document.getElementById("titel").innerHTML = "Nieuwe tekst";
```

</details>

<details>
<summary>Style aanpassen</summary>

```javascript
document.getElementById("titel").style.color = "blue";
document.getElementById("titel").style.fontSize = "24px";
document.getElementById("titel").style.backgroundColor = "yellow";
```

**Let op:** CSS `font-size` wordt `fontSize` in JavaScript (camelCase)!

</details>

<details>
<summary>console.log() (debuggen)</summary>

```javascript
console.log("Dit verschijnt in de console (F12)");
```

</details>

<details>
<summary>Functie maken</summary>

```javascript
function begroet() {
    alert("Hallo!");
}

begroet();  // Voert de functie uit
```

</details>

<details>
<summary>Klik event (addEventListener)</summary>

```javascript
function doeIets() {
    // Code die bij klik wordt uitgevoerd
}

document.getElementById("knop").addEventListener("click", doeIets);
```

**Let op:** functienaam **zonder haakjes** bij addEventListener!

</details>

## FastAPI

<details>
<summary>FastAPI app aanmaken</summary>

```python
from fastapi import FastAPI

app = FastAPI()
```

</details>

<details>
<summary>Server starten</summary>

```bash
fastapi dev main.py
```

Open: `http://127.0.0.1:8000`

</details>

<details>
<summary>GET endpoint (JSON)</summary>

```python
@app.get("/")
async def root():
    return {"bericht": "Hallo!"}
```

</details>

<details>
<summary>GET endpoint (HTML)</summary>

```python
from fastapi.responses import HTMLResponse

@app.get("/pagina", response_class=HTMLResponse)
async def pagina():
    return """
    <html>
        <body><h1>Hallo!</h1></body>
    </html>
    """
```

</details>

<details>
<summary>Static files instellen</summary>

```python
from fastapi.staticfiles import StaticFiles

app.mount("/static", StaticFiles(directory="static"), name="static")
```

</details>

<details>
<summary>HTML bestand serveren (FileResponse)</summary>

```python
from fastapi.responses import FileResponse

@app.get("/")
async def home():
    return FileResponse("static/pages/home.html")
```

</details>

<details>
<summary>POST endpoint (Form data)</summary>

```python
from fastapi import Form

@app.post("/verstuur")
async def verstuur(naam: str = Form(...)):
    return {"naam": naam}
```

**Let op:** de `name` in HTML moet matchen met de Python parameter!

</details>

<details>
<summary>Jinja2 template response</summary>

```python
from fastapi import Request
from fastapi.templating import Jinja2Templates

templates = Jinja2Templates(directory="templates")

@app.post("/groet")
async def groet(request: Request, naam: str = Form(...)):
    return templates.TemplateResponse(
        "resultaat.html",
        {"request": request, "naam": naam}
    )
```

**Let op:** `"request": request` moet altijd in het dictionary!

</details>

## HTML

<details>
<summary>Basis HTML pagina</summary>

```html
<!DOCTYPE html>
<html>
    <head>
        <title>Titel</title>
    </head>
    <body>
        <h1>Heading</h1>
        <p>Paragraaf</p>
    </body>
</html>
```

</details>

<details>
<summary>CSS koppelen</summary>

```html
<link rel="stylesheet" href="/static/css/style.css">
```

</details>

<details>
<summary>Afbeelding tonen</summary>

```html
<img src="/static/foto.jpg" alt="Beschrijving">
```

</details>

<details>
<summary>Link naar andere pagina</summary>

```html
<a href="/about">Ga naar About</a>
```

**Let op:** link naar het **endpoint**, niet naar het bestand!

</details>

<details>
<summary>Formulier (POST)</summary>

```html
<form method="post" action="/verstuur">
    <input type="text" name="naam" required>
    <button type="submit">Verstuur</button>
</form>
```

**Let op:** `name` in HTML moet matchen met de parameter in Python!

</details>

<details>
<summary>Template variabele (Jinja2)</summary>

In de template:
```html
<h1>Hallo {{ naam }}!</h1>
```

Wordt vervangen door de waarde uit Python.

</details>

## Database (sqlitedict)

<details>
<summary>Installatie</summary>

```bash
pip install sqlitedict
```

</details>

<details>
<summary>Data opslaan</summary>

```python
from sqlitedict import SqliteDict

with SqliteDict("data.db") as db:
    db["naam"] = "Jan"
    db.commit()  # NIET vergeten!
```

</details>

<details>
<summary>Data uitlezen</summary>

```python
with SqliteDict("data.db") as db:
    print(db["naam"])
```

</details>

<details>
<summary>Data veilig uitlezen (met default)</summary>

```python
with SqliteDict("data.db") as db:
    # Crasht niet als "naam" niet bestaat:
    naam = db.get("naam", "Niet gevonden")
```

</details>

<details>
<summary>Data verwijderen</summary>

```python
with SqliteDict("data.db") as db:
    del db["naam"]
    db.commit()
```

</details>

<details>
<summary>Alles bekijken</summary>

```python
with SqliteDict("data.db") as db:
    for key, value in db.items():
        print(key, value)
```

</details>

## Mappenstructuur

<details>
<summary>Compleet project</summary>

```
je-project/
├── main.py
├── static/
│   ├── css/
│   │   └── style.css
│   ├── pages/
│   │   ├── home.html
│   │   └── form.html
│   └── foto.jpg
└── templates/
    └── resultaat.html
```

</details>
