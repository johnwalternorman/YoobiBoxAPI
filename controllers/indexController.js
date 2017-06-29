app.controller('indexController', function($scope) {
    $scope.firstName = "Yo";
    $scope.lastName = "What Up";
    $scope.fullName = function() {
        return $scope.firstName + " " + $scope.lastName;
    };
});
