import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import Users from './models/Users';
const app = express();
const mongoose = require('mongoose');
const expressValidator = require('express-validator');
const router = express.Router();
const bcrypt = require('bcryptjs');

app.use(cors());
app.use(bodyParser.json());

// mongoose.connect('mongodb://[server]/issues');
const CONNECTION_URI = 'mongodb://localhost:27017/alpynDb';
//connect to mongoDb using mongoose
mongoose.set('useCreateIndex', true)
mongoose.connect(CONNECTION_URI, { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', () => {
    console.log('MongoDB database connection established successfully!');
});

//check for db erros
connection.on('error', function (err) {
    console.log(err);
});

//Express validator Middleware
app.use(expressValidator({
    errorFormatter: (param, msg) => {
        let namespace = param.split('.'),
            root = namespace.shift(),
            formParam = root;
        return { msg, formParam };
    }
}));

app.use('/', router);

router.route('/users').get((req, res) => {
    Users.find((err, users) => {
        if (err)
            res.send(err);
        else
            res.status(200).send(users);
    });
});

router.route('/users/:id').get((req, res) => {
    Users.findById(req.params.id, (err, user) => {
        if (err)
            res.json({ 'message': err });
        else
            res.json(user);
    })
});


router.route('/users/add').post((req, res) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    req.checkBody('username', 'Username is required').notEmpty();
    req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('email', 'Email is not valid').isEmail();
    req.checkBody('password', 'Password is required').notEmpty();
    let errors = req.validationErrors();
    if (errors) {
        console.log(errors)
        res.status(400)
            .send(req.err);
    }
    else {
        Users.find({ email: req.body.email }).then(result => {
            if (result.length > 1) {
                return res.status(422).send("User ALready Exist")
            }
        });
        let newUser = new Users({
            username: username,
            email: email,
            password: password
        });
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err) {
                    console.log(err);
                    res.status(400).send(err);
                }
                newUser.password = hash;
                newUser.save()
                    .then(user => {
                        res.status(200)
                            .send({
                                "status": "SUCCESS",
                                user: { user }

                            });
                        res.json(user);
                    })
                    .catch(err => {
                        res.status(400).send(err._message);
                    });
            });
        });

    }

});

router.route('/users/update/:id').post((req, res) => {
    Users.findById(req.params.id, (err, user) => {
        if (!user)
            return next(new Error('Could not load Document'));
        else {
            user.username = req.body.username;
            user.email = req.body.email;
            user.password = req.body.password;
            user.save().then(user => {
                res.status(200).send(user);
            }).catch(err => {
                res.status(400).send({ 'message': 'Update failed' });
            });
        }
    });
});

router.route('/users/delete/:id').get((req, res) => {
    Users.findOneAndDelete({ _id: req.params.id }, (err, user) => {
 