app.controller('addCategoryController', function($scope, $http) 
{
    $scope.cool = "What";
    
    $scope.postCategory = function()
    {
            alert("adding Category");
            var newCategory ={ProductCategory: $scope.txtCategory};
            alert(JSON.stringify(newCategory));
            $http.post("http://localhost:8888/create?collection=categories", JSON.stringify(newCategory), {headers: {'Content-Type': 'application/json'} })
            .then(function(response) 
            {
                //### Add Returned Data to the Scope
                $scope.data = response.data;
                $scope.datax = response.data;
                //### Add Returned Keys for the Data to the Scope
                $scope.keys = Object.keys(response.data[0]);
                //### Use the getColumnHeaders function to explicitly filter out column headers, for now using a standard filter at the view level
                //$scope.keys = getColumnHeaders(Object.keys(response.data[0]));
                $scope.cool = response.data;
            });
    }
});