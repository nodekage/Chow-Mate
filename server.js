const express = require('express')
require ('dotenv').config()

const app = express()

const PORT = process.env.PORT


app.get('/', (req, res) => {
    res.send({ message: 'Welcome To The Blog!!!!'})
})

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`)
})

