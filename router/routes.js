import Users from '../models/Users';
import express from 'express';
const router = express.Router();
const bcrypt = require('bcryptjs');

router.get('/users', (req, res) => {
    Users.find((err, users) => {
        if (err)
            res.send(err);
        else
            res.status(200).send(users);
    });
});

router.get('/users/:id', (req, res) => {
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

    Users.find({ email}).then(result => {
        if (result.length === 1) {
            return res.status(409).send({ error: 'User with this email already exists'});
        } else {
            let newUser = new Users({
                username: username,
                email: email,
                password: password
            });
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) {
                        return res.status(400).send({error: 'Bad request'});
                    } else {
                        newUser.password = hash;
                        newUser.save()
                            .then(user => {
                                return res.status(200).send({ success: "Account Created Successfully", user });
                            })
                            .catch(err => {
                               return res.status(400).send({error: err});
                            });           
                    }
                });
            });
        }
    })

});

router.post('/users/update/:id', (req, res) => {
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

router.get('/users/delete/:id', (req, res) => {
    Users.findOneAndDelete({ _id: req.params.id }, (err, user) => {
        if (err)
            res.json(err);
        else
            res.send('User Deleted');
    });
});

export default router;