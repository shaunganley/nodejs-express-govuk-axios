const axios = require('axios');
axios.defaults.baseURL = process.env.API_URL;

URL = '/hr/employee/'

module.exports.createEmployee = async function (employee) {
    const response = await axios.post(URL, employee)

    return response.data
}

module.exports.getEmployee = async function (id) {
    const response = await axios.get(URL + id)

    return response.data
}

module.exports.getEmployees = async function () {
    try {
        const response = await axios.get(URL)

        return response.data
    } catch (e) {
        return new Error('Could not get employees')
    }
}