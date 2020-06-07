'user strict';

var sql = require('../db.js');
var tableName="consultant"
//Task object constructor
var modelObj = function(obj){
    this.name = obj.name;
    this.qualification = obj.qualification;
    this.medical_id = obj.medical_id;
    this.phone = obj.phone;
    this.address = obj.address;
    this.records = obj.records;
    this.dob = obj.dob;
};

modelObj.create = function create(newObj, result) {    
        sql.query("INSERT INTO "+tableName+" set ?", newObj, function (err, res) {
                
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
 sql.query("UPDATE "+tableName+" SET ? WHERE id = ?", [updatedObj, id], function (err, res) {
          if(err) {
              console.log("error: ", err);
                result(null, err);
             }
           else{   
             result(null, res);
                }
            }); };

module.exports = modelObj