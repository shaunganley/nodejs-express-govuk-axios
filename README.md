# nodejs-express-govuk-mysql

Database
---
1. Create an empty database
1. Run the following command from the base of your cloned directory to create the required database structure:
```
mysql --host=<localhost> --user=<your_username> --password=<your_password> <your_database_name> < employeesdb.sql
```

Properties file
---
1. Create a file in the `app` directory called 'dbconfig.json'
1. Add the following contents to the file:
```
{ 
    "connectionLimit": 10, 
    "host":     <database host>, 
    "user":     <username>,
    "password": <password>,
    "database": <database name>
}
```

How to start the nodejs-express-govuk-mysql application
---

1. Run `npm install` to build your application
1. Start application with `npm start`
1. To check that your application is running enter url `http://localhost:3000/employees`

