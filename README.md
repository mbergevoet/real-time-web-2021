# Minor web turn based fighter Game

## Inhoud

| Inhoudsopgave       |
| ------------------- |
| Project poster      |
| Eindopdracht ideeën |
| Plan van aanpak     |
| Installatie         | 
| License             |

# :flower_playing_cards: Project poster

> TODO

# :computer: Live demo

[Link naar de gedeployde Heroku app]()

# :bulb: Eindopdracht ideeën

## :incoming_envelope: Steam chat app

Ik gebruik de steam API om de library van users op te halen en aan de hand van je gekochte games kan je een chat room aan maken met één of meerdere personen

## :video_game: Turn based fighter game

Ik gebruik een API (ik weer nog niet welke) om data op te halen van charcters die je kan kiezen om mee te vechten tegen andere spelers. Je vecht net als in pokémon of steen papier schaar met beurten. Je kunt kiezen uit verschillende aanvallen en wie als laatste over blijft wint. Je character kan je levelen als je meer vecht en worden daarmee je aanvallen en bescherming sterker.

# Plan van aanpak

Eerst moet ik natuurlijk één van de ideeën kiezen. Op dit moment neig ik toch meer naar het tweede idee. Maar voor beiden zijn de grote lijnen het zelfde. Het moet mogelijk zijn 
om in te loggen en om scores of chats bij te houden per gebruiker. Daarvoor ben ik van plan om MongoDB of Firebase te gebruiken. Ik zal dus ook nog in de documentatie moeten duiken
om te zorgen dat ik dat kan koppelen aan mijn server. Dan moet ik een API zoeken voor de fight game of gebruik ik de Steam API om de libraries op te halen. Er zal een starpagina nodig zijn
waar de gebruiker op land als er is ingelogd. Daarna moet er functionaliteit komen die gebruikers aan elkaar link, dan wel voor een 'gevecht' of een chatroom. Voor de fight game
moet er een damage en aanval systeem komen die damage waarden en aanvallen realtime bij houd en waarbij optioneel nog animaties bij komen. En ik moet de levels van chat rooms of characters
bij gaan houden. Alles wat ik daarna nog kan toevoegen zijn mooi meegenomen maar ik ga me hier eerst maar op focussen.

# Features lijst

- Gebruikers koppelen
- Een gevecht met afbeeldingen en buttons
- Aanval systeem
- Character level bijhouden

# Dataflow diagram

![diagram](https://i.imgur.com/ptyzbBk.png)

# MoSCoW

## Must haves

- Moves ophalen uit de PokéApi
- Er kunnen twee spelers vechten
- Er gaat hp af van de tegenstander als je een aanval doet
- Een aanval kan missen of raken
- Een speler kan winnen of verliezen

## Should haves

- Een speler kan verschillende vechters kiezen
- Een matching systeem
- Level van character word opgeslagen in de database
- Aanval animaties

## Could haves

- Login systeem

## Will haves but won't this time around

- Coole afbeeldingen voor vechters
- Een gevecht kunnen joinen met een roomcode

# Schetsen

Ruwe schetsen van de interface

![Login](https://i.imgur.com/86DvKqA.jpg)
![Choose fighter](https://i.imgur.com/hNmhcxP.jpg)
![Choose fighter](https://i.imgur.com/IATE3I4.jpg)
![Pick battle](https://i.imgur.com/mUgZIVG.jpg)
![Battle code](https://i.imgur.com/V0iZ8tm.jpg)
![Fight](https://i.imgur.com/MhP1jpo.jpg)
![Fight](https://i.imgur.com/XToOl81.jpg)
![Win](https://i.imgur.com/2xQySzg.jpg)

# API 

Om de verschillende aanvallen per character te genereren wil ik de PokéApi gebruiken. 
Daar kun je de namen van de aanvallen uit halen, de hoeveelheid damage die een aanval doet, hoe hoog de kans is dat een aanval succesvol word uitgevoerd en hoeveel het kost om een
aanval uit te voeren. Het lijkt me cool om te implementeren dat een aanval kan falen. De pokémon haal ik er niet uit op. Ik wil mijn eigen fighters bedenken

voorbeeld van een endpoint met moves

`https://pokeapi.co/api/v2/move/1/`

Voorbeeld van een response van de endpoint moves

```js
{
    "accuracy": 100,
    "contest_combos": {
        "normal": {
            "use_after": null,
            "use_before": [
                {
                    "name": "double-slap",
                    "url": "https://pokeapi.co/api/v2/move/3/"
                },
                {
                    "name": "slam",
                    "url": "https://pokeapi.co/api/v2/move/21/"
                },
                {
                    "name": "feint-attack",
                    "url": "https://pokeapi.co/api/v2/move/185/"
                }
            ]
        },
        "super": {
            "use_after": null,
            "use_before": null
        }
    },
    "contest_effect": {
        "url": "https://pokeapi.co/api/v2/contest-effect/1/"
    },
    "contest_type": {
        "name": "tough",
        "url": "https://pokeapi.co/api/v2/contest-type/5/"
    },
    "damage_class": {
        "name": "physical",
        "url": "https://pokeapi.co/api/v2/move-damage-class/2/"
    },
    "effect_chance": null,
    "effect_changes": [],
    "effect_entries": [
        {
            "effect": "Inflicts regular damage.",
            "language": {
                "name": "en",
            "url": "https://pokeapi.co/api/v2/language/9/"
        },
            "short_effect": "Inflicts regular damage with no additional effect."
        }
    ],
    "flavor_text_entries": [
        {
            "flavor_text": "Pounds with fore­\nlegs or tail.",
            "language": {
                "name": "en",
                "url": "https://pokeapi.co/api/v2/language/9/"
            },
            "version_group": {
            "name": "gold-silver",
            "url": "https://pokeapi.co/api/v2/version-group/3/"
            }
        }
    ],
    "learned_by_pokemon": [
        {
            "name": "clefairy",
            "url": "https://pokeapi.co/api/v2/pokemon/35/"
        },
        {
            "name": "jigglypuff",
            "url": "https://pokeapi.co/api/v2/pokemon/39/"
        }
    ],
    "generation": {
        "name": "generation-i",
        "url": "https://pokeapi.co/api/v2/generation/1/"
    },
    "past_values": [],
    "power": 40,
    "pp": 35,
    "priority": 0,
    "stat_changes": [],
    "super_contest_effect": {
        "url": "https://pokeapi.co/api/v2/super-contest-effect/5/"
    },
    "target": {
        "name": "selected-pokemon",
        "url": "https://pokeapi.co/api/v2/move-target/10/"
    },
    "type": {
        "name": "normal",
        "url": "https://pokeapi.co/api/v2/type/1/"
    }
}
```

# :electric_plug: Installatie

Ga naar de jusite directory:

```
cd jouDirectory
```

Clone de repo:

```
git clone https://github.com/mbergevoet/real-time-web-2021.git
```

Wanneer hij gecloned is:

```
npm install
```

Als alle dependencies zijn geïnstalleerd:

```
npm run dev
```

## :bookmark_tabs: License

[![MIT License](https://img.shields.io/apm/l/atomic-design-ui.svg?)](https://github.com/tterb/atomic-design-ui/blob/master/LICENSEs)

> This repository uses [MIT](https://github.com/mbergevoet/iCOV-redesign/blob/master/LICENSE) license. © Merlijn Bergevoet 2021

<!-- Here are some hints for your project! -->

<!-- Start out with a title and a description -->

<!-- Add a link to your live demo in Github Pages 🌐-->

<!-- ☝️ replace this description with a description of your own work -->

<!-- replace the code in the /docs folder with your own, so you can showcase your work with GitHub Pages 🌍 -->

<!-- Add a nice image here at the end of the week, showing off your shiny frontend 📸 -->

<!-- Maybe a table of contents here? 📚 -->

<!-- How about a section that describes how to install this project? 🤓 -->

<!-- ...but how does one use this project? What are its features 🤔 -->

<!-- What external data source is featured in your project and what are its properties 🌠 -->

<!-- This would be a good place for your data life cycle ♻️-->

<!-- Maybe a checklist of done stuff and stuff still on your wishlist? ✅ -->

<!-- How about a license here? 📜  -->
