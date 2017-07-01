
//### Exampleresponse that will be returned from API call: 
//#### [{"_id":"594960a5e911d770882db375","ProductCategory":"Movie","ProductSubCategory":"Action","ProductName":"All about the Benjamins","ProductRating":10,"ProductReview":"Hillarious!!! Mike Epps has you laughing the entire time, All-Star cast, plus a cameo from Anthony Michael Hall ","UserName":"J"},{"_id":"594aa6c369ca2c22cf8e93f4","ProductCategory":"Movie","ProductSubCategory":"Dramedy","ProductName":"Dope","ProductRating":9,"ProductReview":"Great Movie, very original and a great soundtrack","UserName":"J"}]

var getColumnHeaders = function(tempColumns)
{
      //### Create Variables
      var columnHeaders = "";

      $scope.updateReady = false;

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

            var refreshData = function()
            {
                $http.post("/read?collection=reviews", JSON.stringify({}), {headers: {'Content-Type': 'application/json'} })
                .then(function(response) 
                {
                    //### Add Returned Data to the Scope
                    $scope.data = response.data;
                    //### Add Returned Keys for the Data to the Scope
                    $scope.keys = Object.keys(response.data[0]);
                    //### Use the getColumnHeaders function to explicitly filter out column headers, for now using a standard filter at the view level
                    //$scope.keys = getColumnHeaders(Object.keys(response.data[0]));
                });
            }

             //### Initialze Variable for Modal Directive
            $scope.modalbuttontext = "create a review";
            $scope.modalheadertext = "Post A Review";
            $scope.modalview = "/views/reviews/addReview.html";
            $scope.modalfootertext = "footer";
            $scope.modaldata = "data";

            //### Initial pull of data
            refreshData();

            $scope.prepareUpdate = function(documentId)
            {
                 $scope.updateReady = true;
                 $scope.updateId = documentId;
                 var documentToUpdate = $scope.data[documentId];
                 $scope.txtCategory = documentToUpdate.ProductCategory;
                 $scope.txtSubCategory = documentToUpdate.ProductSubCategory;
                 $scope.txtProductName = documentToUpdate.ProductName;
                 $scope.txtProductRating = documentToUpdate.ProductRating;
                 $scope.txtProductReview = documentToUpdate.ProductReview;
            }

            $scope.cancelUpdate = function()
            {
                 $scope.updateReady = false;
                 $scope.updateId = "";
                 $scope.txtCategory = "";
                 $scope.txtSubCategory = "";
                 $scope.txtProductName = "";
                 $scope.txtProductRating = "";
                 $scope.txtProductReview = "";
            }

            $scope.deleteOrUpdateDocument = function(documentId,action)
            {
                
                var documentToDelete = $scope.data[documentId];
                var updateOrDeleteFilter={ProductCategory: documentToDelete.ProductCategory,ProductSubCategory: documentToDelete.ProductSubCategory,ProductName: documentToDelete.ProductName,ProductRating:$scope.txtProductRating,ProductReview:$scope.txtProductReview,UserName:"J"};

                $http.post("/"+ action +"?collection=reviews", JSON.stringify(updateOrDeleteFilter), {headers: {'Content-Type': 'application/json'} })
                .then(function(response) 
                {
                    //### Add Returned Status to the Scope
                    $scope.status = response.data;
                });
                refreshData();
            }

            $scope.postReview = function()
            {
                if($scope.updateReady == true)
                {
                    $scope.updateReady = false;
                    $scope.deleteOrUpdateDocument($scope.updateId,"update");
                    $scope.updateId ="";
                    refreshData();
                    $scope.cancelUpdate();
                }
                else
                {
                    //### For now, I have hardcoded a UserName in the Review Object
                    var newCategory ={ProductCategory:$scope.txtCategory};
                    console.log(JSON.stringify(newCategory));
                    var newSubCategory ={ProductCategory: $scope.txtCategory,ProductSubCategory: $scope.txtSubCategory};
                    console.log(JSON.stringify(newSubCategory));
                    var newProduct ={ProductCategory: $scope.txtCategory,ProductSubCategory: $scope.txtSubCategory,ProductName: $scope.txtProductName};
                    console.log("np" + JSON.stringify(newProduct));
                    var newReview={ProductCategory: $scope.txtCategory,ProductSubCategory: $scope.txtSubCategory,ProductName:$scope.txtProductName,ProductRating:$scope.txtProductRating,ProductReview:$scope.txtProductReview,UserName:"J"};
                    //### For debugging purposes, removing the UserName
                    var newReviewWithoutUserName={ProductCategory:$scope.txtCategory,ProductSubCategory:$scope.txtSubCategory,ProductName: $scope.txtProductName,ProductRating:$scope.txtProductRating,ProductReview:$scope.txtProductReview};
                    console.log("npwun" + JSON.stringify(newReviewWithoutUserName));

                    //### Post Category
                    $http.post("/create?collection=categories", JSON.stringify(newCategory), {headers: {'Content-Type': 'application/json'} })
                    .then(function(response) 
                    {
                        console.log(JSON.stringify(newSubCategory));
                        //### Post Sub-Category
                        $http.post("/create?collection=subcategories", JSON.stringify(newSubCategory), {headers: {'Content-Type': 'application/json'} })
                        .then(function(response) 
                        {
                            console.log(JSON.stringify(newProduct));
                            //### Post Product
                            $http.post("/create?collection=products", JSON.stringify(newProduct), {headers: {'Content-Type': 'application/json'} })
                            .then(function(response) 
                            {
                                console.log(JSON.stringify(newReview));
                                //### Post Review
                                $http.post("/create?collection=reviews", JSON.stringify(newReview), {headers: {'Content-Type': 'application/json'} })
                                .then(function(response) 
                                {
                                console.log(JSON.stringify({}));
                                    //### Add Returned Data to the Scope
                                    $scope.responseData = response.data;
                                    refreshData();
                                });
                            });
                        });
                    });              
                }
            }
});
