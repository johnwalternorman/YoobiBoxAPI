app.controller('addReviewController', function($scope, $http) 
{
    $scope.postReview = function()
    {
            //### For now, I have hardcoded a UserName in the Review Object

            var newCategory ={ProductCategory: $scope.txtCategory};
            console.log(JSON.stringify(newCategory));
            var newSubCategory ={ProductCategory: $scope.txtCategory,ProductSubCategory: $scope.txtSubCategory};
            console.log(JSON.stringify(newSubCategory));
            var newProduct ={ProductCategory: $scope.txtCategory,ProductSubCategory: $scope.txtSubCategory,ProductName: $scope.txtProductName};
            console.log(JSON.stringify(newProduct));
            var newReview={ProductCategory: $scope.txtCategory,ProductSubCategory: $scope.txtSubCategory,ProductName: $scope.txtProductName,ProductRating:$scope.txtProductRating,ProductReview:$scope.txtProductReview,UserName:"J"};
            //### For debugging purposes, removing the UserName
            var newReviewWithoutUserName={ProductCategory: $scope.txtCategory,ProductSubCategory: $scope.txtSubCategory,ProductName: $scope.txtProductName,ProductRating:$scope.txtProductRating,ProductReview:$scope.txtProductReview};
            console.log(JSON.stringify(newReviewWithoutUserName));

            //### Post Category
              $http.post("http://localhost:8888/create?collection=categories", JSON.stringify(newCategory), {headers: {'Content-Type': 'application/json'} })
            .then(function(response) 
            {

            });
            //### Post Sub-Category
              $http.post("http://localhost:8888/create?collection=subcategories", JSON.stringify(newSubCategory), {headers: {'Content-Type': 'application/json'} })
            .then(function(response) 
            {

            });
            //### Post Product
              $http.post("http://localhost:8888/create?collection=products", JSON.stringify(newProduct), {headers: {'Content-Type': 'application/json'} })
            .then(function(response) 
            {
        
            });
            //### Post Review
            $http.post("http://localhost:8888/create?collection=reviews", JSON.stringify(newReview), {headers: {'Content-Type': 'application/json'} })
            .then(function(response) 
            {
                //### Add Returned Data to the Scope
                $scope.keys = response.data;
                //### Add Returned Keys for the Data to the Scope
                $scope.keys = Object.keys(response.data[0]);

                //### Format Response Message for Display
                $scope.data = "Result: " + JSON.stringify(response.data);
                
                //### Use the getColumnHeaders function to explicitly filter out column headers, for now using a standard filter at the view level
                //$scope.keys = getColumnHeaders(Object.keys(response.data[0]));
            });
    }
});