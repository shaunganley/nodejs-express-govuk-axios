const express = require('express')
const router = express.Router()

const EmployeeService = require('../service/EmployeeService');
const EmployeeValidator = require('../validator/EmployeeValidator');

router.get('/employees', (req, res) => {
    let data = [];

    try {
        data = await EmployeeService.getEmployees()

        for (let i = 0; i < data.length; i++) {
            data[i].viewUrl = `<a href='employees/${data[i].employeeId}'>View</a>`
        }

    } catch (e) {
        console.error(e);
    }
    
    res.render('list-employees', { employees: data } ) 
});

router.get('/employees/:id', (req, res) => {     
    res.render('list-employee', { employee: await EmployeeService.getEmployee(req.params.id) } ) 
});

router.get('/insert-employee', (req, res) => { 
    res.render('employee-form') 
});

router.post('/insert-employee', (req, res) => {
    let error = EmployeeValidator.validateEmployee(req.body)

    console.log(error)

    if (error) {
        res.locals.errormessage = error
        return res.render('employee-form', req.body) 
    }

    try {        
        res.redirect('/employees/' + await EmployeeService.createEmployee(req.body))
    } catch (e) {
        res.locals.errormessage = "Failed to submit form"
        res.render('employee-form', req.body)
    }
});

module.exports = router
