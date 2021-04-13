const fetch = require('node-fetch')

const fetchMoves = async (urls) => {
    try {
        return response = await Promise.all(
            urls.map(url => fetch(url).then(res => res.json()))
        )
        // console.log(response)
    } catch (error) {
        console.log("Error", error)
    }
}

module.exports = { fetchMoves };