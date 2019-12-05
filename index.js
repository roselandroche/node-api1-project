// implement your API here

const express = require("express")
let db = require("./data/db")

const app = express()

app.use(express.json())

// initial get
app.get("/", (req, res) => {
    console.log("ip", req.ip)

    res.json({ message: "Welcome to our API" })
})

// find()
app.get("/users", (req, res) => {
    res.json(db)
})

// findById()
app.get("/users/:id", (req, res) => {
    const user = db.find(row => row.id === req.params.id)

    if(user) {
        res.json(user)
    } else {
        res.status(404).json({ error: "User not found"})
    }
})

// insert()
app.post("/users", (req, res) => {
    const newUser = {
        id: String(db.length + 1),
        name: req.body.name,
        bio: ""
    }
    db.push(newUser)
    res.status(201).json(newUser)
})

// update() 

// remove()
app.delete("/users/:id", (req, res) => {
    const user = db.find(row => row.id === req.params.id)

    if(user) {
        db = db.find(row => row.id !== req.params.id)
        res.json(user)
    } else {
        res.status(404).json({ error: "User not found" })
    }
})

const port = 5000
const host = "127.0.0.1"

app.listen(port, host, () => {
    console.log(`Server running at http://${host}:${port}`)
})