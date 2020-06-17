'user strict';

var sql = require('../db.js');

//Task object constructor
var modelObj = function(object){
    this.id = object.lab_category_id;
    this.patient_id = object.lab_category_name;
    this.date = new Date();
    this.payment_mode = object.payment_mode;
    this.total_cost =object.total_cost;
};



modelObj.create = function create(newObj, result) {
        sql.query("INSERT INTO lab_category set ?", newObj, function (err, res) {

                if(err) {
                    console.log("error: ", err);
                    result(err, null);
                }
                else{
                     console.log(res);
                    console.log(res.insertId);
                    result(null, res.insertId);
                }
            });
};


modelObj.getAll = function getAll(result) {
        sql.query("SELECT * FROM lab_category", function (err, res) {
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
        sql.query("SELECT * FROM lab_category where lab_category_id = ?", [id], function (err, res) {
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
        sql.query("DELETE FROM lab_category where lab_category_id = ?", [id], function (err, res) {

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
 sql.query("UPDATE lab_category SET lab_category_name = ? WHERE lab_category_id = ?", [updatedObj, id], function (err, res) {
          if(err) {
              console.log("error: ", err);
                result(null, err);
             }
           else{
             result(null, res);
                }
            }); };

module.exports = modelObj