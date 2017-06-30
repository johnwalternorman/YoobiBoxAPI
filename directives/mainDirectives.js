
/*

Useful information, but not that important if you want to skip reading the rest of this comment.

For any of the directives below, you can use the replace option to replace the html used to call the
directive with the content the directive returns.  Without that option the html used to call the
directive remains as part of the document along with the content returned by the directive.

The replace option MUST be used with the comment option

*/

 app.directive("whatdirective", function() {
    return {
      /*
      Without a rectrict option as seen in the howdirective below, the default is EA:
        E = Element   example <howdirective></howdirective>
        A = Attribute   example <p howdirective></p>
      */
        template : "<h1>What Directive</h1>"
    };
});


app.directive("howdirective", function() {
   return {
        /*
        The restict option below, allows for the directive to be used as an:
          E = Element   example <howdirective></howdirective>
          A = Attribute   example <p howdirective></p>
          C = Class   example <p class="howdirective"></p>
          M = Comment   example <!-- directive: howdirective -->
        */

        restrict: "EACM",
        replace : true,
        template : "<h1>How Directive</h1>"
   };
});


app.directive("whydirective", function() {
   return {
        /*
        The restict option below, only allows for the directive to be used as an Element:
        */

        restrict: "E",
        template : "<h1>Why Directive</h1>"
   };
});

app.directive("reviewfilters", function() {
   return {
        /*
        The restict option below, only allows for the directive to be used as an Element:
        */
        restrict: "E",
        scope: false,
        templateUrl: '/directives/reviewFilters.html',
   };
});

app.directive("modalpopup", function() {
   return {
        /*
        The restict option below, only allows for the directive to be used as an Element:
        */
        //'./views/partials/navigation.html'

        restrict: "EACM",
        scope: 
        {
            modalbuttontext: '=',
            modalheadertext: '=',
            modalview: '=',
            modalfootertext: '=',
            modaldata: '='
        },
        templateUrl: '/directives/modal.html',
   };
});

app.directive("modalpopupparentscope", function() {
   return {
        /*
        The restict option below, only allows for the directive to be used as an Element:
        */
        //'./views/partials/navigation.html'

        restrict: "EACM",
        scope: false,
        templateUrl: '/directives/modal.html',
   };
});







 
