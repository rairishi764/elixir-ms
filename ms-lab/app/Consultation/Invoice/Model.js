'user strict';
var sql = require('../../db.js');
//Task object constructor
var modelObj = function(object){
    this.id = object.id;
    this.patient_id = object.patient_id;
    this.patient_name = object.patient_name;
    this.date = new Date();
    this.payment_mode = object.payment_mode;
    this.total_cost =object.total_amt;
    this.services = JSON.stringify(object.rows);
    this.due_amt = object.due_amt;
    this.discount_percent = object.discount_percent;
    this.discount_amt = object.discount_amt;
    this.advance = object.advance;
    this.patient_age=object.patient_age;
    this.patient_gender=object.patient_gender;
    this.patient_number=object.patient_number;
};
var tableName = "consultation_invoice";
modelObj.create = function create(newObj, result) {
        sql.query("INSERT INTO "+tableName+" set ?", newObj, function (err, res) {
                if(err) {
                    console.log("error: ", err);
                    //result(err, null);
                }
                else{
                     console.log(res);
                    console.log(res.insertId);
                    result(null, res.insertId);
                }
            });
};

modelObj.getAll = function getAll(result) {
        sql.query("SELECT * FROM "+tableName, function (err, res) {
                if(err) {
                    console.log("error: ", err);
                    result(err, null);
                }
                else{
                    result(null, res);
                }
            });
};

modelObj.getById = function getById(id, result) {
        sql.query("SELECT * FROM "+tableName+" where id = ?", [id], function (err, res) {
                if(err) {
                    console.log("error: ", err);
                    result(err, null);
                }
                else{
                    result(null, res);
                }
            });
};

modelObj.remove = function remove(id, result) {
        sql.query("DELETE FROM "+tableName+" where id = ?", [id], function (err, res) {

                if(err) {
                    console.log("error: ", err);
                    result(err, null);
                }
                else{
                    console.log("Deleted"+id)
                    console.log(res.id);
                    result(null, res.id);
                }
            });
};

modelObj.update = function update(id, updatedObj, result) {
 sql.query("UPDATE "+tableName+" SET due_amt=?, advance=? WHERE id = ?", [updatedObj.due_amt,updatedObj.advance, id], function (err, res) {
          if(err) {
              console.log("error: ", err);
                result(null, err);
             }
           else{
             result(null, res);
                }
            });
       };

module.exports = modelObj