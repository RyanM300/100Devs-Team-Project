const express = require('express')
const app = express()
const cors = require('cors')
const connectDB = require('./database/connectDB')
require('dotenv').config()

// Routes
const exerciseRoutes = require("./routes/exerciseRoutes");

const PORT = process.env.PORT || 2121;

connectDB();

// Middleware- must be put prior to any CRUD operations
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors())

app.use("/exercises", exerciseRoutes);

app.get('/', (request, response) => {
    collection.find().toArray()
    .then(results => {
        console.log(results)
        response.render('index.ejs')
    })
    .catch(error => console.error(error))
})

app.get('/completed', (request, response) => {
    collection.find().toArray()
    .then(results => {
        console.log(results)
        response.render('completed.ejs')
    })
    .catch(error => console.error(error))
})

app.get('/favorite', (request, response) => {
    collection.find().toArray()
    .then(results => {
        console.log(results)
        response.render('favorite.ejs')
    })
    .catch(error => console.error(error))
})

// Port connection
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`)
})
