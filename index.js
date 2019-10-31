// implement your API here

const express = require('express');
const server = express();
const db = require('./data/db');

server.listen(4000, () => {
    console.log('=== server listening on port 4000===');
});

//GET USERS
server.get('/users', (req, res) => {

});

//GET USER BY ID
server.get('/users/:id', (req, res) => {

});

//UPDATE USER
server.put('/users/:id', (req, res) => {
    const id = req.params.id;
    const userInfo = req.body;
    db.update(id , userInfo)
        .then(user => {
            if(user) {
                res.status(200).json
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