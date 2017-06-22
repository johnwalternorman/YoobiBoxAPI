//### Directory Path
var directoryPath = __dirname + "/";

var MongoClient = require('mongodb').MongoClient
var assert = require('assert');


//### Constructor
function DLReviews(params)
{
    this.MongoURL = 'mongodb://localhost:27017/myproject';
}

//### Create is run as a callback from the preventDuplicates
DLReviews.prototype.preventDuplicates = function(query, collectionName, data, callback, response)
{

    //### Localize Parameters so they can be accessed in callbacks
    var localResponse = response;
    var localCollectionName = collectionName;
    var localData = data;
    var localQuery = query;
    var localURL = this.MongoURL;

    //### Use connect method to connect to the Server
    MongoClient.connect(localURL, function(err, db) 
    {
          //### Create Variables
          var collection;
          var currentCollectionName;
          var currentQuery;

          //loop through nest to ensure that required upstream data does exist and data to be inserted does not already exist before insert
          for(var x =0;x<=query.length-1;x++)
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
                      response.end(JSON.stringify({"status":"Error","message":'Item Already Exists'}));
                      return;
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
                      response.end(JSON.stringify({"status":"Error","message":'The Mandatory Upstream Data such as ProductCategory,ProductSubCategory, or ProductName does not exist. You can create the neccessary upstream data category/subcategory/productname by sending an object such as {"ProductCategory":"Movie"} using POST to /create?collection=categories or sending an object such as {"ProductCategory":"Movie","ProductSubCategory":"Sci-Fi"} using POST to /create?collection=subcategories or sending an object such as {"ProductCategory":"Movie","ProductSubCategory":"Action","ProductName":"Star Wars"} using post to /create?collection=products'}));
                    }
                  });
               }
            }
      });
};


//### This method is called as a call back from the preventDuplicates function passed in from the /create route
//### /create route -> preventDuplicates function -> runCreate Function
DLReviews.prototype.runCreate = function(data,collectionName,response,url)
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
                    localResponse.end(JSON.stringify({"status":"Success","message":document.insertedCount.toString() + " documents inserted"}));
                });
      });
};


DLReviews.prototype.runRead = function(query, collectionName, response)
{
    //### Use connect method to connect to the Server
    MongoClient.connect(this.MongoURL, function(err, db) 
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
                  response.end(JSON.stringify({"status":"Error","message":"No documents returned"}));
              }
          });
      });
};

DLReviews.prototype.runUpdate = function(filter, postData,collectionName,response)
{
    //### Use connect method to connect to the Server
    MongoClient.connect(this.MongoURL, function(err, db) 
    {
          //### localize Response Object
          var localResponse = response;
          var localCollectionName = collectionName;

          //### Connect to collection
          var collection = db.collection(localCollectionName);

          //### Execute Query for Documents
          collection.updateOne(filter,postData,function(err,results)
          {
              assert.equal(err, null);
              //### If there are documents, then send them back to the caller
              //### If there are results, let caller know there item was deleted
              if(results.matchedCount !=0)
              {
                  if(results.modifiedCount !=0)
                  {
                        //### Send Query Results to the caller
                        localResponse.statusCode = 200; 
                        //### Send Caller a Status Object
                        localResponse.end(JSON.stringify({"status":"Error","message":"Document updated"}));
                  }
                  else
                  {
                        //### Send Query Results to the caller
                        localResponse.statusCode = 200; 
                        //### Send Caller a Status Object
                        localResponse.end(JSON.stringify({"status":"Success","message":"Document was found but not updated"}));
                  }
              }
              else
              {
                  //### There were not documents found meeting the search criteria, send caller an error object letthing them know
                  localResponse.statusCode = 200;
                  localResponse.end(JSON.stringify({"status":"Error","message":"Document to update was not found"}));
              }
          });
      });
};

DLReviews.prototype.runDelete = function(filter, postData,collectionName,response)
{
      //### Use connect method to connect to the Server
    MongoClient.connect(this.MongoURL, function(err, db) 
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
                  localResponse.end(JSON.stringify({"status":"Success","message":"Document deleted"}));
              }
              else
              {
                  //### There were not documents found meeting the search criteria, send caller an error object letthing them know
                  localResponse.statusCode = 200;
                  localResponse.end(JSON.stringify({"status":"Error","message": "No document was deleted"}));
              }
          });
      });
};

//### Export Module
module.exports = DLReviews;

