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
app.get("/users/:id", async (req, res) => {
    const user = await db.findById(req.params.id)
    console.log(user)
    if(user) {
        res.json(user)
    } else if(!user) {
        res.status(404).json({ message: "The user with the specified ID does not exist." })
    }    
    else {
        res.status(500).json({ errorMessage: "The user information could not be retrieved."})
    }
})

// insert()
app.post("/users", (req, res) => {
    if(!req.body.name || !req.body.bio) {
        return res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
    } else if(req.body.name && req.body.bio) {
        const newUser = {
            id: String(db.length + 1),
            name: req.body.name,
            bio: ""
        }
        db.insert(newUser)
        res.status(201).json(newUser)
    } else {
        return res.status(500).json({ errorMessage: "There was an error while saving the user to the database" })
    } 
})

// update() 

// remove()
app.delete("/users/:id", async (req, res) => {
    const user = await db.findById(req.params.id)

    if(user) {
        db = db.find(row => row.id !== req.params.id)
        res.json(user)
    } else if(!user) {
        res.status(404).json({ message: "The user with the specified ID does not exist." })
    } else {
        res.status(500).json({ errorMessage: "The user could not be removed" })
    }
})

const port = 5000
const host = "127.0.0.1"

app.listen(port, host, () => {
    console.log(`Server running at http://${host}:${port}`)
})