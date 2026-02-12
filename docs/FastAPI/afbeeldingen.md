---
sidebar_position: 6
---

# Afbeeldingen tonen

In deze les leer je hoe je een afbeelding toont op je HTML pagina.

## Afbeelding klaarzetten

Plaats een afbeelding in je `static` folder:

```
je-project/
├── main.py
└── static/
    ├── css/
    │   └── style.css
    ├── pages/
    │   └── foto.html
    └── kat.jpg          ← jouw afbeelding
```

## De img tag

In je HTML gebruik je de `<img>` tag:

```html
<img src="/static/kat.jpg" alt="Een kat">
```

- `src` - Het pad naar de afbeelding (via de static folder)
- `alt` - Tekst die wordt getoond als de afbeelding niet laadt

## Compleet voorbeeld

Maak `static/pages/foto.html`:

```html
<!DOCTYPE html>
<html>
    <head>
        <title>Mijn Foto</title>
    </head>
    <body>
        <h1>Kijk naar deze foto!</h1>
        <img src="/static/kat.jpg" alt="Een kat">
    </body>
</html>
```

En in `main.py`:

```python
@app.get("/foto")
async def foto():
    return FileResponse("static/pages/foto.html")
```

## Testen

Ga naar [http://127.0.0.1:8000/foto](http://127.0.0.1:8000/foto). Je ziet je afbeelding!

**Werkt het niet?** Controleer of:
1. De afbeelding écht in de `static` folder staat
2. De bestandsnaam exact klopt (let op hoofdletters!)
3. `app.mount("/static", ...)` in je code staat

## Opdrachten

### Opdracht 1: Predict - Wat zie je?

```html
<img src="/static/logo.png" alt="Logo">
```

**Vraag:** Wat zie je als `logo.png` niet bestaat in de static folder?

<details>
<summary>Klik hier voor het antwoord</summary>

Je ziet de alt tekst "Logo" en een broken image icoon. De pagina laadt wel, maar de afbeelding niet.

</details>

### Opdracht 2: Make - Eigen foto

Plaats een afbeelding in je `static` folder en maak een pagina die hem toont.

### Opdracht 3: Make - Fotogalerij

Maak een pagina met drie afbeeldingen onder elkaar. Geef elke afbeelding een titel met een `<h3>` tag erboven.
