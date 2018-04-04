const User = require('../../models/User');
const router = require('express').Router();

router.post('/', function (req, res, next) {
    const { body } = req;
    let { email } = body;
    const {
        eNum,
        name,
        password,
        team,
        projects
    } = body;

    if (!eNum) {
        return res.send({
            success: false,
            message: 'Error: eNum cannot be blank.'
        });
    }
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
    if (!name) {
        return res.send({
            success: false,
            message: 'Error: name cannot be blank.'
        });
    }

    email = email.toLowerCase();

    User.find({
        email: email
    }, (err, previousUsers) => {
        if (err) {
            return res.send({
                success: false,
                message: 'Error: Server error.'
            });
        } else if (previousUsers.length > 0) {
            return res.send({
                success: false,
                message: 'Error: Account already exist.'
            });
        }

        const newUser = new User();
        newUser.eNum = eNum;
        newUser.email = email;
        newUser.password = newUser.generateHash(password);
        newUser.name = name;
        newUser.team = team;
        newUser.projects = projects;

        newUser.save((err, user) => {
            if (err) {
                return res.send({
                    success: false,
                    message: 'Error: Server error.'
                });
            }
            return res.send({
                success: true,
                message: 'Created New User.',
                user: {
                    eNum: user.eNum,
                    id: user._id,
                    email: user.email,
                    name: user.name,
                    team: user.team,
                    projects: user.projects
                }
            });
        });
    });
});

module.exports = router;