// implement your API here

const express = require('express');
const server = express();
const db = require('./data/db');

server.get('/', (req, res) => {
    res.send(`The server works!`);
});

server.use(express.json());

//CREATE A USER
server.post('/api/users', (req, res) => {
    const user = req.body;
    if(user.hasOwnProperty("name" && "bio")){
        db.insert(user)
            .then(newId => {
                const newUser = {
                    ...newId,
                    ...user
                }
                res.status(200).json({success: true, newUser});
            })
            .catch(err => {
                res.status(500).json({success:false, message: err});
            });
    } else {
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." });
    }
})

//GET USERS (complete w 'localhost:8000/api/users')
server.get('/api/users', (req, res) => { 
    // const users = db.find();
    // if(users){
    //     res.status(201).json(users)
    // } else {
    //     res.status(501).json({success: false, message: `cannot get users at this time`})
    // }
    db.find()
        .then(user => {
            res.status(201).json(user)
        })
        .catch(err => {
            res.status(501).json({success: false, message: err})
        });
});

//GET USER BY NAME (completed w 'localhost:8000/api/users/:name?name=Samwise Gamgee')
server.get('/api/users/:name', (req, res) => {
    const { name } = req.params;
    db.findById(id)
        .then(userAtId => {
            console.log(`${name}: `, userAtId);
            if(userAtId){
                res.status(202).json({ success: true, message: userAtId });
            } else {
                res.status(404).json({ message: `The user ${name} does not exist.` });
            };
        })
        .catch(err => {
            res.status(501).json({ success: false, message: `cannot find ${name}`, err });
        });
});

//UPDATE USER
server.put('/api/users/:id', (req, res) => {
    const id = req.params.id;
    const userInfo = req.body;
    db.update(id , userInfo)
        .then(user => {
            if(user) {
                const newUser = {
                    ...userInfo,
                    id: user
                };
                res.status(203).json({ success: true, newUser })
            } else {
                res.status(404).json({ success: false, message: `cannot find user with id= ${id}` })
            }
        })
        .catch(err => {
            res.status(503).json({ success: false, err })
        })
})

//DELETE USER (works with path var id)
server.delete('/api/users/:id', (req, res) => {
    const {id} = req.params;
    db.remove(id)
        .then(deletedUser => {
            if(deletedUser) {
                console.log(deletedUser);
                res.status(204).json({ deletedUser });
            } else {
                res.status(404).json({ message: `i could not find user with id ${id}` });
            }
        })
        .catch(err => {
            res.status(500).json({ success: false, err });
        });
})

server.listen(8000, () => {
    console.log('=== server listening on port 8000===');
});