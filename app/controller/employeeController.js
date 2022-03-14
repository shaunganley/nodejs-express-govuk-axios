const express = require('express')
const router = express.Router()

const EmployeeService = require('../service/EmployeeService');
const EmployeeValidator = require('../validator/EmployeeValidator');

router.get('/employees', async (req, res) => {
    let data = [];

    try {
        let results = await EmployeeService.getEmployees()

        data = results.data

        for (let i = 0; i < data.length; i++) {
            data[i].viewUrl = `<a href='employees/${data[i].employeeId}'>View</a>`
        }

    } catch (e) {
        console.error(e);
    }
    
    res.render('list-employees', { employees: data } ) 
});

router.get('/employees/:id', async (req, res) => { 
    let results = await EmployeeService.getEmployee(req.params.id)
    
    res.render('list-employee', { employee: results.data } ) 
});

router.get('/insert-employee', async (req, res) => { 
    res.render('employee-form') 
});

router.post('/insert-employee', async (req, res) => {
    let error = EmployeeValidator.validateEmployee(req.body)

    console.log(error)

    if (error) {
        res.locals.errormessage = error
        return res.render('employee-form', req.body) 
    }

    try {
        let response = await EmployeeService.createEmployee(req.body)
        
        res.redirect('/employees/' + response.data)
    } catch (e) {
        res.locals.errormessage = "Failed to submit form"
        res.render('employee-form', req.body)
    }
});

module.exports = router
