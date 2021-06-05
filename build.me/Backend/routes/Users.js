const router = require('express').Router();
const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.route('/').get((req, res) => { // /users/ is for GET req
    User.find()                         // will get array of ALL users
    .then(users => res.json(users))     //  Promise, if success, return users, json style
    .catch(err => res.status(400).json('Error: ' + err)); // spit out error if problem
});

router.get('/:id', async (req, res) => { // GET USER by specific ID
    try {
        const UserById = await User.findById(req.params.id)

        res.json(UserById);
    } catch(err) {
        console.error(err)
        res.status(400).json('Error' + err)
    }
})

router.post('/add', async (req, res) => {
    try {
        const {username, email, password, passwordVerify} = req.body;
        
        // the following if statements are for validation, the user must have these conditions to create an account
        
        // user must enter ALL fields
        if (!username || !email || !password || !passwordVerify) {
            return res
            .status(400)
            .json({Error : "Please enter all required fields"})
        }

        // user password must be 8 characters long
        if (password.length < 8) {
            return res
            .status(400)
            .json({Error : "Password needs to be at least 8 characters"})
        }
        
        // user's 'confirm password' must be equal to password set
        if (password !== passwordVerify) {
            return res
            .status(400)
            .json({Error: "Please enter the same password twice"})
        }

        // user's username Must be UNIQUE 
        // if exisitng User exists, it means that theres a duplicate
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res
            .status(400)
            .json({Error: "That username already exists!"})
        }

        // Encrypt using bcrypt
        // first we add salt to the password to make it truly unique
        // then we hash it
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt)

        // save user to the MongoDB

        const newUser = new User({
            username,
            email,
            passwordHash
        })

        const savedUser = await newUser.save(); // after saving, this returns a new document/json of the user
        
        // log the user in after they have registered an account
        // sign the token immediately after registering
        const token = jwt.sign({
            user: savedUser._id // unique userid
        },  process.env.JWT_SECRET); // secret decryption key we created used
        // send the token in a cookie in HTTP-only

        res.cookie("token", token, {
            httpOnly: true,
            // secure: true,
            // sameSite: "none",
        })
        .send()

        
    } catch(err) {
        console.error(err)
        res.status(400).json('Error' + err)
    }
})

// log in the users using POST

router.post("/login",async (req, res) => {
    try {
        const {username, password, email} = req.body

        /* Validation process */

        // validate that all fields are sent
        if ( !username || !password || !email) {
            return res
            .status(400)
            .json({Error : "Please enter all required fields"})
        }

        // check if /username is entered correctly
        const existingUser = await User.findOne({username})
        if (!existingUser) {
            return res
            .status(401)
            .json({Error: "One of the fields is wrong!"})
        }

        // check if /email is entered correctly
        const EmailUser = await User.findOne({email})
        if (!EmailUser) {
            return res
            .status(401)
            .json({Error :"One of the fields is wrong!"})
        }
        // boolean, checks if password given matches the encryption
        const passwordCorrect = await bcrypt.compare(password, existingUser.passwordHash);
        if (!passwordCorrect) {
            return res
            .status(401)
            .json({Error: "One of the fields is wrong!"})
        }

        // if all is good, sign in the user with token
        const token = jwt.sign({
            user: existingUser._id
        },  process.env.JWT_SECRET)

        // send the token in a HTTP-only cookie
        res.cookie("token", token, {
            httpOnly: true,
            // secure: true,
            // sameSite: "none",
        })
        .send()
        
    } catch(err) {
        console.error(err)
        res.status(400).json('Error' + err)
    }
})

// Logout functionality
router.get('/logout', (req, res) => { // GET REQUEST
    res.cookie("token", "",{ // clear cookie or make the cookie empty
        httpOnly:true,
        expires: new Date(0), // completely remove cookie
        // secure: true,
        // sameSite: "none",
    })
    .send();
})

module.exports = router; // now can be used