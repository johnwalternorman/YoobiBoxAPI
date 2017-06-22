# YoobiBoxAPI
API to facilitate creating products/company pages and reviews for them. 

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
 
 ### now go to http://localhost:8888 in your browser
