app.controller('loginController', function($scope) {
    $scope.usernamePlaceHolder = "Enter UserName";
    $scope.passwordPlaceHolder = "Enter Password";
    $scope.username = "";
    $scope.password = "";
    $scope.login = function() {
        if($scope.username.length == 0 || $scope.password.length == 0)
        {
          return "Enter your login credentials";
        }
        else
        {
          return $scope.username + " " + $scope.password;
        }
    };
});
