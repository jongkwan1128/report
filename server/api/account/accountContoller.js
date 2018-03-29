/**
 * Created by 김종관 on 2018-03-28.
 */
const User = require('../../models/User');
const UserSession = require('../../models/UserSession');
const router = require('express').Router();

router.post('/signup', function (req, res, next) {
	const { body } = req;
	const {
		eNumber,
		name,
		password
	} = body;
	let { email } = body;

	if (!eNumber) {
		return res.send({
			success: false,
			message: 'Error: eNumber cannot be blank.'
		});
	}
	if (!name) {
		return res.send({
			success: false,
			message: 'Error: name cannot be blank.'
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

		newUser.eNumber = eNumber;
		newUser.name = name;
		newUser.email = email;
		newUser.password = newUser.generateHash(password);
		newUser.save((err, user) => {
			if (err) {
				return res.send({
					success: false,
					message: 'Error: Server error.'
				});
			}
			return res.send({
				success: true,
				message: 'Signed up.'
			});
		});
	});
});

router.post('/signin', function (req, res, next) {
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
					eNumber: user.eNumber,
					name: user.name,
					email: user.email
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

router.get('/logout', function (req, res, next) {
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
            message: 'Good.'
        });
    });

	// UserSession.findOneAndUpdate({
	// 	_id: token,
	// 	isDeleted: false
	// }, {
	// 	$set: {
	// 		isDeleted: true
	// 	}
	// }, null, (err, session) => {
	// 	if (err) {
	// 		return res.send({
	// 			success: false,
	// 			message: 'Error: Server error.'
	// 		});
	// 	}
    //
	// 	return res.send({
	// 		success: true,
	// 		message: 'Good.'
	// 	});
	// });
});

module.exports = router;