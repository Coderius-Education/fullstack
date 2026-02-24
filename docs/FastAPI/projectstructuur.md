---
sidebar_position: 13
---

# Projectstructuur

Tijdens de lessen groeit je project stap voor stap. Hier zie je hoe de mappenstructuur evolueert.

## Les 2: Je eerste endpoint

```
je-project/
└── main.py
```

Alleen een Python bestand — meer heb je niet nodig.

## Les 4: Static files

```
je-project/
├── main.py
└── static/
    └── css/
        └── style.css
```

CSS in een apart bestand, bereikbaar via `/static/css/style.css`.

## Les 5: HTML in bestanden

```
je-project/
├── main.py
└── static/
    ├── css/
    │   └── style.css
    └── pages/
        └── home.html
```

HTML staat nu ook in aparte bestanden.

## Les 7: Afbeeldingen

```
je-project/
├── main.py
└── static/
    ├── css/
    │   └── style.css
    ├── pages/
    │   ├── home.html
    │   └── foto.html
    └── kat.jpg
```

Afbeeldingen staan direct in de `static` folder.

## Les 10: Templates (Jinja2)

```
je-project/
├── main.py
├── static/
│   ├── css/
│   │   └── style.css
│   └── pages/
│       ├── home.html
│       └── groet_form.html
└── templates/
    └── groet_resultaat.html
```

Er komt een `templates/` folder bij voor Jinja2 templates.

:::tip Verschil: static/pages vs templates
- **static/pages/** — Vaste HTML bestanden die altijd hetzelfde zijn
- **templates/** — HTML bestanden met `{{ variabelen }}` die door Python worden ingevuld
:::

## Les 11-12: Database

```
je-project/
├── main.py
├── mijn_data.db
├── static/
│   ├── css/
│   │   └── style.css
│   └── pages/
│       ├── home.html
│       ├── groet_form.html
│       └── naam_opslaan.html
└── templates/
    └── groet_resultaat.html
```

Het `.db` bestand wordt automatisch aangemaakt door `sqlitedict`.

## Compleet overzicht

| Map | Wat staat er? | Voorbeeld |
|-----|---------------|-----------|
| `/` | Python code en database | `main.py`, `mijn_data.db` |
| `static/css/` | CSS bestanden | `style.css` |
| `static/pages/` | Vaste HTML pagina's | `home.html`, `form.html` |
| `static/` | Afbeeldingen | `foto.jpg`, `logo.png` |
| `templates/` | Jinja2 templates | `resultaat.html` |
