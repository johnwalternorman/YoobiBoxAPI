
app.config(function($routeProvider){
    
    /*var url = window.location.href;
    var args = url.split('#').pop().split('=').pop();
    var cf = function(args2){
        var args2 = args2.replace("/","");
        args2 = args2.replace("xx","");
        alert(args);
        alert(args2);
        var c = {controller: args2 + "Controller",
        templateUrl : "views/" + args2 + ".html"};
        return c;
    };

    var fourohfour = function(args3)
    {
        alert(args3);
        var c = {template:"YO"};
        return c;
    };
    alert( window.location.href);
    */

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
    .when('/submitreview', {
             controller: "CUDReviewController",
             templateUrl : "views/reviews/submitReview.html"
    })
     .when('/createcategory', {
             controller: "CUDReviewController",
             templateUrl : "views/reviews/createCategory.html"
    })
     .when('/createsubcategory', {
             controller: "CUDReviewController",
             templateUrl : "views/reviews/createsubcategor.html"
    })
     .when('/createProduct', {
             controller: "CUDReviewController",
             templateUrl : "views/reviews/login.html"
    })
    //.when(args, cf(args));
    .otherwise({
        controller: "404",
        templateUrl: "views/errors/404.html"
    });
});
