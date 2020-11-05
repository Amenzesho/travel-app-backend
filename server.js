const express = require ('express');
const bodyParser = require ('body-parser')
const app =   express()


app.use(bodyParser.json())

const database = { 
    users: [
        {
            id: 123,
            name: "peter",
            password: '123'
    }
    ]}

app.get('/', (req,res)=>{
    res.json(database.users)
})

app.post('/register', (req,res)=>{
    console.log(req.body)
    const {password,id,name} = req.body

    database.users.push({
        id:id,
        name:name,
        password:password

    })

    res.json('user added successfully')

})

app.get('/about', (req,res)=>{
    res.send("<h1>I am About </h1>")
})

app.listen(3000,()=> {
    console.log('server running')
})