---
sidebar_position: 6
---

# Afbeeldingen tonen

In deze korte tutorial leer je hoe je een afbeelding kunt tonen op een HTML pagina via FastAPI. Dit is een super simpele introductie voordat we verder gaan met formulieren!

## Stap 1: Afbeelding klaarzetten

Zorg dat je een `static` folder hebt in je project. Plaats een afbeelding (bijvoorbeeld `cat.jpg`, `logo.png`, of `photo.gif`) in deze folder.

Je mappenstructuur ziet er dan zo uit:
```
mijn_project/
├── main.py
├── templates/
└── static/
    └── cat.jpg          # Jouw afbeelding
```

## Stap 2: Static files configureren

Voeg deze code toe aan je `main.py` (als je dit nog niet hebt):

```python
from fastapi import FastAPI
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles

app = FastAPI()

# Mount de static folder
app.mount("/static", StaticFiles(directory="static"), name="static")
```

### Wat doet deze code?

- `StaticFiles(directory="static")` - Vertelt FastAPI waar je static files staan
- `app.mount("/static", ...)` - Maakt alle bestanden in de `static` folder bereikbaar via `/static/bestandsnaam`

## Stap 3: HTML pagina met afbeelding

Voeg deze endpoint toe aan je `main.py`:

```python
@app.get("/foto", response_class=HTMLResponse)
async def toon_foto():
    return """
    <!DOCTYPE html>
    <html>
        <head>
            <title>Mijn Foto</title>
        </head>
        <body>
            <h1>Kijk naar deze foto!</h1>
            <img src="/static/cat.jpg" alt="Een schattige kat">
            <p>Dit is een afbeelding die wordt geserveerd via FastAPI.</p>
        </body>
    </html>
    """
```

**Belangrijk:** Vervang `cat.jpg` door de naam van jouw afbeelding!

## Stap 4: Testen

1. Start je server: `fastapi dev main.py`
2. Ga naar: [http://127.0.0.1:8000/foto](http://127.0.0.1:8000/foto)
3. Je zou nu je afbeelding moeten zien!

## De `<img>` tag uitgelegd

```html
<img src="/static/cat.jpg" alt="Een schattige kat">
```

- `<img>` - HTML tag voor afbeeldingen (heeft geen sluit-tag!)
- `src="/static/cat.jpg"` - Het pad naar de afbeelding (via de static folder)
- `alt="..."` - Alternatieve tekst (voor als de afbeelding niet laadt, en voor screen readers)

## Opdrachten

### Opdracht 1: Predict - Wat zie je?

Bekijk deze code:

```html
<img src="/static/logo.png" alt="Logo" width="200">
<img src="/static/photo.jpg" alt="Foto">
```

**Vragen:**
1. Welke afbeelding wordt groter getoond?
2. Wat gebeurt er als `photo.jpg` niet bestaat?
3. Hoe wordt de hoogte bepaald als alleen width is ingesteld?

<details>
<summary>Klik hier voor de antwoorden</summary>

1. De `logo.png` heeft een vaste breedte van 200 pixels. De `photo.jpg` heeft geen width ingesteld en wordt dus in zijn originele grootte getoond (tenzij CSS dit anders maakt).
2. Als `photo.jpg` niet bestaat, zie je de alt tekst "Foto" en een broken image icon.
3. De hoogte wordt automatisch berekend om de aspect ratio (verhouding) van de afbeelding te behouden, zodat hij niet vervormd wordt.

</details>

### Opdracht 2: Run - Toon je eigen afbeelding

1. Zoek een afbeelding op je computer of download een leuke afbeelding van internet
2. Plaats de afbeelding in je `static` folder
3. Maak een nieuwe endpoint `/mijnfoto` die deze afbeelding toont
4. Voeg een leuke titel en beschrijving toe

Test het in je browser!

### Opdracht 3: Investigate - Verschillende afbeeldingsformaten

FastAPI kan verschillende afbeeldingsformaten serveren:
- `.jpg` / `.jpeg` - Foto's (goede compressie)
- `.png` - Afbeeldingen met transparantie
- `.gif` - Geanimeerde afbeeldingen
- `.webp` - Modern formaat (kleine bestandsgrootte)

**Opdracht:** Probeer verschillende formaten uit. Welke werken er allemaal?

### Opdracht 4: Modify - Meerdere afbeeldingen

Pas je `/foto` endpoint aan zodat het 3 verschillende afbeeldingen toont onder elkaar.

**Tip:** Je kunt meerdere `<img>` tags gebruiken!

<details>
<summary>Klik hier voor een voorbeeldoplossing</summary>

```python
@app.get("/gallerij", response_class=HTMLResponse)
async def gallerij():
    return """
    <!DOCTYPE html>
    <html>
        <head>
            <title>Foto Gallerij</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    text-align: center;
                    padding: 20px;
                    background-color: #f5f5f5;
                }
                .gallery {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 30px;
                }
                .photo {
                    background: white;
                    padding: 20px;
                    border-radius: 10px;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
                }
                img {
                    max-width: 500px;
                    border-radius: 8px;
                }
                h3 {
                    margin: 10px 0 5px 0;
                    color: #333;
                }
                p {
                    color: #666;
                    margin: 0;
                }
            </style>
        </head>
        <body>
            <h1>Mijn Foto Gallerij</h1>

            <div class="gallery">
                <div class="photo">
                    <img src="/static/foto1.jpg" alt="Foto 1">
                    <h3>Vakantie 2024</h3>
                    <p>Een mooie dag aan het strand</p>
                </div>

                <div class="photo">
                    <img src="/static/foto2.jpg" alt="Foto 2">
                    <h3>Huisdier</h3>
                    <p>Mijn lieve hond</p>
                </div>

                <div class="photo">
                    <img src="/static/foto3.jpg" alt="Foto 3">
                    <h3>Hobby</h3>
                    <p>Bezig met programmeren</p>
                </div>
            </div>
        </body>
    </html>
    """
```

</details>

### Opdracht 5: Make - Profiel pagina met foto

Maak een nieuwe endpoint `/profiel` die een profiel pagina toont met:
- Een profiel foto (plaats een foto van jezelf of een avatar in de static folder)
- Je naam als titel
- Een korte bio (2-3 zinnen over jezelf)
- Een lijst met hobby's

Style het netjes met CSS!

<details>
<summary>Klik hier voor een voorbeeldoplossing</summary>

```python
@app.get("/profiel", response_class=HTMLResponse)
async def profiel():
    return """
    <!DOCTYPE html>
    <html>
        <head>
            <title>Mijn Profiel</title>
            <style>
                body {
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    min-height: 100vh;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin: 0;
                    padding: 20px;
                }
                .profile-card {
                    background: white;
                    border-radius: 20px;
                    padding: 40px;
                    max-width: 500px;
                    text-align: center;
                    box-shadow: 0 10px 40px rgba(0,0,0,0.2);
                }
                .profile-photo {
                    width: 150px;
                    height: 150px;
                    border-radius: 50%;
                    object-fit: cover;
                    border: 5px solid #667eea;
                    margin-bottom: 20px;
                }
                h1 {
                    color: #333;
                    margin: 10px 0;
                }
                .bio {
                    color: #666;
                    line-height: 1.6;
                    margin: 20px 0;
                }
                .hobbies {
                    text-align: left;
                    margin-top: 30px;
                }
                .hobbies h2 {
                    color: #667eea;
                    font-size: 1.2em;
                    margin-bottom: 15px;
                }
                .hobbies ul {
                    list-style: none;
                    padding: 0;
                }
                .hobbies li {
                    background: #f5f5f5;
                    padding: 10px 15px;
                    margin: 8px 0;
                    border-radius: 8px;
                    color: #555;
                }
                .hobbies li:before {
                    content: "🎯 ";
                }
            </style>
        </head>
        <body>
            <div class="profile-card">
                <img src="/static/profiel.jpg" alt="Profiel foto" class="profile-photo">
                <h1>Jouw Naam</h1>
                <p class="bio">
                    Hallo! Ik ben een enthousiaste leerling die graag bezig is met
                    programmeren en nieuwe technologieën leren. Ik vind het geweldig
                    om creatieve projecten te maken en uit te dagen.
                </p>

                <div class="hobbies">
                    <h2>Mijn Hobby's</h2>
                    <ul>
                        <li>Programmeren (vooral Python en web development)</li>
                        <li>Gamen (RPG's en strategie games)</li>
                        <li>Muziek luisteren en ontdekken</li>
                        <li>Sport (voetbal en fitness)</li>
                    </ul>
                </div>
            </div>
        </body>
    </html>
    """
```

**Vergeet niet:** Vervang `profiel.jpg` door de naam van jouw foto!

</details>

## Troubleshooting

### Afbeelding laadt niet (404 error)

Controleer:
1. Staat de afbeelding écht in de `static` folder?
2. Is de bestandsnaam correct gespeld? (let op hoofdletters!)
3. Heb je `app.mount("/static", ...)` toegevoegd aan je code?

### Afbeelding is te groot

Gebruik CSS om de grootte aan te passen:

```css
img {
    max-width: 100%;   /* Past zich aan aan de container */
    height: auto;      /* Behoudt aspect ratio */
}
```

### Broken image icon

Dit betekent dat de afbeelding niet gevonden kan worden. Check het pad in `src="..."`.

## Samenvatting

Je hebt nu geleerd om:
- ✅ Afbeeldingen te plaatsen in de `static` folder
- ✅ Static files te configureren in FastAPI
- ✅ De `<img>` tag te gebruiken in HTML
- ✅ Afbeeldingen te stylen met CSS
- ✅ Meerdere afbeeldingen te tonen op één pagina

Nu je weet hoe je afbeeldingen toont, ben je klaar voor de volgende stap: **formulieren** waarmee gebruikers data kunnen invoeren!
