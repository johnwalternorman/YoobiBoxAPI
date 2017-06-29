app.filter('capitalizeFirstLetter', function() {
    return function(x) {
      var theFirstLetter;
      var theRest = "";
      var theLength = "";

      theLength = x.length;
      if(x.length >=1)
      {
        theFirstLetter = x.substring(0,1);
        theFirstLetter = theFirstLetter.toUpperCase();
        if(x.length >=2)
        {
          theRest = x.substring(1,theLength);
          theRest = theRest.toLowerCase();
        }
      }
      return theFirstLetter + theRest;
    };
});

app.filter('ExcludeAdminFields', function() {
    return function(x) {
      if(x != "_id" && x != "UserName")
      {
        return x;
      }
    };
});

