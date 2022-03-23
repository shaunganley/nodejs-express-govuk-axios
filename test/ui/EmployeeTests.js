/* eslint-env mocha */
/* global browser */
const webdriver = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const chromedriver = require('chromedriver');
const By = webdriver.By
chrome.setDefaultService(new chrome.ServiceBuilder(chromedriver.path).build());
var chai = require('chai');  
const expect = chai.expect;

describe('Employee test', () => {
    it('should allow employee to be created', async() => {
        var driver = new webdriver.Builder()
            .withCapabilities(webdriver.Capabilities.chrome())
            .build();

        // Home
        driver.get(process.env.UI_TEST_URL);
        await driver.findElement(By.id('add-employee-button')).click('#add-employee-button');
  
        // Create Employee
        await driver.findElement(By.id('fname')).sendKeys('UI');
        await driver.findElement(By.id('lname')).sendKeys('Tests');
        await driver.findElement(By.id('email')).sendKeys('testemail@email.com');
        await driver.findElement(By.id('address')).sendKeys('1 Home Street');
        await driver.findElement(By.id('address2')).sendKeys('Home Lane');
        await driver.findElement(By.id('city')).sendKeys('Belfast');
        await driver.findElement(By.id('county')).sendKeys('Antrim');
        await driver.findElement(By.id('postalCode')).sendKeys('BT9');
        await driver.findElement(By.id('country')).sendKeys('Norn Iron');
        await driver.findElement(By.id('phoneNo')).sendKeys('01234567890');
        await driver.findElement(By.id('bankNo')).sendKeys('12345678');
        await driver.findElement(By.id('nin')).sendKeys('AA1A11AA');
        await driver.findElement(By.id('salary')).sendKeys('30000');
        await driver.findElement(By.id('submit')).click('#submit');
  
        // Employee Details
        expect(await driver.findElement(By.id('name')).getText()).to.equal('UI Tests');

        await driver.quit();
    })

    /*
    UI Test Exercise 1

    Write an UI test for the add employee flow

    Try to create an employee with a salary of £10,000

    Expect 'Salary must be at least £20,000' error to be displayed

    This should pass without code changes
    */

    /*
    UI Test Exercise 2

    Write an UI test for the add employee flow

    Try to create an employee with a salary of ABC

    Expect 'Salary must be a number' error to be displayed

    This should pass without code changes
    */

    /*
    UI Test Exercise 3

    Write an UI test for view employee workflow

    Navigate from the homepage to the employee list

    Select view on an employee

    Expect the name on the view employee page to match the name from the link you've clicked
    */

    /*
    UI Test Exercise 4

    Write an UI test for view employee workflow

    Navigate directly to the view employee page with an invalid ID

    Expect 'Employee does not exist' error to be displayed
    */
  })