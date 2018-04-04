const UserSession = require('../../models/UserSession');
const router = require('express').Router();

router.get('/', function (req, res, next) {
    const { query } = req;
    const { token } = query;

    UserSession.remove({
        _id: token,
    }, (err, session) => {
        if (err) {
            return res.send({
                success: false,
                message: 'Error: Server error.'
            });
        }

        return res.send({
            success: true,
            message: 'Logout.'
        });
    });
});

module.exports = router;