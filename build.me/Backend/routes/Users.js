const router = require('express').Router();
let User = require('../models/user.model');

router.route('/').get((req, res) => { // /users/ is for GET req
    User.find()                         // will get array of all users
    .then(users => res.json(users))     //  Promise, if success, return users, json style
    .catch(err => res.status(400).json('Error: ' + err)); // spit out error if problem
});

router.route('/add').post((req, res) => {   // /users/add is for POST req
    const username = req.body.username;     // username is part of usermane body

    const newUser = new User({username});   // create a new User instance using Schema

    newUser.save()                          // save user to MongoDB
    .then(() => res.json('User added!'))    // if success, return success
    .catch(err => res.status(400).json('Error: ' + err)); // else, spit error
});

module.exports = router; // now can be used