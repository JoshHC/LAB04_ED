var express = require('express');
var router = express.Router();

const mongoClient = require('mongodb').MongoClient
const url = 'mongodb://localhost:27017'
const dbName = 'Pizza-Database'

/* Get Pizzas */
router.get('/GetAll', function(req, res, next) {
    mongoClient.connect(url, { useNewUrlParser: true}, (err, client) => {
        if(err) return next(createError(500))
        const database = client.db(dbName)
        const collection = database.collection('Pizzas')
        collection.find().toArray(function(err, items) {

            res.status(200).json(items);
        });
    })
  });

/* Get One Pizza */
router.get('/GetwithName/:name', function(req, res, next) {
    var parametro = req.params.name;
    mongoClient.connect(url, { useNewUrlParser: true}, (err, client) => {
        if(err) return next(createError(500))
        const database = client.db(dbName)
        const collection = database.collection('Pizzas')
        collection.findOne({name: parametro}, function(err, result){
        if(err) return next(createError(500))
        res.status(200).json(result);
        });
    })
  });

/* Create new Pizza */
router.post('/', function(req, res, next) {
     mongoClient.connect(url, { useNewUrlParser: true}, (err, client) => {
         if(err) return next(createError(500))
         const database = client.db(dbName)
         const collection = database.collection('Pizzas')
         collection.insertOne(req.body, err => {
             if(err) return next(createError(500))
             res.status(201).end()
         })
     })
   });
 
 
 /* Update Pizza */
 router.put('/:name', function(req, res, next) {
    mongoClient.connect(url, { useNewUrlParser: true}, (err, client) => {
        if(err) return next(createError(500))
        const database = client.db(dbName)
        const collection = database.collection('Pizzas')
        var query = req.params.name;
        var newvalues = {
            "name": req.body.name,
            "description": req.body.description,
            "ingredients": req.body.ingredients,
            "bread_type": req.body.bread_type,
            "number_of_portions": req.body.number_of_portions,
            "extra_cheese": req.body.extra_cheese
        }
        collection.updateOne({"name": query},{$set: newvalues},{upsert: true},err => {
            if(err) return next(createError(500))
            res.status(201).end()
        })
    })
  });


/* Delete Pizza */
router.delete('/:name', function(req, res, next) {
    var parametro = req.params.name;
     mongoClient.connect(url, { useNewUrlParser: true}, (err, client) => {
         if(err) return next(createError(500))
         const database = client.db(dbName)
         const collection = database.collection('Pizzas')
         collection.deleteOne({name:parametro}, function(err,result) {
                if(err) return next(createError(500))
                res.status(201).end()
         })
     })
   });

module.exports = router;
