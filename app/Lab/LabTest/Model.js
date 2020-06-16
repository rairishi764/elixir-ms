'user strict';

var sql = require('../../db.js');

//Task object constructor
var modelObj = function(object){
    this.id = object.id;
    this.lab_sub_category_id = object.lab_sub_category_id;
    this.lab_partner_id = object.lab_partner_id;
    this.partner_share_type = object.partner_share_type;
    this.partner_share = object.partner_share;
    this.lab_test_cost = object.lab_test_cost;
    this.lab_testcode_id = object.lab_testcode_id;
    this.lab_test_name = object.lab_test_name;
    this.gst = object.gst;
    this.method = object.method;
    this.sample_volume_vaccutainer = object.sample_volume_vaccutainer;
    this.temp = object.temp;
    this.cut_off_time = object.cut_off_time;
    this.schd = object.schd;
    this.reporting = object.reporting;
    this.createdon = new Date();
};



modelObj.create = function create(newObj, result) {    
        sql.query("INSERT INTO lab_test set ?", newObj, function (err, res) {
                
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
        sql.query("SELECT * FROM lab_test", function (err, res) {                
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
        sql.query("SELECT * FROM lab_test where id = ?", [id], function (err, res) {
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
        sql.query("DELETE FROM lab_test where id = ?", [id], function (err, res) {
                
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
 sql.query("UPDATE lab_test SET lab_test_name = ? WHERE id = ?", [updatedObj, id], function (err, res) {
          if(err) {
              console.log("error: ", err);
                result(null, err);
             }
           else{   
             result(null, res);
                }
            }); };

module.exports = modelObj