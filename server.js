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

const endpoints = [
    "https://pokeapi.co/api/v2/move/1/",
    "https://pokeapi.co/api/v2/move/21/",
    "https://pokeapi.co/api/v2/move/25",
    "https://pokeapi.co/api/v2/move/505/",
]
// pound 100, double slap 85, vice-grip 100, slam 75, stomp 100, double-kick 75, tackle 100, take-down 85, bite 100 healing pulse

// Rooms logic inpired by Max Hauser
class Player {
    constructor(name, hitpoints) {
        this.name = name;
        this.hitpoints = hitpoints
        this.hasTurn = false
    }
}

class Battle {
    constructor(id, players, hasTurn) {
        this.id = id;
        this.players = players
        this.hasTurn = hasTurn
    }
}

let battleID;
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
            const battle = new Battle(battleID, []);
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
        socket.join(data.battleID)
        const player = new Player(data.username, 150, false)
        console.log(data)
        battles.forEach((battle) => {
            // battleID is from player, battle.id is from class
            if (data.battleID == battle.id) {
                battle.players.push(player)
                console.log(battle.players)
                // battles.players[0].hasTurn = true
                io.to(data.battleID).emit('updateBattleInfo', battle)
                io.to(data.battleID).emit('updateTurnInfo',)
            }
        })
        console.log(battles)
    })

    socket.on('attack', (data) => {
        console.log(data)
        // const damage = 20
        // if (data.username === battles.players[0].name) {
        //     battles.players[0].hasTurn = false
        //     battles.players[1].hasTurn = true
        // } else if (data.username === battles.players[1].name) {
        //     battles.players[0].hasTurn = true
        //     battles.players[1].hitpoints - damage
        // }
        // io.to(data.battleID).emit('updateBattleInfo', battle)
        // socket.emit('attack', attack)
    })

    socket.on('disconnect', () => {
        console.log('A user has disconnected')
    })
})

http.listen(port, function () {
    console.log(`Server listening at http://localhost:${port}`)
})