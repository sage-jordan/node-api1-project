// implement your API here

const express = require('express');
const server = express();
const db = require('./data/db');

server.get('/', (req, res) => {
    res.send(`The server works!`);
});

server.listen(5000, () => {
    console.log('=== server listening on port 5000===');
});

//CREATE A USER
server.post('/users', (req, res) => {
    const user = res.params.body;
    db.insert(user)
        .then(newUser => {
            res.status(200).json({success: true, newUser})
        })
        .catch(err => {
            res.status(500).json({success:false, message: err})
        });
})

//GET USERS
server.get('/users', (req, res) => { 
    const users = db.find();
    res.status(201).send(users);
});

//GET USER BY ID
server.get('/users/:id', (req, res) => {
    const id = req.params;
    db.findById(id)
        .then(byId => {
            res.status(202).json({success: true, byId})
        })
        .catch(err => {
            res.status(501).json({success: false, message: `cannot find user with id= ${id}`})
        })
});

//UPDATE USER
server.put('/users/:id', (req, res) => {
    const id = req.params.id;
    const userInfo = req.body;
    db.update(id , userInfo)
        .then(user => {
            if(user) {
                res.status(203).json
            } else {
                res.status(404).json({success: false, message: `cannot find user with id= ${id}`})
            }
        })
})

//DELETE USER
server.delete('/users/:id', (req, res) => {
    const {id} = req.params;
    db.remove(id)
        .then(deletedUser => {
            if(deletedUser) {
                res.status(204).end();
            } else {
                res.status(404).json({message: `i could not find id= ${id}`});
            }
        })
        .catch(err => {
            res.status(500).json({success: false, err});
        });
})