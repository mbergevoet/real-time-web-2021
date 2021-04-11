# Real-Time Web @cmda-minor-web · 2020/21

## Inhoud

| Inhoudsopgave       |
| ------------------- |
| Project poster      |
| Eindopdracht ideeën |
| Plan van aanpak     |
| Installatie         | 
| License             |

# :flower_playing_cards: Project poster

# :computer: Live demo

[Link naar de gedeployde Heroku app](https://www.youtube.com/watch?v=dQw4w9WgXcQ)

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

- Login systeem
- Gebruikers koppelen
- Fight pagina
- Aanval systeem
- Character level bijhouden

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
