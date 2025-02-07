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
app.get("/users", async (req, res) => {
    db.find()
        .then(users => {
            res
                .status(200)
                .json(users)
        })
        .catch(() => {
            res
                .status(500)
                .json({ errorMessage: "The users information could not be retrieved." })
        })
    // let users = await db.find()
    // if(users) {
    //     users
    // } else {
    //     res.status(500).json({ errorMessage: "The users information could not be retrieved."})
    // }
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
            name: req.body.name,
            bio: req.body.bio
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
        let deleted = await db.remove(req.params.id)
        res.json(deleted)
    } else if(!user) {
        res.status(404).json({ message: "The user with the specified ID does not exist." })
    } else {
        res.status(500).json({ errorMessage: "The user could not be removed" })
    }
})

const port = process.env.PORT || 5000
const host = process.env.HOST || "0.0.0.0"

app.listen(port, host, () => {
    console.log(`Server running at http://${host}:${port}`)
})