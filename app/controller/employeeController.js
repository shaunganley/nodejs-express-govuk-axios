const express = require('express')
const router = express.Router()

// Add your routes here - above the module.exports line
const employeeDao = require('../dao/employeeDao')

router.get('/employees', async (req, res) => { 
    let results = await employeeDao.getEmployees()

    for (let i = 0; i < results.length; i++) {
        results[i].viewUrl = `<a href='employees/${results[i].employeeId}'>View</a>`
    }

    res.render('list-employees', { employees: results } ) 
});

router.get('/employees/:id', async (req, res) => { 
    let results = await employeeDao.getEmployeeById(req.params.id)
    res.render('list-employee', { employee: results[0] } ) 
});

router.get('/insert-employee', async (req, res) => { 
    res.render('employee-form') 
});

router.post('/insert-employee', async (req, res) => { 
    try {
        let id = await employeeDao.insertEmployee(req.body)
        res.redirect('/employees/' + id)
    } catch (e) {
        res.locals.errormessage = e.sqlMessage
        res.render('employee-form', req.body) 
    }
});

module.exports = router
