var express = require('express');
var router = express.Router();
var _ = require('underscore');
var fs = require('fs');


var products = [];

var dataPath = 'data.json';

try {
    var stats = fs.statSync(dataPath);
    var dataString = fs.readFileSync(dataPath);
    products = JSON.parse(dataString);
} catch (e) {
    console.log('Data File Does Not Exist... Creating Empty File...');
    fs.writeFileSync(dataPath, JSON.stringify([]));
}


function lookupproduct(product_id) {
    return _.find(products, function(c) {
        return c.id == parseInt(product_id);
    });
}


router.get('/products', function(req, res, next) {
	    res.json(products);

});

router.route('/products/:product_id')
    .all(function(req, res, next){
        product_id = req.params.product_id;
        product = lookupproduct(product_id);
        next();
    })
    .get(function(req,res,next){
        res.json(product);
    })
    .post(function(req,res,next){
        res.send('Post for product ' + product_id);
    })
    .put(function(req,res,next){
        res.send('Put for product ' + product_id);
    })
    .delete(function(req,res,next){
        res.send('Delete for product ' + product_id);
    });

module.exports = router;
