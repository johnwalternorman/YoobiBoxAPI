// Load the http module to create an http server.
var http = require('http');

// Configure our HTTP server to respond with Hello World to all requests.
var server = http.createServer(
    function (request, response)
 {
    response.setHeader("Content-Type", "text/html");
    response.statusCode = 200; 
    for(i in request)
    {
	response.write(i.toString() + " : ");
	response.write(request[i.toString()] + "<br><br>");    
    }
    response.end();
 }
);

// Listen on port 8000, IP defaults to 127.0.0.1
server.listen(8000);

// Put a friendly message on the terminal
console.log("Server running at http://127.0.0.1:8000/");

