'user strict';

var sql = require('../db.js');

//Task object constructor
var modelObj = function(obj){
    this.id = obj.id;
    this.name = obj.name;
    this.dob = obj.dob;
    this.phone = obj.phone;
    this.address = obj.address;
    this.marital_status = obj.marital_status;
    this.medical_history = obj.medical_history;
    this.access_type = obj.access_type;
    this.username = obj.username;
    this.pwd = obj.pwd;
    this.createdon = new Date();
    this.patient_gender = obj.patient_gender;
    this.patient_number = obj.patient_number;
    this.patient_age = obj.patient_age;
    this.access_type = 1;
};
var tableName = "patient";
modelObj.auth = function auth(newObj, result) {    
        console.log(newObj);
        sql.query("SELECT `username`, `pwd`, `access_type` FROM "+tableName+" WHERE (username=? and pwd=?)", [newObj.username,newObj.pwd], function (err, res) {
                if(err) {
                    console.log("error: ", err);
                    result(err, null);
                }
                else{
                     console.log(res);
                     if(res[0]!=null)
                        {console.log("Success");
                        result(null, res[0].access_type);
                        }
                    else{
                        console.log("Fail");
                        result(null, "Fail");
                        }
                }
            });           
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