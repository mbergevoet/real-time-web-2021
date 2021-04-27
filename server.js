require('dotenv').config()
const express = require('express')
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)
const port = process.env.PORT || 2000
const { join } = require('path')

const { fetchMoves } = require('./public/scripts/fetch.js')
// const moveEndpoint = "https://pokeapi.co/api/v2/move/"
// const moves = ["1/", "3/", "11/", "21/", "23/", "25/", "33/", "36/", "44/", "505/",]
// pound 100, double slap 85, vice-grip 100, slam 75, stomp 100, double-kick 75, tackle 100, take-down 85, bite 100 healing pulse

const endpoints = [
    "https://pokeapi.co/api/v2/move/21/"
    // "https://pokeapi.co/api/v2/move/21/",
    // "https://pokeapi.co/api/v2/move/25",
    // "https://pokeapi.co/api/v2/move/505/",
]

// Rooms logic inpired by Max Hauser
class Player {
    constructor(id, name, hitpoints) {
        this.id = id
        this.name = name
        this.hitpoints = hitpoints
    }
}

class Battle {
    constructor(id, players, hasTurn) {
        this.id = id;
        this.players = players
        this.hasTurn = hasTurn
    }
}

const battles = [];

app
    .use(express.static(`${__dirname}/public`))
    .use(express.urlencoded({ extended: true }))
    .set('view engine', 'ejs')
    .set('views', join(`${__dirname}/views`))
    .get('/', (req, res) => {
        res.redirect('/joinbattle');
    })
    .get('/joinbattle', (req, res) => {
        res.render('pages/joinbattle')
    })
    .post('/joinbattle', (req, res) => {
        if (req.body.battleID.length == 0) {
            // Maak nieuwe room aan
            const battleID = (Math.random() * 100000) | 0;
            const battle = new Battle(battleID, [], "");
            battles.push(battle)
            res.redirect(`/battle?battleid=${battleID}&username=${req.body.username}`)
        } else {
            // Join bestaande room
            const inputID = req.body.battleID;
            res.redirect(`/battle?battleid=${inputID}&username=${req.body.username}`)
        }
    })
    .get('/battle', (req, res) => {
        fetchMoves(endpoints)
            .then((data) => {
                // console.log("Data:", data)
                res.render('pages/battle', { moves: data })
            })
    })


io.sockets.on('connection', (socket) => {
    console.log('A user has connected')

    socket.on('newUser', (data) => {
        const player = new Player(socket.id, data.username, 30)
        console.log(data)
        socket.join(data.battleID)
        battles.forEach((battle) => {
            // battleID is from player, battle.id is from class
            if (data.battleID == battle.id) {
                battle.players.push(player)
                console.log('line 83', battle)
                if (battle.players.length === 1) {
                    battle.hasTurn = player.id
                    console.log('line 88', battle)
                    io.to(data.battleID).emit('updateBattleInfo', battle)
                } else {
                    io.to(data.battleID).emit('updateBattleInfo', battle)
                }
            }
        })
        console.log(battles)
    })

    // battles = [ Battle { id = 1, players = [ Player { id = '1A', name = 'Jan', hitpoints = 150}, Player { id = '2B', name = 'Piet', hitpoints = 150} ], hasTurn = 1A } ]

    socket.on('attack', (data) => {
        // battles.forEach((battle) => {
        // Check which battle
        const damage = 30
        const currentBattle = battles.filter((battle) => battle.id == data.battleID)[0]
        const attacker = currentBattle.players.filter((player) => player.id == currentBattle.hasTurn)[0]
        console.log("Welke speler heeft de beurt ", currentBattle.hasTurn)
        if (currentBattle.hasTurn == attacker.id) {
            console.log("heeft beurt ", attacker.name)
            // Check player who doesn't have turn
            let enemy = currentBattle.players.filter((player) => player.id !== currentBattle.hasTurn)[0]
            console.log("heeft niet de beurt ", enemy.name)
            // Damage enemy
            enemy.hitpoints = enemy.hitpoints - damage
            // Update turn
            currentBattle.hasTurn = enemy.id
            // Kijk welke player over een komt met enemy
            let playerIsEnemy = currentBattle.players.filter((player) => player.id == enemy.id)[0]
            console.log("124 ", playerIsEnemy)
            // Vergelijk id met id in Battle
            // Pushen in player array
            playerIsEnemy = enemy
            console.log(currentBattle)
            io.to(data.battleID).emit('updateBattleInfo', currentBattle)
        }
        console.log(data)
    })

    socket.on('checkHitpoints', (data) => {
        const currentBattle = battles.filter((battle) => battle.id == data.battleID)[0]
        currentBattle.players.forEach((player) => {
            console.log(player.hitpoints)
            if (player.hitpoints <= 0) {
                // console.log(player.name, player.id, "verliest")
                app.get('/endbattle', (req, res) => {
                    res.render('pages/endbattle', { battle: currentBattle })
                })
                io.to(data.battleID).emit('end', currentBattle)
            }
        })
    })

    socket.on('disconnect', () => {
        console.log('A user has disconnected')
    })
})

http.listen(port, function () {
    console.log(`Server listening at http://localhost:${port}`)
})