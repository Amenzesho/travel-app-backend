const express = require('express')
const bcrypt = require('bcryptjs')
const salt = bcrypt.genSaltSync(10);
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(cors())

const database = {
    users: [{
        id: "120",
        name: "Sally",
        hobby: "socccer",
        entries:0,
        joined: new Date()
    }  
 ], 
    login: [{
        id: "120",
        email: "sally@gmail.com",
        password: "hash"
    }        
    ],
    destinations: {
        Adventurous: "Banff",
        Relaxing: "Lake-Louise",
        Spiritual: "Canmore",
        Traditional: "Edmonton",
        Spontaneous: "Sylvan-Lake"
    }
}

app.get('/', (req, res)=>{
    res.send('<h1>Server is runing Well on Amazing Cloud')
})


app.post('/questions', (req, res)=>{
    let personality = req.body.personality
    let destination;
    console.log(personality)
    for (const [key, value] of Object.entries(database.destinations)) {
        if (personality === key) {
            destination = value;
        }
    }
    if (destination === undefined) {
        res.json('error!!')
    } else {
        res.json(destination)
    }
})

app.post('/signin',(req,res)=>{
const {password, id, email } = req.body
console.log(password, email)
    if ( !email ||  !password) {
        return res.status(400).json('incorrect form submission')
}
let found  = false
    database.login.forEach((user,i)=>{
     if (user.email === email) {
        const isFound = bcrypt.compareSync(password, user.password);
        found = isFound
        if(found) {
            res.status(200).json(database.users[i])
    } 
}
})
if(!found) {
    res.status(400).json('unable to log on')
}
})
app.get('/about',(req,res)=>{
    res.send("<h1>I am about</h1>")
})

app.post('/register',(req,res)=>{
    const {name, password, email,} = req.body
    console.log(name, email, password)
    if (!name, !email ||  !password) {
        return res.status(400).json('incorrect form submission')
}
    const hash = bcrypt.hashSync(password, salt);
    database.users.push({
        id:`${database.users.length+125}`,
        name: name,
        email:email,
        entries:0,
        joined: new Date().toDateString()
    } )
    database.login.push({
        id:`${database.users.length+125}`,
        email:email,
        password:hash,
    })
     res.json(database.users[database.users.length-1])
 })

app.get('/profile/:id', (req,res)=>{
    const {id} = req.params;
      let found = false
      database.users.forEach((user)=>{
        if(user.id === id) {
            found = true
            return res.json(user)
        } 
    })
    if(!found){
        res.status(400).json('no such user')
    }
})

app.put('/booked', (req,res)=>{
    const {id} = req.body;
    let found = false
      database.users.forEach((user)=>{
        if(user.id === id) {
           user.entries ++
            found = true
            return res.json(user.entries)
        } 
    })
    if(!found){
        res.status(400).json('no such user')
    }
})

let port = process.env.PORT || 3000

app.listen(port, ()=>{
    console.log('server running on '+ port)
})