---
sidebar_position: 3
---

# Hello World

In deze les voeg je voor het eerst JavaScript toe aan een HTML pagina.

## JavaScript toevoegen

JavaScript schrijf je in een `<script>` tag, net vóór de sluiting van `</body>`:

```html
<!DOCTYPE html>
<html>
    <head>
        <title>Mijn eerste JS</title>
    </head>
    <body>
        <h1>Hallo!</h1>

        <script>
            alert("Welkom op mijn website!");
        </script>
    </body>
</html>
```

### Wat doet deze code?

- `<script>` — Hier begint je JavaScript code
- `alert("...")` — Toont een pop-up met een bericht
- De code staat **onderaan** de `<body>`, zodat de pagina eerst laadt

## Testen

Open je `index.html` in de browser. Je ziet een pop-up met "Welkom op mijn website!".

## Variabelen

Met variabelen sla je waarden op:

```html
<script>
    let naam = "Jan";
    let leeftijd = 16;
    alert("Hallo " + naam + "! Je bent " + leeftijd + " jaar.");
</script>
```

### Wat is nieuw?

- `let` — Maakt een nieuwe variabele aan
- `"tekst"` — Een string (tekst)
- `16` — Een getal (number)
- `+` — Plakt strings aan elkaar (concatenatie)

## const vs let

```javascript
let score = 0;       // Kan later veranderen
score = 10;          // Prima!

const naam = "Jan";  // Kan NIET veranderen
naam = "Piet";       // Error!
```

**Vuistregel:** Gebruik `const` als de waarde niet verandert, `let` als dat wel kan.

:::danger Gaat er iets mis?
Zie je geen pop-up? Check of je `<script>` tag goed geopend en gesloten is. Vergeet je de aanhalingstekens rond tekst? Dan krijg je een fout. Open de console met **F12** om foutmeldingen te zien.
:::

## Opdrachten

### Opdracht 1: Predict - Wat zie je?

```html
<script>
    let dier = "kat";
    let aantal = 3;
    alert(dier + ": " + aantal);
</script>
```

**Vraag:** Wat staat er in de pop-up?

<details>
<summary>Tip</summary>

De `+` plakt alle stukjes tekst en variabelen aan elkaar tot één string.

</details>

<details>
<summary>Antwoord</summary>

`kat: 3`

De variabelen worden samengevoegd met de tekst `": "` ertussen.

</details>

### Opdracht 2: Run

Maak een `index.html` met een `<script>` tag die `alert("Hallo wereld!")` uitvoert. Open het bestand in je browser en controleer of de pop-up verschijnt.

### Opdracht 3: Investigate - Zonder aanhalingstekens

Wat gebeurt er als je de aanhalingstekens vergeet?

```html
<script>
    let naam = Jan;
    alert(naam);
</script>
```

Open de console (F12) en kijk welke foutmelding je krijgt.

<details>
<summary>Antwoord</summary>

Je krijgt een **ReferenceError: Jan is not defined**. Zonder aanhalingstekens denkt JavaScript dat `Jan` een variabele is, niet een stuk tekst. Tekst moet altijd tussen `"..."` of `'...'` staan.

</details>

### Opdracht 4: Make - Stel je voor

Maak een pagina met een `<script>` dat twee variabelen aanmaakt (je naam en je leeftijd) en een pop-up toont met: "Ik ben [naam] en ik ben [leeftijd] jaar oud."

<details>
<summary>Tip</summary>

Maak twee variabelen met `let` en gebruik `+` om ze samen te voegen in een `alert()`.

</details>

<details>
<summary>Antwoord</summary>

```html
<!DOCTYPE html>
<html>
    <body>
        <h1>Over mij</h1>
        <script>
            let naam = "Jan";
            let leeftijd = 16;
            alert("Ik ben " + naam + " en ik ben " + leeftijd + " jaar oud.");
        </script>
    </body>
</html>
```

</details>

### Opdracht 5: Make - Rekenmachine

Maak een pagina die twee getallen bij elkaar optelt en het resultaat toont in een pop-up: "3 + 5 = 8".

<details>
<summary>Tip</summary>

Maak variabelen voor de twee getallen en bereken het resultaat: `let resultaat = getal1 + getal2;`. Let op: bij getallen doet `+` een optelling, bij strings plakt het tekst aan elkaar.

</details>

<details>
<summary>Antwoord</summary>

```html
<script>
    let getal1 = 3;
    let getal2 = 5;
    let resultaat = getal1 + getal2;
    alert(getal1 + " + " + getal2 + " = " + resultaat);
</script>
```

</details>
