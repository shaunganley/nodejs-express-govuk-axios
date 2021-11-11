const express = require('express')
const router = express.Router()

// Add your routes here - above the module.exports line
const employeeDao = require('../dao/employeeDao')

router.get('/employees', async (req, res) => { 
    res.render('list-employees', { employees: await employeeDao.getEmployees() } ) 
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
