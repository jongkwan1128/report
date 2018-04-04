const Team = require('../../models/Team');
const router = require('express').Router();

router.get('/list', function (req, res, next) {
    // Team.find({}, (err, teamList) => {
    //     if (err) {
    //         return res.send({
    //             success: false,
    //             message: 'Error: Server error.'
    //         });
    //     }
    //
    //     return res.send({
    //         success: true,
    //         message: 'Get Team List.',
    //         teamList: teamList
    //     });
    // });
    Team.find({}).populate('department').exec(function (err, teamList) {
        if (err) {
            return res.send({
                success: false,
                message: 'Error: Server error.'
            });
        }

        return res.send({
            success: true,
            message: 'Get Team List.',
            teamList: teamList
        });
    });
});

router.get('/', function (req, res, next) {
    const { query } = req;
    const { id } = query;

    if (!id) {
        return res.send({
            success: false,
            message: 'Error: ID is required.'
        });
    }

    // Team.findById(id, (err, team) => {
    //     if (err) {
    //         return res.send({
    //             success: false,
    //             message: 'Error: Server error.'
    //         });
    //     }
    //
    //     return res.send({
    //         success: true,
    //         message: 'Get One Department.',
    //         team: {
    //             id: team._id,
    //             department: team.department,
    //             teamNum: team.teamNum,
    //             name: team.name,
    //             description: team.description,
    //             createdAt: team.createdAt
    //         }
    //     });
    // });
    Team.find({_id: id}).populate('department').exec(function (err, team) {
        if (err) {
            return res.send({
                success: false,
                message: 'Error: Server error.'
            });
        }

        return res.send({
            success: true,
            message: 'Get One Department.',
            team: {
                id: team._id,
                department: team.department,
                teamNum: team.teamNum,
                name: team.name,
                description: team.description,
                createdAt: team.createdAt
            }
        });
    })
});

router.post('/', function (req, res, next) {
    const { body } = req;
    const {
        department,
        teamNum,
        name,
        description
    } = body;

    if (!department) {
        return res.send({
            success: false,
            message: 'Error: department cannot be blank.'
        });
    }
    if (!teamNum) {
        return res.send({
            success: false,
            message: 'Error: teamNum cannot be blank.'
        });
    }
    if (!name) {
        return res.send({
            success: false,
            message: 'Error: name cannot be blank.'
        });
    }

    const newTeam = new Team;
    newTeam.department = department;
    newTeam.teamNum = teamNum;
    newTeam.name = name;
    newTeam.description = description;
    newTeam.save((err, team) => {
        if (err) {
            return res.send({
                success: false,
                message: 'Error: Server error.'
            });
        }
        return res.send({
            success: true,
            message: 'Create New Team!',
            team: {
                id: team._id,
                department: team.department,
                teamNum: team.teamNum,
                name: team.name,
                description: team.description,
                createdAt: team.createdAt
            }
        });
    });
});

router.put('/', function (req, res, next) {
    const { body } = req;
    const {
        id,
        department,
        teamNum,
        name,
        description
    } = body;

    if (!department) {
        return res.send({
            success: false,
            message: 'Error: department cannot be blank.'
        });
    }
    if (!teamNum) {
        return res.send({
            success: false,
            message: 'Error: teamNum cannot be blank.'
        });
    }
    if (!name) {
        return res.send({
            success: false,
            message: 'Error: name cannot be blank.'
        });
    }

    Team.findByIdAndUpdate(id, {
        department: department,
        teamNum: teamNum,
        name: name,
        description: description
    }, (err, team) => {
        if (err) {
            return res.send({
                success: false,
                message: 'Error: Server error.'
            });
        }

        return res.send({
            success: true,
            message: 'Update One Team.',
            department: {
                id: team._id,
                department: team.department,
                teamNum: team.teamNum,
                name: team.name,
                description: team.description,
                createdAt: team.createdAt
            }
        });
    });
});

router.delete('/', function (req, res, next) {
    const { query } = req;
    const { id } = query;

    if (!id) {
        return res.send({
            success: false,
            message: 'Error: Team ID required.'
        });
    }

    Team.findByIdAndRemove(id, (err, team) => {
        if (err) {
            return res.send({
                success: false,
                message: 'Error: Server error.'
            });
        }

        return res.send({
            success: true,
            message: 'The Team Removed.'
        });
    });
});

module.exports = router;