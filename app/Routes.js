'use strict';
module.exports = function(app) {
var labcategory = require('./LabCategory/Controller.js');
// var employee = require('LabCategory/Controller.js');
var labsubcategory = require('./LabSubCategory/Controller.js');
var labtest = require('./LabTest/Controller.js');
var employee = require('./Employee/Controller.js');
var partner = require('./Partner/Controller.js');



 // LabCategory Routes
  app.route('/labcategory')
    .get(labcategory.getAll)
 	  .post(labcategory.create)
    
 app.route('/labcategory/:id')
    .put(labcategory.update)
    .delete(labcategory.remove)
    .get(labcategory.getById)

 // LabSubCategory Routes
 app.route('/labsubcategory')
    .get(labsubcategory.getAll)
    .post(labsubcategory.create)
    
 app.route('/labsubcategory/:id')
    .put(labsubcategory.update)
    .delete(labsubcategory.remove)
    .get(labsubcategory.getById)

     // LabTests Routes
 app.route('/labtest')
    .get(labtest.getAll)
    .post(labtest.create)
    
 app.route('/labtest/:id')
    .put(labtest.update)
    .delete(labtest.remove)
    .get(labtest.getById)

     // Employee Routes
 app.route('/employee')
    .get(employee.getAll)
    .post(employee.create)
    
 app.route('/employee/:id')
    .put(employee.update)
    .delete(employee.remove)
    .get(employee.getById)

 app.route('/employee/auth')
    .post(employee.auth)
    

     // Employee Routes
 app.route('/partner')
    .get(partner.getAll)
    .post(partner.create)
    
 app.route('/partner/:id')
    .put(partner.update)
    .delete(partner.remove)
    .get(partner.getById)
  };

 