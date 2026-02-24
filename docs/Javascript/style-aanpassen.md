---
sidebar_position: 5
---

# Style aanpassen

In de vorige les veranderde je de inhoud van elementen. In deze les leer je hoe je de **stijl** (CSS) van elementen verandert met JavaScript.

## Style via JavaScript

Elk element heeft een `.style` eigenschap waarmee je CSS kunt aanpassen:

```html
<!DOCTYPE html>
<html>
    <body>
        <h1 id="titel">Hallo!</h1>
        <p id="tekst">Dit is een paragraaf.</p>

        <script>
            document.getElementById("titel").style.color = "blue";
            document.getElementById("tekst").style.fontSize = "24px";
        </script>
    </body>
</html>
```

### Wat is nieuw?

- `.style.color = "blue"` — Verandert de tekstkleur
- `.style.fontSize = "24px"` — Verandert de lettergrootte
- Elke CSS property is bereikbaar via `.style.`

## Puntnotatie

In JavaScript gebruik je **puntnotatie** om bij eigenschappen van een element te komen:

```
element.style.color
  │       │     └── de CSS property
  │       └── het style-object
  └── het HTML element
```

Vergelijk het met een adres: `Nederland.Utrecht.Hoofdstraat` — je gaat steeds een niveau dieper.

## CSS-namen vs JavaScript-namen

Let op: CSS properties met een streepje schrijf je in JavaScript met **camelCase**:

| CSS | JavaScript |
|-----|-----------|
| `color` | `style.color` |
| `font-size` | `style.fontSize` |
| `background-color` | `style.backgroundColor` |
| `border-radius` | `style.borderRadius` |

**Regel:** verwijder het streepje en maak de volgende letter een hoofdletter.

## Testen

Maak de HTML uit het voorbeeld en open het in je browser. De heading wordt blauw en de tekst wordt groter.

:::danger Gaat er iets mis?
Stijl verandert niet? Check of je camelCase gebruikt (`fontSize`, niet `font-size`). Een streepje in een JavaScript property-naam geeft een error. Open de console (F12) om foutmeldingen te zien.
:::

## Opdrachten

### Opdracht 1: Predict - Welke kleur?

```html
<h1 id="kop" style="color: red;">Hallo</h1>

<script>
    document.getElementById("kop").style.color = "green";
</script>
```

**Vraag:** Welke kleur heeft de heading?

<details>
<summary>Tip</summary>

De heading begint met `color: red` in de HTML. Maar het script verandert iets... Welke waarde wint?

</details>

<details>
<summary>Antwoord</summary>

**Groen.** JavaScript overschrijft de originele CSS. De heading begint als rood, maar wordt direct groen gemaakt door het script.

</details>

### Opdracht 2: Run

Maak het voorbeeld uit de les na met een heading en paragraaf. Controleer dat de heading blauw wordt en de tekst groter.

### Opdracht 3: Investigate - Streepje-notatie

Wat gebeurt er als je `font-size` schrijft in plaats van `fontSize`?

```html
<script>
    document.getElementById("tekst").style.font-size = "24px";
</script>
```

<details>
<summary>Antwoord</summary>

Je krijgt een error. JavaScript interpreteert het streepje als een **min-teken**: het probeert `style.font` minus `size` te berekenen. Dat is geen geldige operatie. Gebruik altijd camelCase: `fontSize`.

</details>

### Opdracht 4: Make - Kleurrijke pagina

Maak een pagina met drie elementen (h1, p, en een tweede p). Geef elk element een andere kleur en lettergrootte via JavaScript.

<details>
<summary>Tip</summary>

Geef elk element een uniek `id`. Gebruik `.style.color` voor de kleur en `.style.fontSize` voor de grootte.

</details>

<details>
<summary>Antwoord</summary>

```html
<!DOCTYPE html>
<html>
    <body>
        <h1 id="kop">Titel</h1>
        <p id="intro">Introductie</p>
        <p id="tekst">Meer tekst</p>

        <script>
            document.getElementById("kop").style.color = "darkblue";
            document.getElementById("kop").style.fontSize = "48px";

            document.getElementById("intro").style.color = "green";
            document.getElementById("intro").style.fontSize = "20px";

            document.getElementById("tekst").style.color = "gray";
            document.getElementById("tekst").style.fontSize = "14px";
        </script>
    </body>
</html>
```

</details>

### Opdracht 5: Make - Onzichtbaar maken

Maak een pagina met een paragraaf die via JavaScript onzichtbaar wordt gemaakt. Gebruik hiervoor `style.display = "none"`.

<details>
<summary>Tip</summary>

`display: none` in CSS verbergt een element volledig. In JavaScript schrijf je dit als `element.style.display = "none"`.

</details>

<details>
<summary>Antwoord</summary>

```html
<!DOCTYPE html>
<html>
    <body>
        <p id="geheim">Dit is een geheim bericht.</p>
        <p>Deze tekst blijft zichtbaar.</p>

        <script>
            document.getElementById("geheim").style.display = "none";
        </script>
    </body>
</html>
```

Het geheime bericht verdwijnt volledig van de pagina.

</details>
