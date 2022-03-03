const express = require('express')
const router = express.Router()
const axios = require('axios');
axios.defaults.baseURL = process.env.API_URL;

router.get('/employees', async (req, res) => {
    let data = [];

    try {
        let results = await axios.get('/hr/employee')

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
    let results = await axios.get('/hr/employee/' + req.params.id)
    res.render('list-employee', { employee: results.data } ) 
});

router.get('/insert-employee', async (req, res) => { 
    res.render('employee-form') 
});

router.post('/insert-employee', async (req, res) => {
    try {
        let response = await axios.post('/hr/employee', req.body)
        res.redirect('/employees/' + response.data)
    } catch (e) {
        res.locals.errormessage = "Failed to submit form"
        res.render('employee-form', req.body) 
    }
});

module.exports = router
