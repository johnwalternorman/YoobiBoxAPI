
/*

To run this script, you must install the following items.
*NodeJS
*ExpressJS
*body-parser (ExpressJS middleware)

For example on Linux it would be these steps from a command prompt type the following command:

sudo apt-get install nodejs (node is legacy, nodejs is current)

### Create a folder for your app and then navigate to inside of that folder from a command prompt, the type the following commands:

#This command prompts you for a number of things, such as the name and version of your application. For now, you can simply hit RETURN to accept the defaults for most of them, except for entry point, for that enter app.js:
npm init

entry point: (app.js)

npm install express --save

npm install body-parser

### You are now ready to start the app by typing the following at a command prompt

nodejs app.js

### now go to http://localhost:8000 in your browser

*/


//### Dependendcies
var express = require("express");
var bodyParser = require("body-parser");
var app = express();

//### Use BodyParsers
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//### Directory Path
var directoryPath = __dirname + "/";

//### Begin Routes ####

//[Route: /] example: http://localhost:8000
app.get('/',function(request,response){
  console.log(directoryPath + " ###");
  response.sendFile(directoryPath + "index.html");
});

//[Route: /tests/postreviewtest] example: http://localhost:8000/tests/postreviewtest
app.get('/tests/postreviewtest',function(request,response){
  response.sendFile(directoryPath + "tests/postreviewtest.html");
});

//[Route: /postreview] example: http://localhost:8000/postreview
// Example Test using POSTMAN:  
// Method = POST, URL = http://localhost:8000/postreview, Body = Raw, data to submit = {"product": "Put a product name here","review": "put product review here"}
// Content-type = JSON(application/json)
app.post('/postreview',function(request,response)
{
  
  //### Store request body, less typing
  var postData = request.body;

  //### Get posted data values
  var product=postData.product;
  var review=postData.review;

  //### Write posted values to the console
  console.log(product + " : " + review);

  //### Set HTTP Response Code (200 = ok, 404 = file not found, 500 = error)
  response.statusCode = 200; 

  //### send posted data back to the sender, This is not neccessary, just for now nothing else to send them 
  //except for maybe a status message.  JSON.stringify is used to ensure postData is in string format
  response.end(JSON.stringify(postData));

  //### Complete response
  //response.end();

});

//### End Routes ####

//### Start Application on port 8000
app.listen(8000,function()
{

  //### Log that the Application has started
  console.log("Started on PORT 8000");

})