const express = require('express')
const app = express()

var GetName;
var PostName;



app.post('/', function (req, res) {

  var GetName;
  var PostName;

  GetName = req.query.firstname;
  PostName = req.body.lastname;
  res.send(GetName + " " + PostName);

})

app.listen(8000, function () {
  console.log('Example app listening on port 8000!')
})
