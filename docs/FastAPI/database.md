---
sidebar_position: 10
---

# Gegevens opslaan

Tot nu toe verdwijnt alle data als je programma stopt. Met `sqlitedict` kun je data **permanent** opslaan.

## Installatie

```bash
pip install sqlitedict
```

## Data opslaan

Maak `test_db.py`:

```python
from sqlitedict import SqliteDict

with SqliteDict("mijn_data.db") as db:
    db["naam"] = "Jan"
    db["leeftijd"] = 16
    db.commit()

print("Data opgeslagen!")
```

Run: `python test_db.py` — Er wordt een bestand `mijn_data.db` aangemaakt.

## Data uitlezen

```python
from sqlitedict import SqliteDict

with SqliteDict("mijn_data.db") as db:
    print(db["naam"])      # Jan
    print(db["leeftijd"])  # 16
```

De data is er nog, zelfs na herstarten!

## Overzicht commando's

```python
with SqliteDict("data.db") as db:
    db["key"] = "waarde"      # Opslaan
    waarde = db["key"]        # Uitlezen
    del db["key"]             # Verwijderen
    db.commit()               # Wijzigingen opslaan (NIET vergeten!)

    for k, v in db.items():   # Alles bekijken
        print(k, v)

    if "key" in db:           # Checken of iets bestaat
        print("Bestaat!")
```

## Opdrachten

### Opdracht 1: Predict - Wat gebeurt er?

```python
with SqliteDict("test.db") as db:
    db["score"] = 100
    db.commit()

with SqliteDict("test.db") as db:
    print(db["score"])
```

**Vraag:** Wat print dit?

<details>
<summary>Antwoord</summary>

`100` — De data blijft bewaard in het bestand.

</details>

### Opdracht 2: Run - Eerste database

Maak een programma dat een contact opslaat (naam + telefoonnummer) en het weer uitleest.

### Opdracht 3: Investigate - Commit vergeten

Wat gebeurt er als je `db.commit()` vergeet? Probeer het uit!

<details>
<summary>Antwoord</summary>

De data wordt **niet** opgeslagen. Na herstarten is het weg.

</details>
