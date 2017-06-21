        
                function testFunctions()
                {

                }
        
                testFunctions.prototype.categoryCallBack = function(action)
                {
                      //### Grab Values
                      var ProductCategory=$("#CproductCategory").val();

                      //### Post values as JSON to /postreview endpoint
                      $.post("/" + action + "?collection=categories",{"ProductCategory":ProductCategory},function(data)
                      {
                        //### Display Data in the returned data div
                        $("#returnedData").html($("#returnedData").html() + data + "<br><br>");
                        $("#returnedData").show();
                      });
                 }

                testFunctions.prototype.subCategoryCallBack = function(action)
                {
                      //### Grab Values
                      var ProductCategory=$("#SCproductCategory").val();
                      var ProductSubCategory=$("#SCproductSubCategory").val();
                     
                      //### Post values as JSON to /postreview endpoint
                      $.post("/" + action + "?collection=subcategories",{"ProductCategory":ProductCategory,"ProductSubCategory":ProductSubCategory}, function(data)
                      {
                        //### Display Data in the returned data div
                        $("#returnedData").html($("#returnedData").html() + data + "<br><br>");
                        $("#returnedData").show();
                      });
                 }
                 
                testFunctions.prototype.productCallBack = function(action)
                {
                      //### Grab Values
                      var ProductCategory=$("#PproductCategory").val();
                      var ProductSubCategory=$("#PproductSubCategory").val();
                      var ProductName=$("#PproductName").val();
                      
                      //### Post values as JSON to /postreview endpoint
                      $.post("/" + action + "?collection=products",{"ProductCategory":ProductCategory,"ProductSubCategory":ProductSubCategory,"ProductName":ProductName}, function(data)
                      {
                        //### Display Data in the returned data div
                        $("#returnedData").html($("#returnedData").html() + data + "<br><br>");
                        $("#returnedData").show();
                      });
                 }

                testFunctions.prototype.reviewCallBack = function(action)
                {
                      //### Grab Values
                      var ProductCategory=$("#productCategory").val();
                      var ProductSubCategory=$("#productSubCategory").val();
                      var ProductName=$("#productName").val();
                      var ProductRating=$("#productRating").val();
                      var ProductReview=$("#productReview").val();
                      var UserName=$("#UserName").val();

                      //### Post values as JSON to /postreview endpoint
                      $.post("/" + action + "?collection=reviews",{"ProductCategory":ProductCategory,"ProductSubCategory":ProductSubCategory,"ProductName":ProductName,"ProductRating":ProductRating,"ProductReview":ProductReview,"UserName":UserName}, function(data)
                      {
                        //### Display Data in the returned data div
                        $("#returnedData").html($("#returnedData").html() + data + "<br><br>");
                        $("#returnedData").show();
                      });
                 }
,
                 testFunctions.prototype.readCallBack= function(action)
                  {
                      //### Grab Values
                      var Collection=$("#collection").val();
                      var Filter=JSON.parse($("#filter").val());
                      var URL = "http://localhost:8888/read?collection=" + Collection;
                      //### Post values as JSON to /postreview endpoint
                      $.post(URL,Filter, function(data)
                      {
                        //### Display Data in the returned data div
                        $("#returnedData").html($("#returnedData").html() + data + "<br><br>");
                        $("#returnedData").show();
                      });
                      $("#returnedData").focus();
                  }
        