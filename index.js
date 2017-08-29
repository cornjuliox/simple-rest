// fill this in later.
const express = require('express');
const bodyParser = require('body-parser');

const Models = require('./models.js');

// initial setup
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let port = process.env.PORT || 8080;
let router = express.Router();
let User = Models.User;

// router setup
router.get('/', (req, res) => {
    res.json({ message: 'welcome to the api! If you\'re seeing this, its working.'});
} );

router.route('/users')
    .post((req, res) => {
        User.findOrCreate({
            where: {
                firstName: req.body.firstName, 
                lastName: req.body.lastName
            }
        }).spread((user, created) => {
            res.json({created: created, obj: user});
        });
    })
    .get((req, res) => {
        // note: this is the GET all users handler
        User.findAll().then(users => {
            res.json({users: users});
        });
    })

router.route('/users/:user_id')
    .get((req, res) => {
        User.findById(req.params.user_id)
            .then( user => {
                if (user) {
                    res.json({user: user});
                } else {
                    res.json({message: 'User with that ID not found.'});
                }
            })
            .catch(err => {
                res.json({error: err});
            })
    })
    .put((req, res) => {
        User.findById(req.params.user_id)
            .then((user) => {
                if (user) {
                    user.firstName = req.body.firstName || user.firstName;
                    user.lastName = req.body.lastName || user.lastName;
                    user.save()
                        .then(() => {
                            res.json({message: 'user successfully updated'})
                        })
                        .catch(err => {
                            res.json({message: 'error occurred', error: err})
                        })
                }
            })
            .catch((err) => {
                res.json({message: 'error occurred', error: err})
            })
    })

// app config
app.use('/api', router);
app.listen(port);
console.log('All the action\'s happening on port: ', port);
