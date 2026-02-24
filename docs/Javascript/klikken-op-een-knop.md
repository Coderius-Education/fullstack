---
sidebar_position: 7
---

# Klikken op een knop

Tot nu toe draait je JavaScript automatisch als de pagina laadt. In deze les leer je hoe je code uitvoert **als een gebruiker op een knop klikt**.

## Een knop maken

```html
<!DOCTYPE html>
<html>
    <body>
        <h1 id="titel">Wachten...</h1>
        <button id="mijn_knop">Klik mij!</button>

        <script>
            function verander() {
                document.getElementById("titel").innerHTML = "Je hebt geklikt!";
            }

            document.getElementById("mijn_knop").addEventListener("click", verander);
        </script>
    </body>
</html>
```

### Wat doet deze code?

- `<button id="mijn_knop">` — Een klikbare knop in HTML
- `function verander() { ... }` — Een **functie**: een blok code met een naam
- `addEventListener("click", verander)` — Koppelt de functie aan de knop: als er geklikt wordt, voer `verander` uit

## Functies

Een functie is een stuk code dat je een naam geeft en later kunt aanroepen:

```javascript
function begroet() {
    alert("Hallo!");
}

// Later aanroepen:
begroet();
```

- `function naam() { }` — Definieert de functie
- `naam()` — Voert de functie uit (met haakjes!)

## Belangrijk: zonder haakjes bij addEventListener

```javascript
// GOED: geef de functienaam mee
knop.addEventListener("click", verander);

// FOUT: dit voert de functie METEEN uit
knop.addEventListener("click", verander());
```

Met haakjes `verander()` wordt de functie **direct** uitgevoerd bij het laden van de pagina, niet bij de klik. Zonder haakjes `verander` geef je de functie mee als "recept" dat pas later wordt uitgevoerd.

## Testen

Maak de HTML uit het voorbeeld en open het in de browser. Klik op de knop — de heading verandert naar "Je hebt geklikt!".

:::danger Gaat er iets mis?
Knop doet niks? Check of:
1. De functienaam bij `addEventListener` **zonder haakjes** staat
2. Het `id` van de knop overeenkomt
3. Je script **onderaan** de body staat

Open de console (F12) voor foutmeldingen.
:::

## Opdrachten

### Opdracht 1: Predict - Wat doet de knop?

```html
<p id="teller">0</p>
<button id="plus">+1</button>

<script>
    let aantal = 0;

    function verhoog() {
        aantal = aantal + 1;
        document.getElementById("teller").innerHTML = aantal;
    }

    document.getElementById("plus").addEventListener("click", verhoog);
</script>
```

**Vraag:** Wat gebeurt er als je drie keer op de knop klikt?

<details>
<summary>Tip</summary>

De variabele `aantal` begint op 0. Elke klik voert `verhoog()` uit. Wat doet die functie met `aantal`?

</details>

<details>
<summary>Antwoord</summary>

De paragraaf toont **3**. Elke klik verhoogt `aantal` met 1 (0 → 1 → 2 → 3) en update de tekst op de pagina.

</details>

### Opdracht 2: Run

Maak de teller uit het voorbeeld. Test of hij werkt door meerdere keren te klikken.

### Opdracht 3: Investigate - Met haakjes

Wat gebeurt er als je `verhoog` verandert naar `verhoog()` bij addEventListener?

```javascript
document.getElementById("plus").addEventListener("click", verhoog());
```

<details>
<summary>Antwoord</summary>

De functie wordt **meteen** uitgevoerd als de pagina laadt (de teller springt naar 1), maar de knop doet daarna **niets** meer. Met haakjes geef je niet de functie mee, maar het **resultaat** ervan (wat `undefined` is). Gebruik altijd de functienaam zonder haakjes.

</details>

### Opdracht 4: Make - Kleur knop

Maak een knop die de achtergrondkleur van de pagina verandert als je erop klikt.

<details>
<summary>Tip</summary>

De achtergrondkleur van de pagina pas je aan met `document.body.style.backgroundColor = "kleur"`. Maak een functie die dit doet en koppel die aan een knop met `addEventListener`.

</details>

<details>
<summary>Antwoord</summary>

```html
<!DOCTYPE html>
<html>
    <body>
        <button id="kleur_knop">Verander kleur!</button>

        <script>
            function veranderKleur() {
                document.body.style.backgroundColor = "lightblue";
            }

            document.getElementById("kleur_knop").addEventListener("click", veranderKleur);
        </script>
    </body>
</html>
```

</details>

### Opdracht 5: Make - Twee knoppen

Maak een pagina met een tekst en twee knoppen: "Toon" en "Verberg". De ene knop maakt de tekst zichtbaar, de andere verbergt hem.

<details>
<summary>Tip</summary>

Gebruik `style.display = "none"` om te verbergen en `style.display = "block"` om weer te tonen. Maak twee functies en koppel elk aan een eigen knop.

</details>

<details>
<summary>Antwoord</summary>

```html
<!DOCTYPE html>
<html>
    <body>
        <p id="geheim">Dit is een geheim bericht!</p>
        <button id="verberg_knop">Verberg</button>
        <button id="toon_knop">Toon</button>

        <script>
            function verberg() {
                document.getElementById("geheim").style.display = "none";
            }

            function toon() {
                document.getElementById("geheim").style.display = "block";
            }

            document.getElementById("verberg_knop").addEventListener("click", verberg);
            document.getElementById("toon_knop").addEventListener("click", toon);
        </script>
    </body>
</html>
```

</details>
