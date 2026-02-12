---
sidebar_position: 9
---

# POST met templates

In de vorige les gaf je POST endpoint JSON terug. In deze les leer je hoe je een mooie HTML pagina toont met **Jinja2 templates**.

## Templates configureren

Maak een `templates` folder en configureer Jinja2 in `main.py`:

```
je-project/
├── main.py
├── static/
└── templates/
    └── resultaat.html
```

```python
from fastapi import FastAPI, Form, Request
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates

app = FastAPI()
app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates")
```

## Voorbeeld

### Formulier (`static/pages/groet_form.html`):

```html
<!DOCTYPE html>
<html>
    <body>
        <h1>Hoe heet je?</h1>
        <form method="post" action="/groet">
            <input type="text" name="naam" required>
            <button type="submit">Verstuur</button>
        </form>
    </body>
</html>
```

### Template (`templates/groet_resultaat.html`):

```html
<!DOCTYPE html>
<html>
    <body>
        <h1>Hallo {{ naam }}!</h1>
        <a href="/groet">Terug</a>
    </body>
</html>
```

`{{ naam }}` wordt vervangen door de waarde uit Python.

### Endpoints (`main.py`):

```python
@app.get("/groet")
async def groet_form():
    return FileResponse("static/pages/groet_form.html")

@app.post("/groet")
async def groet_verwerk(request: Request, naam: str = Form(...)):
    return templates.TemplateResponse(
        "groet_resultaat.html",
        {"request": request, "naam": naam}
    )
```

### Wat is nieuw?

- `TemplateResponse` — Rendert een HTML template met variabelen
- `{"request": request, "naam": naam}` — Stuurt data naar de template
- `"request": request` — Moet altijd mee!
- `{{ naam }}` — Wordt in de template vervangen door de waarde

## Opdrachten

### Opdracht 1: Predict - Wat zie je?

Template:
```html
<h1>Welkom {{ naam }}!</h1>
<p>Leeftijd: {{ leeftijd }}</p>
```

Python:
```python
return templates.TemplateResponse("welkom.html", {
    "request": request, "naam": "Jan", "leeftijd": 16
})
```

**Vraag:** Wat zie je op de pagina?

<details>
<summary>Antwoord</summary>

```
Welkom Jan!
Leeftijd: 16
```

</details>

### Opdracht 2: Make - Favoriete eten

Maak een formulier voor je favoriete eten. Na versturen toont een template: "Jouw favoriete eten is: [eten]"

### Opdracht 3: Make - Profiel pagina

Maak een formulier met naam, leeftijd en hobby. Na versturen toont een template alle drie de waarden.
