'use strict';
module.exports = function(app) {
var labcategory = require('./LabCategory/Controller.js');
var consultant = require('./Consultant/Controller.js');
var labsubcategory = require('./LabSubCategory/Controller.js');
var labtest = require('./LabTest/Controller.js');
var employee = require('./Employee/Controller.js');
var partner = require('./Partner/Controller.js');

 // LabCategory Routes
  app.route('/api/labcategory')    //url path added to base url
    .get(labcategory.getAll)   // controllerobj.function()
 	  .post(labcategory.create)
    
 app.route('/api/labcategory/:id')
    .put(labcategory.update)
    .delete(labcategory.remove)
    .get(labcategory.getById)

 // LabSubCategory Routes
 app.route('/api/labsubcategory')
    .get(labsubcategory.getAll)
    .post(labsubcategory.create)


 app.route('/api/labsubcategory/:id')
    .put(labsubcategory.update)
    .delete(labsubcategory.remove)
    .get(labsubcategory.getById)

     // LabTests Routes
 app.route('/api/labtest')
    .get(labtest.getAll)
    .post(labtest.create)
    
 app.route('/api/labtest/:id')
    .put(labtest.update)
    .delete(labtest.remove)
    .get(labtest.getById)

     // Employee Routes
 app.route('/api/employee')
    .get(employee.getAll)
    .post(employee.create)
    
 app.route('/api/employee/:id')
    .put(employee.update)
    .delete(employee.remove)
    .get(employee.getById)

 app.route('/api/employee/auth')
    .post(employee.auth)

     // Partner Routes
 app.route('/api/partner')
    .get(partner.getAll)
    .post(partner.create)


 app.route('/api/partner/:id')
    .put(partner.update)
    .delete(partner.remove)
    .get(partner.getById)


      // Consultant Routes
  app.route('/api/consultant')
     .get(consultant.getAll)
     .post(consultant.create)

  app.route('/api/consultant/:id')
     .put(consultant.update)
     .delete(consultant.remove)
     .get(consultant.getById)


  };


