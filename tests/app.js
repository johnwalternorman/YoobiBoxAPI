
/*
### Example Test using POSTMAN ###
Method = POST,
URL = http://localhost:8000/create?collection=categories 
Body = Raw
data to submit = {"ProductCategory":"Movie"}
Content-type = JSON(application/json)
(Then chage the URL to http://localhost:8000/read?collection=categories and re-send the request to see the category you just created)
*/

//### Directory Path
var directoryPath = __dirname + "/";

//### Dependendcies
var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var BLReviews = require('./BLReviews.js');

//### Use BodyParsers
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

var objBLReviews = new BLReviews({},{});

//####################################### Begin Routes ##################################################

//### [Route: /] example: http://localhost:8000
app.get('/',function(request,response){
  console.log(directoryPath + " ###");
  response.sendFile(directoryPath + "index.html");
});

//### [Route: /tests/postreviewtest] example: http://localhost:8000/tests/postreviewtest
app.get('/tests/postreviewtest',function(request,response){
  response.sendFile(directoryPath + "tests/postreviewtest.html");
});

app.post('/create',function(request,response)
{
  objBLReviews.processCreate(request, response)
});

app.post('/read',function(request,response)
{
    objBLReviews.processRead(request, response);
});

app.post('/update',function(request,response)
{
    objBLReviews.processUpdateOrDelete(request, response, "update");
});

app.post('/delete',function(request,response)
{
     objBLReviews.processUpdateOrDelete(request, response, "delete");
});

//####################################### End Routes ##################################################


//### Start Application on port 8000
app.listen(8888,function()
{
  //### Log that the Application has started
  console.log("Started on PORT 8888");
});


