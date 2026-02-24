---
sidebar_position: 6
---

# Console en fouten

In deze les leer je de browser console gebruiken om fouten op te sporen en je code te debuggen.

## De console openen

Druk op **F12** (of rechtermuisknop → "Inspecteren") en klik op het tabblad **Console**. Hier zie je foutmeldingen en output van je code.

## console.log()

Met `console.log()` print je berichten naar de console (niet naar de pagina):

```html
<!DOCTYPE html>
<html>
    <body>
        <h1 id="titel">Hallo</h1>

        <script>
            let naam = "Jan";
            console.log("De naam is: " + naam);

            document.getElementById("titel").innerHTML = "Welkom " + naam;
            console.log("Titel is veranderd");
        </script>
    </body>
</html>
```

### Wat is nieuw?

- `console.log("...")` — Print tekst naar de console (F12), niet naar de pagina
- Handig om te controleren of je code doet wat je verwacht
- De gebruiker ziet dit niet — alleen jij als ontwikkelaar

## Veelvoorkomende fouten

### ReferenceError

```javascript
console.log(naam);  // naam bestaat niet!
```
**Oorzaak:** Je gebruikt een variabele die niet bestaat of die je verkeerd hebt gespeld.

### TypeError: Cannot set properties of null

```javascript
document.getElementById("bestaat_niet").innerHTML = "Hallo";
```
**Oorzaak:** Het element met dat id bestaat niet. `getElementById` geeft `null` terug.

### SyntaxError

```javascript
let naam = "Jan;  // aanhalingsteken vergeten!
```
**Oorzaak:** Je code klopt niet qua syntax (bijv. missend aanhalingsteken of haakje).

## JavaScript stopt niet altijd

Een belangrijk verschil met Python: JavaScript probeert door te gaan na een fout. Alleen het stuk code met de fout slaat hij over:

```html
<script>
    console.log("Stap 1");             // Werkt
    document.getElementById("x").innerHTML = "test";  // Error!
    console.log("Stap 3");             // Wordt NIET uitgevoerd
</script>
```

Na een error stopt het **huidige script-blok**, maar de rest van de pagina laadt gewoon door.

:::danger Gaat er iets mis?
Zie je niks in de console? Check of je het juiste tabblad hebt (Console, niet Elements). Vergeet niet op **F12** te drukken. Sommige browsers verbergen de DevTools standaard.
:::

## Opdrachten

### Opdracht 1: Predict - Wat zie je?

```html
<script>
    let x = 10;
    let y = 20;
    console.log("x = " + x);
    console.log("y = " + y);
    console.log("x + y = " + (x + y));
</script>
```

**Vraag:** Wat staat er in de console (F12)? En wat zie je op de pagina?

<details>
<summary>Tip</summary>

`console.log()` schrijft naar de console, niet naar de pagina. Verandert dit script iets aan de HTML?

</details>

<details>
<summary>Antwoord</summary>

In de console:
```
x = 10
y = 20
x + y = 30
```

Op de pagina: **niets**. `console.log()` toont alleen tekst in de console, niet op de webpagina.

</details>

### Opdracht 2: Run

Maak een HTML pagina met het voorbeeld van `console.log()`. Open de pagina, druk op F12, en controleer of je de berichten ziet in de console.

### Opdracht 3: Investigate - Fout opsporen

Deze code werkt niet. Open de console en vind de fout:

```html
<h1 id="titel">Hallo</h1>

<script>
    document.getElementById("tител").innerHTML = "Welkom!";
</script>
```

<details>
<summary>Tip</summary>

Vergelijk het id in de HTML met het id in het JavaScript. Kijk goed naar de spelling.

</details>

<details>
<summary>Antwoord</summary>

Het id in JavaScript is `"tител"` (met een Cyrillische и), maar in de HTML staat `"titel"` (met een gewone i). Dit geeft een **TypeError: Cannot set properties of null**. De namen moeten exact overeenkomen.

</details>

### Opdracht 4: Make - Debug helper

Maak een pagina die drie elementen verandert. Voeg vóór en na elke verandering een `console.log()` toe zodat je in de console kunt zien welke stappen zijn uitgevoerd.

<details>
<summary>Tip</summary>

Gebruik patronen als `console.log("Stap 1: titel veranderen...")` en `console.log("Stap 1: klaar!")` rond elke `getElementById(...).innerHTML = ...` regel.

</details>

<details>
<summary>Antwoord</summary>

```html
<!DOCTYPE html>
<html>
    <body>
        <h1 id="titel">Titel</h1>
        <p id="intro">Intro</p>
        <p id="tekst">Tekst</p>

        <script>
            console.log("Start: titel veranderen");
            document.getElementById("titel").innerHTML = "Nieuwe titel";
            console.log("Klaar: titel veranderd");

            console.log("Start: intro veranderen");
            document.getElementById("intro").innerHTML = "Nieuwe intro";
            console.log("Klaar: intro veranderd");

            console.log("Start: tekst veranderen");
            document.getElementById("tekst").innerHTML = "Nieuwe tekst";
            console.log("Klaar: tekst veranderd");
        </script>
    </body>
</html>
```

</details>

### Opdracht 5: Make - Fix de bugs

Deze code bevat drie fouten. Vind en fix ze met behulp van de console:

```html
<!DOCTYPE html>
<html>
    <body>
        <h1 id="kop">Welkom</h1>
        <p id="bericht">Hallo</p>

        <script>
            document.getElementById("Kop").innerHTML = "Nieuwe kop";
            document.getElementById("bericht").innerhtml = "Nieuw bericht";
            document.getElementById("bericht").style.color = blauw;
        </script>
    </body>
</html>
```

<details>
<summary>Tip</summary>

1. Check de id's — zijn ze hoofdlettergevoelig?
2. Check de property-namen — is alles correct gespeld?
3. Check de waarden — moeten strings tussen aanhalingstekens staan?

</details>

<details>
<summary>Antwoord</summary>

Drie fouten:
1. `"Kop"` moet `"kop"` zijn (kleine letter — id's zijn hoofdlettergevoelig)
2. `.innerhtml` moet `.innerHTML` zijn (met hoofdletter H)
3. `blauw` moet `"blauw"` zijn (met aanhalingstekens — het is een string)

Gefixte code:
```javascript
document.getElementById("kop").innerHTML = "Nieuwe kop";
document.getElementById("bericht").innerHTML = "Nieuw bericht";
document.getElementById("bericht").style.color = "blue";
```

</details>
