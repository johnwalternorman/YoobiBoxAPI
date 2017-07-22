app.controller('404', function($scope,$location,$window) {
    
     $scope.currentPath = getPath.currentPath();
     $scope.currentURL = $location.absUrl();

     $scope.getURLMessage = function() 
     {
        return $scope.currentURL;
     };
     
     $scope.getPathMessage = function()
     {
        return $scope.currentPath;
     };

     //### Page Not Found, send it to ExpressJS to handle on the server so a 404 http response code can be returned.
     //### Removing the # from the URL routes requests to the Server(ExpressJS) instead of Client(Angular)
     $window.location.href = currentURL.replace("#","");
});
