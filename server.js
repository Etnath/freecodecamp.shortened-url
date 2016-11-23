var express = require('express');
var mongo = require('mongodb').MongoClient;
var port = process.env.PORT || 8080;

var dbUrl = 'mongodb://localhost:27017/shortenedurl';
var app = express();

app.get('/new/:urlArg*', function (req, res) 
{ 
    var id = insertUrlToDb(req.params.urlArg + req.params[0]);
    var shortenedAddress = req.get('host') + id;
    var responseObject = 
    {
        "original_url": req.params.urlArg,
        "short_url": shortenedAddress
    };
    res.send(JSON.stringify(responseObject));
});

app.get('/:id', function (req, res) 
{ 
    res.send('Hello World!')
});

app.listen(port, function () 
{  
    console.log('Example app listening on port ' + port + '!');

});

function insertUrlToDb(url)
{
    mongo.connect(dbUrl, function(err, db) 
    {
        if (err)
        {
            throw err;
        }
        var objectToInsert = {"url":url};
        db.collection('documents').insertOne(objectToInsert, function(err)
        {
            if (err)
            {
                throw err;
            }
            var id = objectToInsert._id;
            db.close();
            return id;
        });
    });
}

function getUrlFromDb(id)
{
    mongo.connect(dbUrl, function(err, db) 
    {
        if (err)
        {
            throw err;
        }
      
        var doc = db.collection('documents').find({_id: parseInt(id)}, {url:1, _id:0});
        db.close();
        return doc.url;
    });
}
