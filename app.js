
/*

### Example Test using POSTMAN ###
Method = POST,
URL = http://localhost:8888/create?collection=categories 
Body = Raw
data to submit = {"ProductCategory":"Movie"}
Content-type = JSON(application/json)
(Then chage the URL to http://localhost:8888/read?collection=categories and re-send the request to see the category you just created)

Full Review Object Example : {"ProductCategory":"Movie","ProductSubCategory":"Comedy","ProductName":"Some Funny Movie","ProductRating":10,"ProductReview":"Very Funny Movie","UserName":"J"}

*/

//### Directory Path
var directoryPath = __dirname + "/";

//### Dependendcies
var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var BLReviews = require(directoryPath + 'BusinessLayer/BLReviews.js');

//### Use BodyParsers
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

var objBLReviews = new BLReviews({},{});

//####################################### Begin Routes ##################################################

//############## Default Route
//### [Route: /] example: http://localhost:8888
app.get('/',function(request,response){
  response.sendFile(directoryPath + "index.html");
});

//################ Begin Test Routes ######################
//### [Route: /tests/postreviewtest] example: http://localhost:8888/tests/postreviewtest
app.get('/tests/postreviewtest',function(request,response){
  response.sendFile(directoryPath + "tests/postreviewtest.html");
});

app.get('/tests/automatedTest',function(request,response){
  response.sendFile(directoryPath + "tests/automatedTests.html");
});

app.get('/tests/testClass',function(request,response){
  response.sendFile(directoryPath + "tests/testClass.js");
});
//################ End Test Routes ######################

//################ Begin CRUD Routes ######################
app.post('/create',function(request,response)
{
  objBLReviews.processCreate(request, response)

 //### Creation Path : /create -> BLReviews.processCreate -> DLReviews.preventDuplicates - > DlReviews.runCreate(as callback from preventDuplicates)
});

app.post('/read',function(request,response)
{
    objBLReviews.processRead(request, response);

    //### Read Path : /read -> BLReviews.processRead -> DLReviews.runRead 
});

app.post('/update',function(request,response)
{
    objBLReviews.processUpdateOrDelete(request, response, "update");

    //### Update Path : /update -> BLReviews.processUpdateorDelete -> DLReviews.runUpdate 
});

app.post('/delete',function(request,response)
{
     objBLReviews.processUpdateOrDelete(request, response, "delete");

     //### Delete Path : /delete -> BLReviews.processUpdateorDelete -> DLReviews.runDelete 
});
//################ Begin CRUD Routes ######################

//####################################### End Routes ##################################################

//### Start Application on port 8000
app.listen(8888,function()
{
  //### Log that the Application has started
  console.log("Started on PORT 8888");
});

