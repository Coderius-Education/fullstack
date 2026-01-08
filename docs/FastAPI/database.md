---
sidebar_position: 8
---

# Gegevens opslaan

In de vorige les heb je geleerd hoe je formulieren maakt en data ontvangt. Maar die data verdwijnt zodra je de server herstart. In deze les leer je hoe je gebruikersdata **permanent** opslaat met `sqlitedict`.

## Wat is sqlitedict?

`sqlitedict` is een simpele Python library waarmee je data kunt opslaan in een database. Het werkt net als een Python dictionary, maar de data blijft bewaard, zelfs als je de server herstart!

## Installatie

Installeer sqlitedict:

```bash
pip install sqlitedict
```

## Gebruikers registratie met database opslag

### Stap 1: Importeer sqlitedict

Voeg bovenaan je `main.py` toe:

```python
from sqlitedict import SqliteDict
```

### Stap 2: Maak het registratie formulier

Maak `templates/registreer.html`:

```html
<!DOCTYPE html>
<html>
    <head>
        <title>Registreren</title>
    </head>
    <body>
        <h1>Maak een account</h1>
        <form method="post" action="/registreer">
            <div>
                <label for="gebruikersnaam">Gebruikersnaam:</label>
                <input type="text" id="gebruikersnaam" name="gebruikersnaam" required>
            </div>

            <div>
                <label for="email">Email:</label>
                <input type="email" id="email" name="email" required>
            </div>

            <div>
                <label for="wachtwoord">Wachtwoord:</label>
                <input type="password" id="wachtwoord" name="wachtwoord" required minlength="6">
            </div>

            <button type="submit">Registreer</button>
        </form>
    </body>
</html>
```

### Stap 3: Maak de endpoints

Voeg toe aan `main.py`:

```python
@app.get("/registreer", response_class=HTMLResponse)
async def registreer_form(request: Request):
    return templates.TemplateResponse(
        "registreer.html",
        {"request": request}
    )

@app.post("/registreer")
async def registreer_submit(
    request: Request,
    gebruikersnaam: str = Form(...),
    email: str = Form(...),
    wachtwoord: str = Form(...)
):
    # Open de database
    with SqliteDict("gebruikers.db") as db:
        # Sla de gebruiker op
        db[gebruikersnaam] = {
            "email": email,
            "wachtwoord": wachtwoord
        }
        db.commit()  # Belangrijk! Sla de wijzigingen op

    # Toon success pagina
    return templates.TemplateResponse(
        "registreer_success.html",
        {
            "request": request,
            "gebruikersnaam": gebruikersnaam
        }
    )
```

### Stap 4: Success pagina

Maak `templates/registreer_success.html`:

```html
<!DOCTYPE html>
<html>
    <head>
        <title>Welkom</title>
    </head>
    <body>
        <h1>Account aangemaakt!</h1>
        <p>Welkom {{ gebruikersnaam }}! Je account is succesvol opgeslagen in de database.</p>
        <a href="/registreer">Nog een account maken</a>
    </body>
</html>
```

## Hoe werkt dit?

1. **SqliteDict("gebruikers.db")** - Maakt of opent een database bestand `gebruikers.db`
2. **db[gebruikersnaam] = {  }** - Slaat gebruikersdata op, net als een dictionary
3. **db.commit()** - Slaat de wijzigingen permanent op (NIET vergeten!)
4. **with ... as db** - Zorgt dat de database netjes wordt afgesloten

## Alle gebruikers bekijken

Voeg een pagina toe om alle geregistreerde gebruikers te bekijken:

```python
@app.get("/gebruikers", response_class=HTMLResponse)
async def gebruikers_lijst(request: Request):
    # Haal alle gebruikers op
    with SqliteDict("gebruikers.db") as db:
        gebruikers = [{"naam": key, **value} for key, value in db.items()]

    return templates.TemplateResponse(
        "gebruikers.html",
        {
            "request": request,
            "gebruikers": gebruikers
        }
    )
```

Maak `templates/gebruikers.html`:

```html
<!DOCTYPE html>
<html>
    <head>
        <title>Alle Gebruikers</title>
    </head>
    <body>
        <h1>Geregistreerde Gebruikers</h1>

        {% if gebruikers %}
            <ul>
                {% for gebruiker in gebruikers %}
                    <li>
                        <strong>{{ gebruiker.naam }}</strong> - {{ gebruiker.email }}
                    </li>
                {% endfor %}
            </ul>
        {% else %}
            <p>Nog geen gebruikers geregistreerd.</p>
        {% endif %}

        <a href="/registreer">Nieuwe gebruiker toevoegen</a>
    </body>
</html>
```

## Belangrijk

- Gebruik `db.commit()` om wijzigingen op te slaan
- De database wordt opgeslagen als `gebruikers.db` in je project folder
- Wachtwoorden worden nu als **platte tekst** opgeslagen (niet veilig voor echte websites!)
- In een productie omgeving moet je wachtwoorden altijd **hashen**

## Samenvatting

Je hebt geleerd:
- Hoe je sqlitedict installeert en gebruikt
- Hoe je gebruikersdata opslaat in een database
- Hoe je data uit de database haalt en toont
- Dat de data blijft bestaan na een server herstart

Nu kun je formulierdata permanent opslaan!
