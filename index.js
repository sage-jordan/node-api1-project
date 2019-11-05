// implement your API here

const express = require('express');
const server = express();
const db = require('./data/db');

server.get('/', (req, res) => {
    res.send(`The server works!`);
});

server.use(express.json());

// //CREATE A USER
// server.post('/api/users', (req, res) => {
//     const user = res.body;
//     console.log(user);
//     db.insert(user)
//         .then(newUser => {
//             res.status(200).json({success: true, newUser})
//         })
//         .catch(err => {
//             res.status(500).json({success:false, message: err})
//         });
// })

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

// //UPDATE USER
// server.put('/api/users/:id', (req, res) => {
//     const id = req.params.id;
//     const userInfo = req.body;
//     db.update(id , userInfo)
//         .then(user => {
//             if(user) {
//                 res.status(203).json({success: true, message: user})
//             } else {
//                 res.status(404).json({success: false, message: `cannot find user with id= ${id}`})
//             }
//         })
// })

// //DELETE USER
// server.delete('/api/users/:id', (req, res) => {
//     const {id} = req.params;
//     db.remove(id)
//         .then(deletedUser => {
//             if(deletedUser) {
//                 res.status(204).end();
//             } else {
//                 res.status(404).json({message: `i could not find id= ${id}`});
//             }
//         })
//         .catch(err => {
//             res.status(500).json({success: false, err});
//         });
// })

server.listen(8000, () => {
    console.log('=== server listening on port 8000===');
});