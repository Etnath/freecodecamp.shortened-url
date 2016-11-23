npm init
echo "node_modules" > .gitignore
git init
npm install express --save
echo "var express = require('express')
var port = process.env.PORT || 8080

var app = express()

app.get('/', function (req, res) 
{ 
    res.send('Hello World!')
})

app.listen(port, function () 
{  
    console.log('Example app listening on port ' + port + '!');

})" > server.js
git add .
git commit -m "initial commit"
git remote add origin $1
git push origin master