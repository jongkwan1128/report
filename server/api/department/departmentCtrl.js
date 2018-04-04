const Department = require('../../models/Department');
const router = require('express').Router();

router.get('/list', function (req, res, next) {
    Department.find({}, (err, departmentList) => {
        if (err) {
            return res.send({
                success: false,
                message: 'Error: Server error.'
            });
        }

        return res.send({
            success: true,
            message: 'Get Department List.',
            departmentList: departmentList
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

    Department.findById(id, (err, department) => {
        if (err) {
            return res.send({
                success: false,
                message: 'Error: Server error.'
            });
        }

        return res.send({
            success: true,
            message: 'Get One Department.',
            department: {
                id: department._id,
                depNum: department.depNum,
                name: department.name,
                description: department.description,
                createdAt: department.createdAt
            }
        });
    });
});

router.post('/', function (req, res, next) {
    const { body } = req;
    const {
        depNum,
        name,
        description
    } = body;

    if (!depNum) {
        return res.send({
            success: false,
            message: 'Error: depNum cannot be blank.'
        });
    }
    if (!name) {
        return res.send({
            success: false,
            message: 'Error: name cannot be blank.'
        });
    }

    const newDepartment = new Department;
    newDepartment.depNum = depNum;
    newDepartment.name = name;
    newDepartment.description = description;
    newDepartment.save((err, department) => {
        if (err) {
            return res.send({
                success: false,
                message: 'Error: Server error.'
            });
        }
        return res.send({
            success: true,
            message: 'Create New Department!',
            department: {
                id: department._id,
                depNum: department.depNum,
                name: department.name,
                description: department.description,
                createdAt: department.createdAt
            }
        });
    });
});

router.put('/', function (req, res, next) {
    const { body } = req;
    const {
        id,
        depNum,
        name,
        description
    } = body;

    if (!depNum) {
        return res.send({
            success: false,
            message: 'Error: depNum cannot be blank.'
        });
    }
    if (!name) {
        return res.send({
            success: false,
            message: 'Error: name cannot be blank.'
        });
    }

    Department.findByIdAndUpdate(id, {
        depNum: depNum,
        name: name,
        description: description
    }, (err, department) => {
        if (err) {
            return res.send({
                success: false,
                message: 'Error: Server error.'
            });
        }

        return res.send({
            success: true,
            message: 'Update One Department.',
            department: {
                id: department._id,
                depNum: department.depNum,
                name: department.name,
                description: department.description,
                createdAt: department.createdAt
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
            message: 'Error: Project ID required.'
        });
    }

    Department.findByIdAndRemove(id, (err, department) => {
        if (err) {
            return res.send({
                success: false,
                message: 'Error: Server error.'
            });
        }

        return res.send({
            success: true,
            message: 'The Project Removed.'
        });
    });
});

module.exports = router;