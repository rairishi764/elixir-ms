'user strict';

var sql = require('../db.js');

//Task object constructor
var modelObj = function(obj){
    this.id = obj.id;
    this.employee_type = obj.employee_type;
    this.name = obj.name;
    this.qualification = obj.qualification;
    this.phone = obj.phone;
    this.address = obj.address;
    this.records = obj.records;
    this.access_type = obj.access_type;
    this.dob = obj.dob;
    this.mail = obj.mail;
    this.reference = obj.reference;
    this.access_type= obj.access_type;
    this.marital_status = obj.marital_status;
    this.pwd = obj.pwd;
    this.createdon = new Date();
};
modelObj.auth = function auth(newObj, result) {    
        console.log(newObj);
        sql.query("SELECT `mail`, `pwd`, `access_type` FROM `employee` WHERE (mail=? and pwd=?)", [newObj.username,newObj.pwd], function (err, res) {
                if(err) {
                    console.log("error: ", err);
                    result(err, null);
                }
                else{
                     console.log(res);
                     if(res[0]!=null)
                        {
                        console.log("Success");
                        result(null, res[0].access_type);
                        }
                    else
                        {
                        console.log("Fail");
                        result(null, "Fail");
                        }
                }
            });           
};


modelObj.create = function create(newObj, result) {    
        sql.query("INSERT INTO employee set ?", newObj, function (err, res) {
                
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
        sql.query("SELECT * FROM employee", function (err, res) {                
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
        sql.query("SELECT * FROM employee where id = ?", [id], function (err, res) {
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
        sql.query("DELETE FROM employee where id = ?", [id], function (err, res) {
                
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
 sql.query("UPDATE employee SET ? WHERE id = ?", [updatedObj, id], function (err, res) {
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