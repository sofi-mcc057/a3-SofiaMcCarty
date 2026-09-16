require( 'dotenv' ).config()
const express = require ('express'),
    cookie = require('cookie-session'),
    { MongoClient, ObjectId } = require("mongodb"),
    app = express(),
    entries = []
    users = []

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.PASSWORD}@${process.env.HOST}`
const client = new MongoClient( uri )

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use( cookie({
    name: 'session',
    keys: ['key1', 'key2']
}))
app.use(express.static('public'))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html')
})

app.post('/login', async (req, res) =>{
    console.log("running function")
    const {username, password} = req.body
    const user = await collection.findOne({username: username})
    if (user && user.password ===password){
        req.session.login = true
        res.redirect('/main.html')
    } else{
        return res.status(401).json({ success: false, message: "Invalid username or password." })    }
})


app.post('/register', async (req, res) =>{
    console.log("running create function")
    const {username, password} = req.body
    const existingUser = await collection.findOne({ username: username })
    if (existingUser) {
        return res.status(400).json({ success: false, message: "Username is already taken." })
    }
    await collection.insertOne({username: username, password: password})
    // res.writeHead(200, {'Content-Type': 'application/json'})
    return res.status(201).json({ success: true, message: "Account created successfully! You can now log in." })
})

app.use(function(req, res, next){
    if (req.session.login && req.session.login === true){
        next()
    } else{
        res.sendFile(__dirname + '/public/index.html')
    }
})
// app.post('/submit', middleware_post)

app.post('/submit', (req, res) => {
    entries.push(req.body)
    console.log(req.body)
    res.writeHead(200, {'Content-Type': 'application/json'})
    res.end(JSON.stringify(entries))
})


async function run() {
    await client.connect()
    collection = await client.db("dbName").collection("users")
    console.log("connected to db")
}

run().then(() => {
    app.listen(process.env.PORT || 3000)
})
