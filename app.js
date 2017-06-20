
/*

To run this script, you must install the following items.
*NodeJS
*ExpressJS
*body-parser (ExpressJS middleware)

For example on Linux it would be these steps from a command prompt type the following command:

sudo apt-get install nodejs (node is legacy, nodejs is current)

### Create a folder for your app and then navigate to inside of that folder from a command prompt, the type the following commands:

#This command prompts you for a number of things, such as the name and version of your application. For now, you can simply hit RETURN to accept the defaults for most of them, except for entry point, for that enter app.js:
npm init

entry point: (app.js)

npm install express --save

npm install body-parser

### You are now ready to start the app by typing the following at a command prompt

nodejs app.js

### now go to http://localhost:8000 in your browser

*/


//### Dependendcies
var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var MongoClient = require('mongodb').MongoClient
var assert = require('assert');

//### Use BodyParsers
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//### Directory Path
var directoryPath = __dirname + "/";

//### Connection URL
var url = 'mongodb://localhost:27017/myproject';

//### Insert Data Callback Method Wrapper
var CreateCB = function(data,collection,response,url){ runCreate(data,collection,response,url); }



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

//### [Route: /create] example: http://localhost:8000/create
//### Example Test using POSTMAN:  
//### Method = POST, URL = http://localhost:8000/create Body = Raw, data to submit = {"ProductCategory":"Movie","ProductSubCategory":"Action","ProductName":"Star Wars Rogue One","ProductRating":10,"ProductReview":"Awesome movie!!! Great Characters and Actors, nice to see Star Wars from more of an every day perspective"}
//### Content-type = JSON(application/json)

app.post('/create',function(request,response)
{
    processCreate(request, response)
});

app.post('/read',function(request,response)
{
    processRead(request, response);
});

app.post('/update',function(request,response)
{
    processUpdateOrDelete(request, response, "update");
});

app.post('/delete',function(request,response)
{
     processUpdateOrDelete(request, response, "delete");
});



//####################################### End Routes ##################################################


//####################################### Processing Functions ###########################################

function processCreate(request, response)
{
    //### Store request body, less typing
    var postData = request.body;

    //### Store query string, less typing
    var queryData = request.query;
    var dataItem = queryData.collection;

    //### create variables
    var query;
    var ProductCategory;
    var ProductSubCategory;
    var ProductName;
    var collection;
    var UserName;

    console.log(dataItem);
    
    switch(dataItem)
    {
      case "categories":
        //verify the product does not already exist.
        //### Get posted data values
        ProductCategory = postData.ProductCategory;

        collection = ["categories"];

        query = [{"ProductCategory":ProductCategory}];

        break;
      case "subcategories":
        //verify the product does not already exist.
        //### Get posted data values
        ProductCategory = postData.ProductCategory;
        ProductSubCategory = postData.ProductSubCategory;

        collection = ["categories","subcategories"];

        query = [{"ProductCategory":ProductCategory},{"ProductCategory":ProductCategory,"ProductSubCategory":ProductSubCategory}];

        break;
      case "products":
        //verify the product does not already exist.
        //### Get posted data values
        ProductCategory = postData.ProductCategory;
        ProductSubCategory = postData.ProductSubCategory;
        ProductName = postData.ProductName;

        collection = ["categories","subcategories","products"];

        query =[{"ProductCategory":ProductCategory},{"ProductCategory":ProductCategory,"ProductSubCategory":ProductSubCategory},{"ProductCategory":ProductCategory,"ProductSubCategory":ProductSubCategory,"ProductName":ProductName}];

        break;
      case "reviews":
        //verify the product does not already exist.
        //### Get posted data values
        ProductCategory = postData.ProductCategory;
        ProductSubCategory = postData.ProductSubCategory;
        ProductName = postData.ProductName;
        UserName = postData.UserName;

        collection = ["categories","subcategories","products","reviews"];

        query =[{"ProductCategory":ProductCategory},{"ProductCategory":ProductCategory,"ProductSubCategory":ProductSubCategory},{"ProductCategory":ProductCategory,"ProductSubCategory":ProductSubCategory,"ProductName":ProductName},{"ProductCategory":ProductCategory,"ProductSubCategory":ProductSubCategory,"ProductName":ProductName,"UserName":UserName}];

        break;
      default:
        break;
    }

    //### Call Verifcation and Insert function, the insert function is sent in as a call back using the runInsertCB paramater
    preventDuplicates(query,collection,postData,CreateCB,response);
}

function processRead(request,response)
{
  //### Store request body, less typing
  var postData = request.body;

  //### Store query string, less typing
  var queryData = request.query;

  //### Store collection name from querystring
  var collectionName = queryData.collection;

  //### Search for documents matching the passed in criteria
  runRead(postData,collectionName,response);
}

function processUpdateOrDelete(request, response, action)
{
    //### Store request body, less typing
    var postData = request.body;

    //### Store query string, less typing
    var queryData = request.query;

    //### Store collection name from querystring
    var collectionName = queryData.collection;

    //### Store Data from posted data so that a filter can be created
    var ProductCategory = postData.ProductCategory;
    var ProductSubCategory = postData.ProductSubCategory;
    var ProductName = postData.ProductName;

    //### Store UserName from querystring
    var UserName = postData.UserName;

    //### Create Filter
    var filter = {"ProductCategory":ProductCategory,"ProductSubCategory":ProductSubCategory,"ProductName":ProductName,"UserName":UserName};


    //### Send to appropriate action
    if(action == "delete")
    {
      //### Run Update
      runDelete(filter, postData, collectionName, response);
    }
    else
    {
      //### Run Delete
      runUpdate(filter, postData, collectionName, response);
    }
}



//####################################### End Processing Functions ###########################################



//####################################### Begin CRUD Functions ###########################################


//### Create is run as a callback from the preventDuplicates
function preventDuplicates(query, collectionName, data, callback, response)
{
    //### Use connect method to connect to the Server
    MongoClient.connect(url, function(err, db) 
    {
          //### Localize Parameters so they can be accessed in callbacks
          var localResponse = response;
          var localCollectionName = collectionName;
          var localData = data;
          var localQuery = query;
          var localURL = url;

          //### Create Variables
          var collection;
          var currentCollectionName;
          var currentQuery;

          //loop through nest to ensure that required upstream data does exist and data to be inserted does not already exist before insert
          for(var x =0;x<=localQuery.length-1;x++)
          {

              //### Instatiate Iteration Variables
              currentCollectionName = localCollectionName[x];
              currentQuery = localQuery[x];

              //### Connect to collection
              collection = db.collection(currentCollectionName);

              //### If the loop has made it to the last element, then all upstream data exists
              if(x == localQuery.length-1)
              {
                  //### Verify that data to be inserted does not already exists
                  collection.find(currentQuery).toArray(function(err, results) 
                  {
                    assert.equal(err, null);

                    //### If there are no documents returned, then it is safe to insert data
                    if(results.length ==0)
                    {
                      //### Call callback to insert the Data
                      callback(localData,currentCollectionName,localResponse,localURL);
                    }
                    //### The Data to be inserted already exists, so send back an error object letting the caller know
                    else
                    {
                      //### Set HTTP Response Code (200 = ok, 404 = file not found, 500 = error)
                      response.statusCode = 200;
                      response.end(JSON.stringify({'error':'Item Already Exists'}));
                    }
                  });
              }
              else
              {
                  //### Verify upstream data exists, if it does not, send back an error object letting the caller know
                  collection.find(currentQuery).toArray(function(err, results) 
                  {
                    assert.equal(err, null);
                    //### Upstream data does not exist
                    if(results.length ==0)
                    {
                      //### Set HTTP Response Code (200 = ok, 404 = file not found, 500 = error)
                      response.statusCode = 200; 
                      response.end(JSON.stringify({'error':JSON.stringify(currentQuery) + ' does not exist'}));
                    }
                  });
               }
            }
      });
}


//### This method is called as a call back from the preventDuplicates function passed in from the /create route
//### /create route -> preventDuplicates function -> runCreate Function
function runCreate(data,collectionName,response,url)
{
    //### Localize Response object for use in call back
    var localResponse = response;

    //### Use connect method to connect to the Server
    MongoClient.connect(url, function(err, db) 
    {
                //### Connect to Collection
                var collection = db.collection(collectionName);

                //### Insert a single document
                collection.insertOne(data, function(err, document) 
                {
                  assert.equal(null, err);
                  assert.equal(1, document.insertedCount);
                  db.close();
                //### Set HTTP Response Code (200 = ok, 404 = file not found, 500 = error)
                localResponse.statusCode = 200; 
                //### Send Caller a Documents Inserted object 
                localResponse.end(JSON.stringify({"status":document.insertedCount.toString() + " documents inserted"}));
                });
      });
}

function runRead(query, collectionName, response)
{
    //### Use connect method to connect to the Server
    MongoClient.connect(url, function(err, db) 
    {
          //### localize Response Object
          var scopedResponse = response;

          //### Connect to collection
          var collection = db.collection(collectionName);

          //### Execute Query for Documents
          collection.find(query).toArray(function(err, results) 
          {
              assert.equal(err, null);
              
              //### If there are documents, then send them back to the caller
              if(results.length !=0)
              {
                  //### Send Query Results to the caller
                  response.statusCode = 200; 
                  response.end(JSON.stringify(results));
              }
              else
              {
                  //### There were not documents found meeting the search criteria, send caller an error object letthing them know
                  response.statusCode = 200; 
                  response.end(JSON.stringify({'error':' No documents returned'}));
              }
          });
      });
}

function runUpdate(filter, postData,collectionName,response)
{
    //### Use connect method to connect to the Server
    MongoClient.connect(url, function(err, db) 
    {
          //### localize Response Object
          var localResponse = response;
          var localCollectionName = collectionName;

          //### Connect to collection
          var collection = db.collection(localCollectionName);

          //### Execute Query for Documents
          console.log("Filter: " + JSON.stringify(filter));
          console.log("PostData: " + JSON.stringify(postData));
          collection.update(filter,postData,function(err,results)
          {
               assert.equal(err, null);
              
              //### If there are documents, then send them back to the caller
              //### If there are results, let caller know there item was deleted
              if(results.length !=0)
              {
                  //### Send Query Results to the caller
                  localResponse.statusCode = 200; 
                  //### Send Caller a Status Object
                  localResponse.end(JSON.stringify({"status":"Document updated"}));
              }
              else
              {
                  //### There were not documents found meeting the search criteria, send caller an error object letthing them know
                  localResponse.statusCode = 200;
                  localResponse.end(JSON.stringify({'error':' No document was updated'}));
              }
          });
      });
}

function runDelete(filter, postData,collectionName,response)
{
      //### Use connect method to connect to the Server
    MongoClient.connect(url, function(err, db) 
    {
          //### localize Response Object
          var localResponse = response;

          //### Connect to collection
          var collection = db.collection(collectionName);

          //### Find and delete documents
          collection.findOneAndDelete(filter,function(err,results)
          {
               assert.equal(err, null);
              
              //### If there are results, let caller know there item was deleted
              if(results.length !=0)
              {
                  //### Send Query Results to the caller
                  localResponse.statusCode = 200; 
                  //### Send Caller a Status Object
                  localResponse.end(JSON.stringify({"status":"Document deleted"}));
              }
              else
              {
                  //### There were not documents found meeting the search criteria, send caller an error object letthing them know
                  localResponse.statusCode = 200;
                  localResponse.end(JSON.stringify({'error':' No document was deleted'}));
              }
          });
      });
}

//####################################### End CRUD Functions ###########################################

//### Start Application on port 8000
app.listen(8888,function()
{
  //### Log that the Application has started
  console.log("Started on PORT 8888");
});