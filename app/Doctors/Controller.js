'use strict';

var obj = require('../Doctors/Model.js');

exports.getAll = function(req, res) {
  obj.getAll(function(err, obj) {
    console.log("List Is:"+obj)
    if (err)
      res.send(err);
      console.log('res111', obj);
    res.send(obj);
  });
};

exports.create = function(req, res) {
  var new_obj = new obj(req.body);
   if(new_obj!=null){
            res.status(400).send({ error:true, message: 'Please provide obj details properly.' });}   
   else{  
    obj.create(new_obj, function(err, obj) {   
      if (err)
        res.send(err);
      
      res.json(obj);
  });
}
};

exports.getById = function(req, res) {
  obj.getById(req.params.id, function(err, obj) {
    if (err)
      res.send(err);
    res.json(obj);
  });
};

exports.update = function(req, res) {
  var updated_obj= new obj(req.body)
  obj.update(req.params.id, updated_obj, function(err, obj) {
    if (err)
      res.send(err);
    res.json(obj);
  });
};

exports.remove = function(req, res) {
  obj.remove( req.params.id, function(err, categories) {
    if (err)
      res.send(err);
    
    res.json({ message: 'Entry successfully deleted' });
  });
};