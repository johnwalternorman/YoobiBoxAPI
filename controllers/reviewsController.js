
//### Exampleresponse that will be returned from API call: 
//#### [{"_id":"594960a5e911d770882db375","ProductCategory":"Movie","ProductSubCategory":"Action","ProductName":"All about the Benjamins","ProductRating":10,"ProductReview":"Hillarious!!! Mike Epps has you laughing the entire time, All-Star cast, plus a cameo from Anthony Michael Hall ","UserName":"J"},{"_id":"594aa6c369ca2c22cf8e93f4","ProductCategory":"Movie","ProductSubCategory":"Dramedy","ProductName":"Dope","ProductRating":9,"ProductReview":"Great Movie, very original and a great soundtrack","UserName":"J"}]

var getColumnHeaders = function(tempColumns)
{
      //### Create Variables
      var columnHeaders = "";

      //### Filter out ID and UserName fields
      for(x =0;x<tempColumns.length;x++)
      {
          //### If field is not Id or UserName then add to columnHeaders array
          if(tempColumns[x] != "_id" && tempColumns[x] != "UserName")
          {
            //### If this is not the first item being add to the array then add the , seperator
            if(x != 0 && columnHeaders !="")
            {
              //### Add seperator to columnHeaders array
              columnHeaders = columnHeaders + ",";
            }
            //### Add value to columnHeaders array
            columnHeaders = columnHeaders + tempColumns[x] ;
          }
      }
      //### Add values and column headers to $scope
       //$scope.keys = columnHeaders.split(",");
       return columnHeaders.split(",");  
}

app.controller('reviewsController', function($scope, $http) 
{

            $scope.divFilter = "true";
            $scope.tableFilter = "true";
            $scope.tableFilterLabel = function()
            {
                $scope.tableFilter = "false";
            }
            $scope.divFilterLabel = function()
            {
                $scope.divFilter = "false";
            }

             $http.post("http://localhost:8888/read?collection=reviews", JSON.stringify({}), {headers: {'Content-Type': 'application/json'} })
            .then(function(response) 
            {
                //### Add Returned Data to the Scope
                $scope.data = response.data;
                //### Add Returned Keys for the Data to the Scope
                $scope.keys = Object.keys(response.data[0]);
                //### Use the getColumnHeaders function to explicitly filter out column headers, for now using a standard filter at the view level
                //$scope.keys = getColumnHeaders(Object.keys(response.data[0]));
            });

});
