const express = require('express');
const router = express.Router();
const db = require('../data/db');

router.get('/:id', (req,res) => {
    let id = req.params.id;
    db.findById(id).then(data => {
        if(data){
            res.status('200').json(data);
        }
        else{
            res.status('500').json(`{user with id: ${id} not found}`);
        }}) 
    .catch(err => res.status('404').json(err));
})


router.get("/", (req,res) =>{
    //remember requests will initially be placed on the execution stack
    //these will immediately be processed calling find() which is an async DB function 
    //find will be removed from stack
    //stack will clear making room for new requests while promise completes somewhere in API land
    //once promise resolves, queued callbacks will be placed in the JOB queue
    //the execution loop marshalls these callbacks and pushes them to the stack to be executed
    //we need to avoid process intensive operations in these callbacks
    db.find().then( data => res.json(data)).catch(err => res.json(err));
   
})

router.post("/",(req,res) => {
    const userData = req.body;
    
    if(userData.name && userData.bio){
        db.insert(userData).then( ud => res.json(ud)).catch(err => res.json(err));
    }
    else{
        res.json( {errorMessage: "Please provide name and bio for the user." });
    }
});

router.delete("/:id", (req,res) =>{
    let id = req.params.id;
   
    db.remove(id)
    .then(res.status('200').json(`{user: ${id} deleted}`))
    .catch(res.status('404')
            .json({ message: "The user with the specified ID does not exist." })
            )
        }
 );   

 router.put("/:id",(req,res) => {
     let id = req.params.id;
     db.update(id, req.body)
     .then(res.status('200').json(`Success`))
     .catch(err => res.status('400').json(`${err}`))

 });

 module.exports = router;