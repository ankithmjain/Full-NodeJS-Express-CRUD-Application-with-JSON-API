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

function findMaxId() {
    return _.max(products, function(product) {
        return product.id;
    });
}



router.get('/', function(req, res, next) {
    res.render('list', {products: products});
});


router.post('/', function(req, res, next) {


    var new_prod_id = (findMaxId()).id + 1;
    var new_product = {
        id: new_prod_id,
        prod_name: req.body.prod_name,
        prod_sku: req.body.prod_sku,
        prod_type: req.body.prod_type,
        prod_price:req.body.prod_price,
        prod_color:req.body.prod_color
    };
    products.push(new_product);
    console.log(products);
    fs.writeFileSync(dataPath, JSON.stringify(products));

    res.redirect('/products/');

});


router.get('/add', function(req, res, next) {
    res.render('add', {product:{}});
});





router.route('/:product_id')
    .all(function(req, res, next){
        product_id = req.params.product_id;
        product = lookupproduct(product_id);
        next();
    })
    .get(function(req,res,next){
        res.render('edit', {product: product});
    })
    .post(function(req,res,next){
        res.send('Post for product ' + product_id);
    })
    .put(function(req,res,next){
       // res.send('PUT for product ' + product_id);
        product.prod_name = req.body.prod_name;
        product.prod_sku = req.body.prod_sku;
        product.prod_type = req.body.prod_type;
        product.prod_price = req.body.prod_price;
        product.prod_color = req.body.prod_color;

        fs.writeFileSync(dataPath, JSON.stringify(products));

        res.redirect('/products/');
    })
    .delete(function(req,res,next){
        for (var i = 0; i < products.length; i++) {
            if (products[i].id === parseInt(product_id)) {
                products.splice(i, 1);
            }
        }

        fs.writeFileSync(dataPath, JSON.stringify(products));
        res.send('Delete for product ' + product_id);
    });

module.exports = router;
