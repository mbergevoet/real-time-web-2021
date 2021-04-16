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
class User {
    constructor(name, hitpoints) {
        this.name = name;
        this.hitpoints = hitpoints
    }
}

class Battle {
    constructor(id, players) {
        this.id = id;
        this.players = players
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
            console.log(battle)
            battles.push(battle);
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
                console.log("Data:", data)
                res.render('pages/battle', { moves: data })
            })
    })

io
    .on('connection', (socket) => {
        console.log('A user has connected')

        let battleid, username;

        socket.on("newUser", (data) => {
            socket.name = data.username
            socket.battle = data.battleID
            battleid = data.battleID;
            username = data.username;
            socket.join(data.battleID);

            battles.forEach((battle) => {
                if (battle.id == data.battleID) {
                    const player = new User(data.username, data.hitpoints);
                    battle.players.push(player);

                    io.to(battleid).emit('updateBattleInfo', battle)
                }
            })
        })

        // socket.on('attack', (attack) => {
        //     socket.emit('attack', attack)
        // })

        socket.on('disconnect', () => {
            console.log('A user has disconnected')
            const currentBattle = rooms.filter((battle) => battle.id == socket.battle);
            if (currentBattle.length == 0) return;
            const updateList = removeFromUserlist(currentBattle[0], socket.name);
            io.to(`${currentBattle[0].id}`).emit('updateBattleInfo', updateList);
        })
    })

function removeFromUserlist(battle, name) {
    if (!battle) { return; }
    const updatedList = battle.players.filter((user) => user.name !== name);
    return updatedList;
}

http.listen(port, function () {
    console.log(`Server listening at http://localhost:${port}`)
})