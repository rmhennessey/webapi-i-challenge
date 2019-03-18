// implement your API here
const express = require ('express');

const db = require('./data/db');

const server = express();

server.use(express.json());

server.post('/api/users', (req, res) => {
    const userInfo = req.body;

    !userInfo.name || !userInfo.bio
    ? res
        .status(400)
        .json({ errorMessage: "Please provide name and bio for the user" })
    : db
        .insert(userInfo)
        .then(user => {
          res.status(201).json(user);
        })
        .catch(error => {
          res.status(500).json({ error: "There was an error while saving the user to the database" });
        });
});


server.get('/api/users', (req, res) => {
    db
        .find()
        .then(db => {
            res.status(200).json(db);
        })
        .catch(error => {
            res.status(500).json({ error: "The users information could not be retrieved." })
        })
})

server.get('/api/users/:id', (req, res) => {
    const id = req.params.id;
    db
        .findById(id)
        .then(id => {
           if (id) {
            res.status(200).json(id);
           } else {
            res.status(404).json({ message: 'The user with the specified ID does not exist.' });
           }
        })
        .catch(error => {
            res.status(500).json({ message: 'The user information could not be retrieved.' });
        })
})


server.delete('/api/users/:id', (req, res) => {
    // const id = req.body.id;
    const userID = req.params.id;

    db 
        .remove(userID)
        .then (userID => {
            if(userID) {
                res.status(204).end();
            } else {
                res.status(404).json({ message: 'The user with the specified ID does not exist.' }); 
            }
        })
        .catch(error => {
         res.status(500).json ({  error: "The user could not be removed"  })
        })
})

//     !userID
//     ? res
//         .status(404)
//         .json({ message: "The user with the specified ID does not exist."  })
//     : db 
//         .remove(userID)
//         .then(userID => {
//             res.status(204).end()
//         })
//         .catch(error => {
//             res.status(500).json ({  error: "The user could not be removed"  })
//         })
// })


server.listen(5000, () => {

});