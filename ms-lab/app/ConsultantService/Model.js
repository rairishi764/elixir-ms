'user strict';
var sql = require('../db.js');
//Task object constructor
var modelObj = function(obj){
    this.id = obj.id;
    this.consultant_id = obj.name;
    this.consultant_service_id = obj.description;
    this.fee=obj.fee;
    this.consultant_share_type=obj.consultant_share_type;
    this.consultant_share=obj.consultant_share;
    this.createdon = new Date();
};
var table = "consultant_service";

modelObj.create = function create(newObj, result) {    
        sql.query("INSERT INTO "+table+" set ?", newObj, function (err, res) {
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
        sql.query("SELECT * FROM "+table, function (err, res) {
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
        sql.query("SELECT * FROM "+table+" where id = ?", [id], function (err, res) {
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
        sql.query("DELETE FROM "+table+" where id = ?", [id], function (err, res) {
                
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
 sql.query("UPDATE "+table+" SET ? WHERE id = ?", [updatedObj, id], function (err, res) {
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