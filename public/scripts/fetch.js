async function fetchMove(endpoint) {
    fetch(endpoint)
        .then(response => {
            const jsonResponse = response.json()
            return jsonResponse
        })
}

module.exports = { fetchMove };