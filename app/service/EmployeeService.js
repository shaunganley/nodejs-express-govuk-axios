const axios = require('axios');
axios.defaults.baseURL = process.env.API_URL;

URL = '/hr/employee/'

module.exports.createEmployee = async function (employee) {
    return axios.post(URL, employee)
}

module.exports.getEmployee = async function (id) {
    return axios.get(URL + id)
}

module.exports.getEmployees = async function () {
    return axios.get(URL)
}