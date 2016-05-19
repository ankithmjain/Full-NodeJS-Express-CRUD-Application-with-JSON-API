/**
 * Created by ADMIN on 4/27/2016.
 */
var express = require('express');
var router = express.Router();
var _ = require('underscore');
var fs = require('fs');


var customers = [];

var dataPath = 'data2.json';

try {
    var stats = fs.statSync(dataPath);
    var dataString = fs.readFileSync(dataPath);
    customers = JSON.parse(dataString);
} catch (e) {
    console.log('Data File Does Not Exist... Creating Empty File...');
    fs.writeFileSync(dataPath, JSON.stringify([]));
}


function lookupcustomer(customer_id) {
    return _.find(customers, function(c) {
        return c.id == parseInt(customer_id);
    });
}


router.get('/customers', function(req, res, next) {
    res.json(customers);

});

router.route('/customers/:customer_id')
    .all(function(req, res, next){
        customer_id = req.params.customer_id;
        customer = lookupcustomer(customer_id);
        next();
    })
    .get(function(req,res,next){
        res.json(customer);
    })
    .post(function(req,res,next){
        res.send('Post for customer ' + customer_id);
    })
    .put(function(req,res,next){
        res.send('Put for customer ' + customer_id);
    })
    .delete(function(req,res,next){
        res.send('Delete for customer ' + customer_id);
    });

module.exports = router;
