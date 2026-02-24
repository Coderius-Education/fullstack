---
sidebar_position: 4
---

# Elementen selecteren

In de vorige les gebruikte je `alert()` om tekst te tonen. In deze les leer je hoe je elementen op je pagina kunt veranderen met JavaScript.

## getElementById

Met `document.getElementById()` selecteer je een HTML element via zijn `id`:

```html
<!DOCTYPE html>
<html>
    <body>
        <h1 id="titel">Oude titel</h1>
        <p id="tekst">Oude tekst</p>

        <script>
            document.getElementById("titel").innerHTML = "Nieuwe titel!";
            document.getElementById("tekst").innerHTML = "Deze tekst is veranderd.";
        </script>
    </body>
</html>
```

### Wat doet deze code?

- `id="titel"` — Geeft het HTML element een unieke naam
- `document.getElementById("titel")` — Zoekt het element met dat id
- `.innerHTML = "..."` — Verandert de inhoud van het element

## Waarom onderaan?

Het `<script>` blok staat onderaan de `<body>`. Dit is belangrijk! JavaScript leest de pagina van boven naar beneden. Als je script bovenaan staat, bestaan de elementen nog niet:

```html
<!-- FOUT: script staat vóór de elementen -->
<script>
    document.getElementById("titel").innerHTML = "Hallo";
</script>
<h1 id="titel">Titel</h1>
```

Dit geeft een error omdat `titel` nog niet bestaat wanneer het script draait.

## Testen

Maak de HTML uit het voorbeeld en open het in je browser. De heading en paragraaf veranderen automatisch naar de nieuwe tekst.

:::danger Gaat er iets mis?
Verandert er niets? Check of:
1. Je `<script>` tag **onderaan** de body staat (ná de elementen)
2. Het `id` in HTML exact overeenkomt met het id in JavaScript (hoofdlettergevoelig!)
3. Je de console opent (F12) om foutmeldingen te zien
:::

## Opdrachten

### Opdracht 1: Predict - Wat zie je?

```html
<p id="bericht">Wachten...</p>

<script>
    document.getElementById("bericht").innerHTML = "Klaar!";
</script>
```

**Vraag:** Welke tekst zie je op de pagina?

<details>
<summary>Tip</summary>

De paragraaf begint met "Wachten...", maar het script verandert de inhoud. Welke tekst wordt uiteindelijk getoond?

</details>

<details>
<summary>Antwoord</summary>

Je ziet "Klaar!". Het script vervangt de originele tekst "Wachten..." door "Klaar!". Dit gaat zo snel dat je het niet ziet veranderen.

</details>

### Opdracht 2: Run

Maak de HTML uit het eerste voorbeeld met een `<h1>` en `<p>` die allebei veranderd worden door JavaScript. Controleer of het werkt.

### Opdracht 3: Investigate - Verkeerd id

Wat gebeurt er als je een id gebruikt dat niet bestaat? Probeer dit:

```html
<h1 id="titel">Hallo</h1>

<script>
    document.getElementById("verkeerd").innerHTML = "Test";
</script>
```

Open de console (F12) en kijk wat er gebeurt.

<details>
<summary>Antwoord</summary>

Je krijgt een **TypeError: Cannot set properties of null**. `getElementById("verkeerd")` geeft `null` terug omdat er geen element met dat id bestaat. Je kunt geen `.innerHTML` instellen op `null`.

</details>

### Opdracht 4: Make - Drie elementen

Maak een pagina met drie paragrafen (elk met een eigen `id`). Verander met JavaScript de tekst van alle drie.

<details>
<summary>Tip</summary>

Geef elke `<p>` een uniek id (bijv. `id="p1"`, `id="p2"`, `id="p3"`) en gebruik drie keer `document.getElementById(...).innerHTML = ...`.

</details>

<details>
<summary>Antwoord</summary>

```html
<!DOCTYPE html>
<html>
    <body>
        <p id="p1">Tekst 1</p>
        <p id="p2">Tekst 2</p>
        <p id="p3">Tekst 3</p>

        <script>
            document.getElementById("p1").innerHTML = "Eerste veranderd!";
            document.getElementById("p2").innerHTML = "Tweede veranderd!";
            document.getElementById("p3").innerHTML = "Derde veranderd!";
        </script>
    </body>
</html>
```

</details>

### Opdracht 5: Make - Variabelen gebruiken

Maak een pagina met een `<h1>` en een `<p>`. Sla je naam op in een variabele en gebruik die om de heading te veranderen naar "Welkom, [naam]!" en de paragraaf naar "[naam] is ingelogd.".

<details>
<summary>Tip</summary>

Maak een variabele `let naam = "Jan"` en gebruik string-concatenatie (`+`) om de tekst samen te stellen.

</details>

<details>
<summary>Antwoord</summary>

```html
<!DOCTYPE html>
<html>
    <body>
        <h1 id="welkom">Welkom</h1>
        <p id="status">Status</p>

        <script>
            let naam = "Jan";
            document.getElementById("welkom").innerHTML = "Welkom, " + naam + "!";
            document.getElementById("status").innerHTML = naam + " is ingelogd.";
        </script>
    </body>
</html>
```

</details>
