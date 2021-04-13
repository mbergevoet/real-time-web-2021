require('dotenv').config()
const express = require('express')
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)
const port = process.env.PORT || 2000
const { join } = require('path')

const { fetchMoves } = require('./public/scripts/fetch.js')
const moveEndpoint = "https://pokeapi.co/api/v2/move/"
const moves = ["1/", "3/", "11/", "21/", "23/", "25/", "33/", "36/", "44/", "505/",]
// pound 100, double slap 85, vice-grip 100, slam 75, stomp 100, double-kick 75, tackle 100, take-down 85, bite 100 healing pulse

app
    .use(express.static(`${__dirname}/public`))
    .use(express.urlencoded({ extended: true }))
    .set('view engine', 'ejs')
    .set('views', join(`${__dirname}/views`))
    .get('/', (req, res) => {
        // Promise.all([
        //     fetchMoves(moveEndpoint + moves[0]),
        //     fetchMoves(moveEndpoint + moves[1]),
        //     fetchMoves(moveEndpoint + moves[2]),
        //     fetchMoves(moveEndpoint + moves[11])
        // ])
        //     .then(([moveOne, moveTwo, moveThree, moveFour]) => {
        //         console.log(moveOne, moveTwo, moveThree, moveFour)
        //         // res.render('pages/battle.ejs', { moves: moveOne, moveTwo, moveThree, moveFour })
        //     })
        res.render('pages/battle.ejs')
    })

io
    .on('connection', (socket) => {
        console.log('A user has connected')

        socket.on('attack', (attack) => {
            socket.emit('attack', attack)
        })

        socket.on('disconnect', () => {
            console.log('A user has disconnected')
        })
    })


http.listen(port, function () {
    console.log(`Server listening at http://localhost:${port}`)
})