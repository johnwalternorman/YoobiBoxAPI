//### Directory Path
var directoryPath = __dirname + "/";

//### Dependencies
var DLReviews = require(directoryPath + '../DataLayer/DLReviews.js');

//### Constructor
function BLReviews(request,response)
{
    this.request = request;
    this.response = response;
    this.objDLReviews = new DLReviews({});
}

BLReviews.prototype.processCreate = function(request,response)
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

        //### Verify UserName is part of the post before continuing
        if(!UserName)
        {
          response.end(JSON.stringify({"error":"UserName must be part of the post"}))
        }

        collection = ["categories","subcategories","products","reviews"];

        query =[{"ProductCategory":ProductCategory},{"ProductCategory":ProductCategory,"ProductSubCategory":ProductSubCategory},{"ProductCategory":ProductCategory,"ProductSubCategory":ProductSubCategory,"ProductName":ProductName},{"ProductCategory":ProductCategory,"ProductSubCategory":ProductSubCategory,"ProductName":ProductName,"UserName":UserName}];

        break;
      default:
        break;
    }

    //### Call Verifcation and Insert function, the insert function is sent in as a call back using the runInsertCB paramater
    this.objDLReviews.preventDuplicates(query,collection,postData,this.objDLReviews.runCreate,response);
};

BLReviews.prototype.processRead = function(request,response)
{
  //### Store request body, less typing
  var postData = request.body;

  //### Store query string, less typing
  var queryData = request.query;

  //### Store collection name from querystring
  var collectionName = queryData.collection;

  //### Search for documents matching the passed in criteria
  this.objDLReviews.runRead(postData,collectionName,response);
};

BLReviews.prototype.processUpdateOrDelete = function(request,response,action)
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

    //### Verify UserName is part of the post before continuing
    if(!UserName)
    {
      response.end(JSON.stringify({"error":"UserName must be part of the post"}))
    }

    //### Create Filter
    var filter = {"ProductCategory":ProductCategory,"ProductSubCategory":ProductSubCategory,"ProductName":ProductName,"UserName":UserName};


    //### Send to appropriate action
    if(action == "delete")
    {
      //### Run Update
      this.objDLReviews.runDelete(filter, postData, collectionName, response);
    }
    else
    {
      //### Run Delete
      this.objDLReviews.runUpdate(filter, postData, collectionName, response);
    }
};

//### Export Module
module.exports = BLReviews;


