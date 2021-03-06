const User = require('../../models/User');
const UserSession = require('../../models/UserSession');
const router = require('express').Router();

router.post('/', function (req, res, next) {
    const { body } = req;
    const {
        password
    } = body;
    let { email } = body;

    if (!email) {
        return res.send({
            success: false,
            message: 'Error: Email cannot be blank.'
        });
    }
    if (!password) {
        return res.send({
            success: false,
            message: 'Error: Password cannot be blank.'
        });
    }

    email = email.toLowerCase();

    User.find({
        email: email
    }, (err, users) => {
        if (err) {
            return res.send({
                success: false,
                message: 'Error: Server error.'
            });
        }
        if (users.length != 1) {
            return res.send({
                success: false,
                message: 'Error: No user.'
            });
        }

        const user = users[0];
        if (!user.validPassword(password)) {
            return res.send({
                success: false,
                message: 'Error: Invalid password'
            });
        }


        const userSession = new UserSession();
        userSession.userId = user._id;
        userSession.save((err, doc) => {
            if (err) {
                return res.send({
                    success: false,
                    message: 'Error: server error.'
                });
            }

            return res.send({
                success: true,
                message: 'Valid sign in.',
                token: doc._id,
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    team: user.team,
                    projects: user.projects
                }
            });
        });
    });
});

router.get('/verify', function (req, res, next) {
    const { query } = req;
    const { token } = query;

    UserSession.find({
        _id: token
    }, (err, sessions) => {
        if (err) {
            return res.send({
                success: false,
                message: 'Error: Server error.'
            });
        }

        if (sessions.length != 1) {
            return res.send({
                success: false,
                message: 'Error: No session.'
            });
        } else {
            return res.send({
                success: true,
                message: 'Good.'
            });
        }
    });
});

module.exports = router;