---
sidebar_position: 7
---

# Input van gebruiker

Tot nu toe hebben we alleen data *getoond* aan gebruikers. Maar hoe ontvangen we data *van* gebruikers? Dat doen we met HTML formulieren! In deze les leer je hoe je formulieren maakt en hoe je de data verwerkt in FastAPI.

## Wat zijn formulieren?

Formulieren zijn HTML elementen waarmee gebruikers data kunnen invoeren en versturen naar de server. Denk aan:
- Inlogformulieren (gebruikersnaam + wachtwoord)
- Registratieformulieren (naam, email, etc.)
- Contactformulieren
- Zoekformulieren

## Een simpel formulier maken

Maak `templates/contact.html`:

```html
<!DOCTYPE html>
<html>
    <head>
        <title>Contact</title>
    </head>
    <body>
        <h1>Contact Formulier</h1>
        <form method="post" action="/contact">
            <div>
                <label for="naam">Naam:</label>
                <input type="text" id="naam" name="naam" required>
            </div>

            <div>
                <label for="email">Email:</label>
                <input type="email" id="email" name="email" required>
            </div>

            <div>
                <label for="bericht">Bericht:</label>
                <textarea id="bericht" name="bericht" rows="5" required></textarea>
            </div>

            <button type="submit">Verstuur</button>
        </form>
    </body>
</html>
```

### Belangrijke HTML elementen

- `<form method="post" action="/contact">` - Het formulier stuurt data via POST naar `/contact`
- `<input type="text" name="naam">` - Tekst invoerveld met naam "naam"
- `<input type="email" name="email">` - Email invoerveld (met validatie)
- `<textarea name="bericht">` - Meerdere regels tekst
- `name="..."` - De naam van het veld (belangrijk voor FastAPI!)
- `required` - Dit veld is verplicht
- `<button type="submit">` - Knop om het formulier te versturen

## Form data ontvangen in FastAPI

Voeg deze imports toe aan `main.py`:

```python
from fastapi import FastAPI, Request, Form
from fastapi.responses import HTMLResponse, RedirectResponse
from fastapi.templating import Jinja2Templates
```

### GET endpoint (formulier tonen)

```python
@app.get("/contact", response_class=HTMLResponse)
async def contact_form(request: Request):
    return templates.TemplateResponse(
        "contact.html",
        {"request": request}
    )
```

### POST endpoint (data ontvangen)

```python
@app.post("/contact")
async def contact_submit(
    naam: str = Form(...),
    email: str = Form(...),
    bericht: str = Form(...)
):
    # Hier kun je iets doen met de data
    print(f"Naam: {naam}")
    print(f"Email: {email}")
    print(f"Bericht: {bericht}")

    # Redirect naar een bedankt pagina
    return RedirectResponse(url="/bedankt", status_code=303)
```

### Wat doet deze code?

- `@app.post("/contact")` - Luistert naar POST requests op `/contact`
- `naam: str = Form(...)` - Haalt het veld `naam` uit het formulier
- `Form(...)` - Vertelt FastAPI dat dit een form veld is
- `RedirectResponse` - Stuurt de gebruiker door naar een andere pagina

### Bedankt pagina

Maak `templates/bedankt.html`:

```html
<!DOCTYPE html>
<html>
    <head>
        <title>Bedankt</title>
    </head>
    <body>
        <h1>Bedankt!</h1>
        <p>Je bericht is succesvol verzonden.</p>
        <a href="/contact">Nog een bericht sturen</a>
    </body>
</html>
```

En de endpoint:

```python
@app.get("/bedankt", response_class=HTMLResponse)
async def bedankt(request: Request):
    return templates.TemplateResponse(
        "bedankt.html",
        {"request": request}
    )
```

## Form data terug tonen

Je kunt de ingevoerde data ook terug tonen aan de gebruiker. Pas de POST endpoint aan:

```python
@app.post("/contact")
async def contact_submit(
    request: Request,
    naam: str = Form(...),
    email: str = Form(...),
    bericht: str = Form(...)
):
    return templates.TemplateResponse(
        "contact_resultaat.html",
        {
            "request": request,
            "naam": naam,
            "email": email,
            "bericht": bericht
        }
    )
```

Maak `templates/contact_resultaat.html`:

```html
<!DOCTYPE html>
<html>
    <head>
        <title>Bericht Ontvangen</title>
    </head>
    <body>
        <h1>Bericht Ontvangen</h1>
        <div>
            <p><strong>Naam:</strong> {{ naam }}</p>
            <p><strong>Email:</strong> {{ email }}</p>
            <p><strong>Bericht:</strong><br>{{ bericht }}</p>
        </div>
        <a href="/contact">Terug naar formulier</a>
    </body>
</html>
```

## Verschillende input types

HTML heeft verschillende input types voor verschillende soorten data:

```html
<!-- Tekst -->
<input type="text" name="naam">

<!-- Email (met validatie) -->
<input type="email" name="email">

<!-- Wachtwoord (verborgen) -->
<input type="password" name="wachtwoord">

<!-- Nummer -->
<input type="number" name="leeftijd" min="0" max="120">

<!-- Datum -->
<input type="date" name="geboortedatum">

<!-- Checkbox -->
<input type="checkbox" name="nieuwsbrief" value="ja">

<!-- Radio buttons -->
<input type="radio" name="geslacht" value="man"> Man
<input type="radio" name="geslacht" value="vrouw"> Vrouw

<!-- Select (dropdown) -->
<select name="land">
    <option value="nl">Nederland</option>
    <option value="be">België</option>
    <option value="de">Duitsland</option>
</select>
```

## Opdrachten

### Opdracht 1: Predict - Wat gebeurt er?

Bekijk dit formulier:

```html
<form method="post" action="/registreer">
    <input type="text" name="gebruikersnaam">
    <input type="password" name="wachtwoord">
    <button type="submit">Registreer</button>
</form>
```

En deze Python code:

```python
@app.post("/registreer")
async def registreer(
    gebruikersnaam: str = Form(...),
    wachtwoord: str = Form(...)
):
    return {"gebruiker": gebruikersnaam, "wachtwoord_lengte": len(wachtwoord)}
```

**Vragen:**
1. Wat gebeurt er als je op "Registreer" klikt?
2. Welke HTTP method wordt gebruikt?
3. Wat wordt er geretourneerd?

<details>
<summary>Klik hier voor de antwoorden</summary>

1. Het formulier stuurt de data via POST naar `/registreer`. FastAPI ontvangt de data en voert de functie uit.
2. POST method (staat in `method="post"`)
3. Een JSON object met de gebruikersnaam en de lengte van het wachtwoord (niet het wachtwoord zelf - goed voor security!)

Voorbeeld output: `{"gebruiker": "jan123", "wachtwoord_lengte": 8}`

</details>

### Opdracht 2: Run - Test een simpel formulier

Maak het contact formulier uit de les en test het:
1. Maak `templates/contact.html`
2. Voeg de GET en POST endpoints toe aan `main.py`
3. Maak `templates/bedankt.html`
4. Test het in je browser op `/contact`

**Vraag:** Zie je de data in je terminal als je het formulier verstuurt?

### Opdracht 3: Investigate - Optionele velden

Bekijk dit verschil:

```python
# Verplicht veld
naam: str = Form(...)

# Optioneel veld met default waarde
telefoonnummer: str = Form(None)

# Optioneel veld met andere default
land: str = Form("Nederland")
```

**Vragen:**
1. Wat gebeurt er als je een verplicht veld leeg laat?
2. Wat is de waarde van `telefoonnummer` als je het veld leeg laat?
3. Hoe kun je in de template checken of een optioneel veld is ingevuld?

<details>
<summary>Klik hier voor de antwoorden</summary>

1. FastAPI geeft een error (422 Unprocessable Entity) omdat het veld verplicht is door `Form(...)`
2. De waarde is `None` (Python's null waarde)
3. In de template kun je checken met:
```html
{% if telefoonnummer %}
    <p>Telefoonnummer: {{ telefoonnummer }}</p>
{% else %}
    <p>Geen telefoonnummer opgegeven</p>
{% endif %}
```

</details>

### Opdracht 4: Modify - Voeg velden toe

Pas het contact formulier aan door deze velden toe te voegen:
1. Een telefoonnummer veld (optioneel)
2. Een dropdown voor het onderwerp (keuze uit: "Vraag", "Klacht", "Compliment")
3. Een checkbox voor "Ik wil een antwoord ontvangen"

Update ook de POST endpoint om deze velden te ontvangen en toon ze in het resultaat.

<details>
<summary>Klik hier voor een voorbeeldoplossing</summary>

**templates/contact_uitgebreid.html:**
```html
<!DOCTYPE html>
<html>
    <head>
        <title>Contact</title>
    </head>
    <body>
        <h1>Contact Formulier</h1>
        <form method="post" action="/contact-uitgebreid">
            <div>
                <label for="naam">Naam:</label>
                <input type="text" id="naam" name="naam" required>
            </div>

            <div>
                <label for="email">Email:</label>
                <input type="email" id="email" name="email" required>
            </div>

            <div>
                <label for="telefoon">Telefoonnummer (optioneel):</label>
                <input type="tel" id="telefoon" name="telefoon">
            </div>

            <div>
                <label for="onderwerp">Onderwerp:</label>
                <select id="onderwerp" name="onderwerp" required>
                    <option value="vraag">Vraag</option>
                    <option value="klacht">Klacht</option>
                    <option value="compliment">Compliment</option>
                </select>
            </div>

            <div>
                <label for="bericht">Bericht:</label>
                <textarea id="bericht" name="bericht" rows="5" required></textarea>
            </div>

            <div>
                <input type="checkbox" id="antwoord" name="antwoord" value="ja">
                <label for="antwoord">Ik wil een antwoord ontvangen</label>
            </div>

            <button type="submit">Verstuur</button>
        </form>
    </body>
</html>
```

**main.py:**
```python
@app.get("/contact-uitgebreid", response_class=HTMLResponse)
async def contact_uitgebreid_form(request: Request):
    return templates.TemplateResponse(
        "contact_uitgebreid.html",
        {"request": request}
    )

@app.post("/contact-uitgebreid")
async def contact_uitgebreid_submit(
    request: Request,
    naam: str = Form(...),
    email: str = Form(...),
    telefoon: str = Form(None),
    onderwerp: str = Form(...),
    bericht: str = Form(...),
    antwoord: str = Form(None)
):
    return templates.TemplateResponse(
        "contact_uitgebreid_resultaat.html",
        {
            "request": request,
            "naam": naam,
            "email": email,
            "telefoon": telefoon,
            "onderwerp": onderwerp,
            "bericht": bericht,
            "antwoord": antwoord
        }
    )
```

**templates/contact_uitgebreid_resultaat.html:**
```html
<!DOCTYPE html>
<html>
    <head>
        <title>Bericht Ontvangen</title>
    </head>
    <body>
        <h1>Bericht Ontvangen</h1>
        <div>
            <p><strong>Naam:</strong> {{ naam }}</p>
            <p><strong>Email:</strong> {{ email }}</p>
            {% if telefoon %}
            <p><strong>Telefoon:</strong> {{ telefoon }}</p>
            {% endif %}
            <p><strong>Onderwerp:</strong> {{ onderwerp|upper }}</p>
            <p><strong>Bericht:</strong><br>{{ bericht }}</p>
            <p>
                {% if antwoord %}
                    ✅ U wilt een antwoord ontvangen
                {% else %}
                    ℹ️ U wilt geen antwoord ontvangen
                {% endif %}
            </p>
        </div>
        <a href="/contact-uitgebreid">Terug naar formulier</a>
    </body>
</html>
```

</details>

### Opdracht 5: Make - Registratie formulier

Maak een registratie formulier voor een website met de volgende velden:
- Gebruikersnaam (verplicht, text)
- Email (verplicht, email)
- Wachtwoord (verplicht, password)
- Wachtwoord bevestigen (verplicht, password)
- Geboortedatum (verplicht, date)
- Land (verplicht, select met minimaal 3 landen)
- Akkoord met voorwaarden (verplicht, checkbox)

**Extra uitdaging:** Check in Python of de twee wachtwoorden hetzelfde zijn. Als ze niet hetzelfde zijn, toon dan een error pagina.

<details>
<summary>Klik hier voor een voorbeeldoplossing</summary>

**templates/registratie.html:**
```html
<!DOCTYPE html>
<html>
    <head>
        <title>Registratie</title>
    </head>
    <body>
        <h1>Registreren</h1>
        <form method="post" action="/registratie">
            <div>
                <label for="gebruikersnaam">Gebruikersnaam *</label>
                <input type="text" id="gebruikersnaam" name="gebruikersnaam" required>
            </div>

            <div>
                <label for="email">Email *</label>
                <input type="email" id="email" name="email" required>
            </div>

            <div>
                <label for="wachtwoord">Wachtwoord *</label>
                <input type="password" id="wachtwoord" name="wachtwoord" required minlength="6">
            </div>

            <div>
                <label for="wachtwoord_bevestig">Bevestig wachtwoord *</label>
                <input type="password" id="wachtwoord_bevestig" name="wachtwoord_bevestig" required minlength="6">
            </div>

            <div>
                <label for="geboortedatum">Geboortedatum *</label>
                <input type="date" id="geboortedatum" name="geboortedatum" required>
            </div>

            <div>
                <label for="land">Land *</label>
                <select id="land" name="land" required>
                    <option value="">Kies een land...</option>
                    <option value="nederland">Nederland</option>
                    <option value="belgie">België</option>
                    <option value="duitsland">Duitsland</option>
                    <option value="frankrijk">Frankrijk</option>
                    <option value="vk">Verenigd Koninkrijk</option>
                </select>
            </div>

            <div>
                <input type="checkbox" id="voorwaarden" name="voorwaarden" value="akkoord" required>
                <label for="voorwaarden">Ik ga akkoord met de algemene voorwaarden *</label>
            </div>

            <button type="submit">Registreer</button>
        </form>
    </body>
</html>
```

**main.py:**
```python
@app.get("/registratie", response_class=HTMLResponse)
async def registratie_form(request: Request):
    return templates.TemplateResponse(
        "registratie.html",
        {"request": request}
    )

@app.post("/registratie")
async def registratie_submit(
    request: Request,
    gebruikersnaam: str = Form(...),
    email: str = Form(...),
    wachtwoord: str = Form(...),
    wachtwoord_bevestig: str = Form(...),
    geboortedatum: str = Form(...),
    land: str = Form(...),
    voorwaarden: str = Form(None)
):
    # Check of wachtwoorden overeenkomen
    if wachtwoord != wachtwoord_bevestig:
        return templates.TemplateResponse(
            "registratie_error.html",
            {
                "request": request,
                "error": "De wachtwoorden komen niet overeen!"
            }
        )

    # Check of voorwaarden geaccepteerd zijn
    if voorwaarden != "akkoord":
        return templates.TemplateResponse(
            "registratie_error.html",
            {
                "request": request,
                "error": "Je moet akkoord gaan met de voorwaarden!"
            }
        )

    # Alles is OK, toon success pagina
    return templates.TemplateResponse(
        "registratie_success.html",
        {
            "request": request,
            "gebruikersnaam": gebruikersnaam,
            "email": email,
            "geboortedatum": geboortedatum,
            "land": land
        }
    )
```

**templates/registratie_error.html:**
```html
<!DOCTYPE html>
<html>
    <head>
        <title>Registratie Fout</title>
    </head>
    <body>
        <h1>❌ Registratie mislukt</h1>
        <p><strong>Error:</strong> {{ error }}</p>
        <a href="/registratie">← Terug naar registratie</a>
    </body>
</html>
```

**templates/registratie_success.html:**
```html
<!DOCTYPE html>
<html>
    <head>
        <title>Registratie Gelukt</title>
    </head>
    <body>
        <h1>✅ Registratie Gelukt!</h1>
        <h2>Welkom, {{ gebruikersnaam }}!</h2>
        <p>Je account is succesvol aangemaakt.</p>

        <div>
            <p><strong>Gebruikersnaam:</strong> {{ gebruikersnaam }}</p>
            <p><strong>Email:</strong> {{ email }}</p>
            <p><strong>Geboortedatum:</strong> {{ geboortedatum }}</p>
            <p><strong>Land:</strong> {{ land|capitalize }}</p>
        </div>
        <a href="/">← Naar homepage</a>
    </body>
</html>
```

**Wat is hier nieuw?**
- Wachtwoord validatie in Python (checkt of beide velden hetzelfde zijn)
- Voorwaarden checkbox validatie
- Error handling met een aparte error pagina
- Success pagina met gebruikersgegevens
- `minlength="6"` in HTML voor minimale wachtwoordlengte

</details>

### Opdracht 6: Make - Enquête formulier

Maak een enquête formulier over een onderwerp naar keuze (bijvoorbeeld over school, hobby's, of favoriete games). Het formulier moet bevatten:
- Minimaal 2 tekstvelden
- Minimaal 1 nummer veld
- Minimaal 1 select dropdown
- Minimaal 3 radio buttons (voor één keuze uit meerdere opties)
- Minimaal 2 checkboxes (voor meerdere keuzes)

Toon alle antwoorden op een resultaat pagina.

<details>
<summary>Klik hier voor een voorbeeldoplossing</summary>

**templates/enquete.html:**
```html
<!DOCTYPE html>
<html>
    <head>
        <title>Gaming Enquête</title>
    </head>
    <body>
        <h1>🎮 Gaming Enquête</h1>
        <p>Help ons meer te weten te komen over jouw gaming voorkeuren!</p>

        <form method="post" action="/enquete">
            <div>
                <label for="naam">Wat is je naam?</label>
                <input type="text" id="naam" name="naam" required>
            </div>

            <div>
                <label for="favoriete_game">Wat is je favoriete game?</label>
                <input type="text" id="favoriete_game" name="favoriete_game" required>
            </div>

            <div>
                <label for="uren_per_week">Hoeveel uur game je per week?</label>
                <input type="number" id="uren_per_week" name="uren_per_week" min="0" max="168" required>
            </div>

            <div>
                <label for="platform">Op welk platform game je het meest?</label>
                <select id="platform" name="platform" required>
                    <option value="">Kies een platform...</option>
                    <option value="pc">PC</option>
                    <option value="playstation">PlayStation</option>
                    <option value="xbox">Xbox</option>
                    <option value="nintendo">Nintendo Switch</option>
                    <option value="mobiel">Mobiel</option>
                </select>
            </div>

            <div>
                <label>Hoe ervaren ben je met gaming?</label>
                <div>
                    <label>
                        <input type="radio" name="ervaring" value="beginner" required>
                        Beginner
                    </label>
                    <label>
                        <input type="radio" name="ervaring" value="gemiddeld">
                        Gemiddeld
                    </label>
                    <label>
                        <input type="radio" name="ervaring" value="gevorderd">
                        Gevorderd
                    </label>
                    <label>
                        <input type="radio" name="ervaring" value="pro">
                        Pro
                    </label>
                </div>
            </div>

            <div>
                <label>Welke game genres vind je leuk? (meerdere mogelijk)</label>
                <div>
                    <label>
                        <input type="checkbox" name="genres" value="actie">
                        Actie
                    </label>
                    <label>
                        <input type="checkbox" name="genres" value="avontuur">
                        Avontuur
                    </label>
                    <label>
                        <input type="checkbox" name="genres" value="rpg">
                        RPG
                    </label>
                    <label>
                        <input type="checkbox" name="genres" value="strategie">
                        Strategie
                    </label>
                    <label>
                        <input type="checkbox" name="genres" value="sport">
                        Sport
                    </label>
                    <label>
                        <input type="checkbox" name="genres" value="simulatie">
                        Simulatie
                    </label>
                </div>
            </div>

            <button type="submit">Verstuur Enquête</button>
        </form>
    </body>
</html>
```

**main.py:**
```python
from typing import List

@app.get("/enquete", response_class=HTMLResponse)
async def enquete_form(request: Request):
    return templates.TemplateResponse(
        "enquete.html",
        {"request": request}
    )

@app.post("/enquete")
async def enquete_submit(
    request: Request,
    naam: str = Form(...),
    favoriete_game: str = Form(...),
    uren_per_week: int = Form(...),
    platform: str = Form(...),
    ervaring: str = Form(...),
    genres: List[str] = Form([])
):
    return templates.TemplateResponse(
        "enquete_resultaat.html",
        {
            "request": request,
            "naam": naam,
            "favoriete_game": favoriete_game,
            "uren_per_week": uren_per_week,
            "platform": platform,
            "ervaring": ervaring,
            "genres": genres
        }
    )
```

**templates/enquete_resultaat.html:**
```html
<!DOCTYPE html>
<html>
    <head>
        <title>Enquête Resultaat</title>
    </head>
    <body>
        <h1>✅ Bedankt voor je deelname!</h1>

        <p><strong>Naam:</strong> {{ naam }}</p>
        <p><strong>Favoriete Game:</strong> 🎮 {{ favoriete_game }}</p>
        <p><strong>Uur per week:</strong> {{ uren_per_week }}</p>
        <p><strong>Platform:</strong> {{ platform|upper }}</p>

        <p>
            <strong>Ervaring niveau:</strong>
            {% if ervaring == "beginner" %}
                🌱 Beginner
            {% elif ervaring == "gemiddeld" %}
                ⭐ Gemiddeld
            {% elif ervaring == "gevorderd" %}
                🔥 Gevorderd
            {% else %}
                🏆 Pro
            {% endif %}
        </p>

        <p><strong>Favoriete genres:</strong></p>
        {% if genres %}
            <ul>
                {% for genre in genres %}
                    <li>{{ genre|capitalize }}</li>
                {% endfor %}
            </ul>
        {% else %}
            <p>Geen genres geselecteerd</p>
        {% endif %}

        <a href="/enquete">← Nieuwe enquête invullen</a>
    </body>
</html>
```

**Wat is hier nieuw?**
- `List[str] = Form([])` - Voor het ontvangen van meerdere checkbox waarden
- Emojis voor visuele feedback
- Conditionele emoji's gebaseerd op ervaring niveau
- Loop door geselecteerde genres

</details>

## Troubleshooting

### Form data komt niet aan

Controleer:
1. Is `name="..."` correct in de HTML?
2. Is `method="post"` ingesteld?
3. Heb je `Form(...)` gebruikt in de Python functie?
4. Match de `name` in HTML met de parameter naam in Python?

### 422 Error

Dit betekent meestal dat:
- Een verplicht veld niet is ingevuld
- De data types niet kloppen (bijv. text in een number veld)

### Checkbox altijd None

Checkboxes sturen alleen data als ze aangevinkt zijn. Gebruik daarom:
```python
checkbox_waarde: str = Form(None)  # None als niet aangevinkt
```

## Samenvatting

Je hebt nu geleerd om:
- ✅ HTML formulieren te maken met verschillende input types
- ✅ Form data te ontvangen in FastAPI met `Form(...)`
- ✅ Verplichte en optionele velden te maken
- ✅ Form data te valideren in Python
- ✅ Gebruikers door te sturen na een formulier submit
- ✅ Checkboxes en radio buttons te gebruiken
- ✅ Meerdere waarden te ontvangen van checkboxes

In de volgende les gaan we kijken naar het opslaan van form data in een database!
