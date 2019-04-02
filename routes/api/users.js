const { Router } = require('express');
const router = new Router();
const gravatar = require('gravatar');
const bcrpyt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

// Load Input Validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

// Load Model
const User = require('../../models/User');

// @route   Get /api/users
// @desc    Test users route
// @access  Public
router.get('/users', (req, res) => {
    res.json({msg: 'User works'});
});

// @route   Post /api/register
// @desc    Register route
// @access  Public
router.post('/register', (req, res) =>{
    const { errors, isValid } = validateRegisterInput( req.body );

    // Validation
    if(!isValid){
        return res.status(400).json(errors);
    }

    User.findOne({ email: req.body.email })
        .then(user => {
            if(user){
                errors.email = 'Email already exist!'
                return res.status(400).json(errors);
            } else {
                const avatar = gravatar.url(req.body.email, { s: '500', r: 'pg', d: 'mm' });
                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    avatar,
                    password: req.body.password
                });

                bcrpyt.genSalt(10, (err, salt) => {
                    if(err) return console.log(err);
 
                    bcrpyt.hash(newUser.password, salt, (err, hash) => {
                        if(err) throw err;
                        newUser.password = hash;
                        newUser.save()
                            .then(user => res.json(user))
                            .catch(error => console.log(error))
                    });
                });
            }
        })
});

// @route   Get /login
// @desc    Login User / Returning JWT Token
// @access  Public
router.post('/login', (req, res) => {

    const { errors, isValid } = validateLoginInput( req.body );
    // Validation
    if(!isValid){
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email })
        .then(user => {
            if(!user) {
                errors.email = "User not found";
                return res.status(400).json (errors);
            }

            bcrpyt.compare(password, user.password)
                .then(isMatch => {
                    if(isMatch) {
                        // Successful Login

                        // Create JWT Payload
                        const payload = { id: user.id, name: user.name, avatar: user.avatar }

                        // Assigning Single Token
                        jwt.sign(
                            payload,
                            keys.secretOrKey,
                            { expiresIn: 3600 },
                            (err, token) => {
                                res.json({ success: true, token: 'Bearer ' + token });
                            }
                        );
                    } else {
                        errors.password = "Password is incorrect";
                        return res.status(400).json(errors);
                    }
                });
        });
});

// @route   Get /users/current
// @desc    Return current user
// @access  Private
router.get(
    '/current',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        res.json({
            id: req.user.id,
            name: req.user.name,
            email: req.user.email
        });
    }
);

module.exports = router;