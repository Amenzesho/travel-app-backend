const express = require ('express');
const bodyParser = require ('body-parser')
const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';

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
    const {password,hobby,name} = req.body
    bcrypt.hash(password, saltRounds, function(err, hash) {
        console.log(hash)
        // Store hash in your password DB.
        database.users.push({
            name:name,
            password:hash,
            hobby: hobby,
            joined: new Date()    
        })
        res.json(hobby)

    });
    
})

app.post('/signin', (req,res)=>{
    const { name, password} = req.body
    let found = false
    database.users.forEach((user)=> {
if (name === user.name) {
    const isFound = bcrypt.compareSync(password, user.password); 
    found = isFound
    if(found){
        res.json(user)
    }
    
}
    })
if (!found){
    res.json("Bad Credentials")
}

})

app.listen(3000,()=> {
    console.log('server running')
})