
app.config(function($routeProvider){

    $routeProvider
    .when(" ", {
      //This is the default view and controller
      //example: http://localhost:8000/#

        controller: "indexController",
        templateUrl : "views/standard/main.html"
    })
    .when("/", {
      //This is the default view and controller
      //example: http://localhost:8000/#/

        controller: "indexController",
        templateUrl : "views/standard/main.html"
    })
    .when('/standard:name', {
        /*  This allows you to call a generic Controller for
            any page by prefixing the url with page,
            for example:  http://localhost:8000/#/page:whatwedo
        */

            controller:'standardController',
            templateUrl: function(urlattr)
            {
              var parameterName;
              parameterName = urlattr.name;
              parameterName =  parameterName.replace(":","");
              //alert(templateName);
              return 'views/standard/' + parameterName + '.html';
            }
    })
    .when('/content:name', {
        /*  This allows you to call a generic Controller for
            any page by prefixing the url with content,
            for example:  http://localhost:8000/#/content:about
        */
            controller:'contentController',
            templateUrl: function(urlattr)
            {
              var parameterName;
              parameterName = urlattr.name;
              parameterName = parameterName.replace(":","");
              //alert(templateName);
              return 'views/purecontent/' + parameterName + '.html';
            }
    })
    .when('/reviews', {
             controller: "reviewsController",
             templateUrl : "views/reviews/reviews.html"
    })
    .when('/reviewstable', {
             controller: "reviewsController",
             templateUrl : "views/reviews/reviewstable.html"
    })
    .when('/login', {
             controller: "loginController",
             templateUrl : "views/standard/login.html"
    })
    .otherwise({
        controller: "404",
        templateUrl: "views/errors/404.html"
    });
});
