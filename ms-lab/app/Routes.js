'use strict';
module.exports = function(app) {
var consultant = require('./Consultation/Consultant/Controller.js');
var employee = require('./Employee/Controller.js');
var labcategory = require('./Lab/LabCategory/Controller.js');
var labsubcategory = require('./Lab/LabSubCategory/Controller.js');
var labtest = require('./Lab/LabTest/Controller.js');
var partner = require('./Lab/Partner/Controller.js');
var patient = require('./Patient/Controller.js');
var labinvoice = require('./Lab/LabInvoice/Controller.js');
var partnerservice = require('./Lab/PartnerService/Controller.js');
var specialization = require('./Specialization/Controller.js');
var consultationservice = require('./ConsultationService/Controller.js');
var consultantservice = require('./Consultation/ConsultantService/Controller.js');
var consultationinvoice = require('./Consultation/Invoice/Controller.js');

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

    // Patient Routes
 app.route('/api/patient')
    .get(patient.getAll)
    .post(patient.create)

 app.route('/api/patient/:id')
    .put(patient.update)
    .delete(patient.remove)
    .get(patient.getById)

 app.route('/api/patient/auth')
    .post(patient.auth)

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

 app.route('/api/consultant/auth')
    .post(consultant.auth)


      // invoice Routes
  app.route('/api/labinvoice')
     .get(labinvoice.getAll)
     .post(labinvoice.create)

  app.route('/api/labinvoice/:id')
     .put(labinvoice.update)
     .delete(labinvoice.remove)
     .get(labinvoice.getById)


   // Partner Service Routes
    app.route('/api/partnerservice')    //url path added to base url
      .get(partnerservice.getAll)   // controllerobj.function()
   	  .post(partnerservice.create)

   app.route('/api/partnerservice/:id')
      .put(partnerservice.update)
      .delete(partnerservice.remove)
      .get(partnerservice.getById)

   // Specialization Routes
    app.route('/api/specialization')    //url path added to base url
      .get(specialization.getAll)   // controllerobj.function()
   	  .post(specialization.create)

   app.route('/api/specialization/:id')
      .put(specialization.update)
      .delete(specialization.remove)
      .get(specialization.getById)

   // Consultation Services Routes
    app.route('/api/consultantationservice')    //url path added to base url
    .get(consultationservice.getAll)   // controllerobj.function()
      .post(consultationservice.create)

 app.route('/api/consultantationservice/:id')
    .put(consultationservice.update)
    .delete(consultationservice.remove)
    .get(consultationservice.getById)

    // Consultant Services Routes
    app.route('/api/consultantservice')    //url path added to base url
    .get(consultantservice.getAll)   // controllerobj.function()
      .post(consultantservice.create)

 app.route('/api/consultantservice/:id')
    .put(consultantservice.update)
    .delete(consultantservice.remove)
    .get(consultantservice.getById)


    // Consultant Services Routes
app.route('/api/consultationinvoice')    //url path added to base url
    .get(consultationinvoice.getAll)   // controllerobj.function()
   .post(consultationinvoice.create)

   app.route('/api/consultationinvoice/:id')
    .put(consultationinvoice.update)
    .delete(consultationinvoice.remove)
    .get(consultationinvoice.getById)


  };


