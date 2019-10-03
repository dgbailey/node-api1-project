// implement your API here
const express = require('express');
const db = require('./data/db')

const port = '8000';
const s = express();

s.use(express.json())//teach the server to read json from the req body  

s.get("/", (req,res) =>{
    //remember requests will initially be placed on the execution stack
    //these will immediately be processed calling find() which is an async DB function 
    //find will be removed from stack
    //stack will clear making room for new requests while promise completes somewhere in API land
    //once promise resolves, queued callbacks will be placed in the JOB queue
    //the execution loop marshalls these callbacks and pushes them to the stack to be executed
    //we need to avoid process intensive operations in these callbacks
    db.find().then( data => res.send(data)).catch(err => res.send(err));
   
})

s.post("/users",(req,res) => {
    const userData = req.body;
    
    if(userData.name && userData.bio){
        db.insert(userData).then( ud => res.json(ud)).catch(err => res.json(err));
    }
    else{
        res.json( {errorMessage: "Please provide name and bio for the user." });
    }
});



s.listen(port, () => console.log(`listening on port ${port}`))



