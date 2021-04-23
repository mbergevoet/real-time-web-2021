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
        socket.join(data.battleID)
        const player = new Player(socket.id, data.username, 150)
        console.log(data)
        battles.forEach((battle) => {
            // battleID is from player, battle.id is from class
            if (data.battleID == battle.id) {
                battle.players.push(player)
                console.log(battle.players)
                io.to(data.battleID).emit('updateBattleInfo', battle)
                // io.to(data.battleID).emit('updateTurnInfo',)
                if (battle.players.length === 1) {
                    battle.hasTurn = player.id
                }
            }
        })
        console.log(battles)
    })

    // battles = [ Battle { id = 1, players = [ Player { id = '1A', name = 'Jan', hitpoints = 150}, Player { id = '2B', name = 'Piet', hitpoints = 150} ], hasTurn = 1A } ]

    socket.on('attack', (data) => {
        battles.forEach((battle) => {
            if (battle.id == data.battleID)
                battle.players.forEach((player) => {
                    const damage = 20
                    if (battle.hasTurn == player.id) {
                        battle.players.forEach((player) => {
                            if (battle.hasTurn !== player.id) {
                                player.hitpoints = player.hitpoints - damage
                            }
                        })
                    } else if (battle.hasTurn !== player.id) {
                        console.log("regel 104 ", battle)
                        battle.hasTurn = player.id
                        io.to(data.battleID).emit('updateBattleInfo', battle)
                    }
                })
        })
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