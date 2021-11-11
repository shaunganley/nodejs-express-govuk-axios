const mysql = require('mysql'); 
const dbconfig = require('../dbconfig.json'); 
const util = require ('util');

const db = wrapDB(dbconfig)

function wrapDB (dbconfig) { 
    const pool = mysql.createPool(dbconfig) 
    return { 
        query(sql, args) { 
            return util.promisify( pool.query ) 
            .call(pool, sql, args) 
        }, 
        release () { 
            return util.promisify( pool.releaseConnection ) 
            .call( pool ) 
        } 
    } 
}

exports.getEmployees = async () => { 
    return await db.query( 
        "SELECT * FROM employee"
    ) 
}

exports.getEmployeeById = async (id) => { 
    return await db.query( 
        "SELECT * FROM employee where employeeId = " + id
    ) 
 }

exports.insertEmployee = async (employee) => { 
    let results = await db.query('INSERT INTO employee SET ?', employee) 
    return results.insertId; 
}