/**
 * Created by ADMIN on 4/27/2016.
 */
var express = require('express');
var router = express.Router();
var fs = require('fs');
var _ = require('underscore');


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

function lookupCustomer(customer_id) {
    return _.find(customers, function(c) {
        return c.id == parseInt(customer_id);
    });
}

function findMaxId() {
    return _.max(customers, function(customer) {
        return customer.id;
    });
}

router.post('/', function(req, res, next) {

    console.log(findMaxId());
    var new_customer_id = (findMaxId()).id + 1;
    var new_customer = {
        id: new_customer_id,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        phone: req.body.phone
    };
    customers.push(new_customer);
    console.log(customers);
    fs.writeFileSync(dataPath, JSON.stringify(customers));

    res.redirect('/customers/');


});



router.get('/', function(req, res, next) {
    res.render('listCust', {customers: customers});
});


router.get('/add', function(req, res, next) {
    res.render('addCust', {customer:{}});
});

router.route('/:customer_id')
    .all(function(req, res, next){
        customer_id = req.params.customer_id;
        customer = lookupCustomer(customer_id);
        next();
    })
    .get(function(req,res,next){
        res.render('editCust', {customer: customer});
    })
    .post(function(req,res,next){
        res.send('Post for customer ' + customer_id);
    })
    .put(function(req,res,next){

        customer.firstname = req.body.firstname;
        customer.lastname = req.body.lastname;
        customer.email = req.body.email;
        customer.phone = req.body.phone;

        fs.writeFileSync(dataPath, JSON.stringify(customers));

        res.redirect('/customers/');

    })
    .delete(function(req,res,next){

        for (var i = 0; i < customers.length; i++) {
            if (customers[i].id === parseInt(customer_id)) {
                customers.splice(i, 1);
            }
        }

        fs.writeFileSync(dataPath, JSON.stringify(customers));
        res.send('Delete for customer ' + customer_id);


    });

module.exports = router;