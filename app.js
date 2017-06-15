const express = require('express')
const bodyParser = require("body-parser");
const app = express();


app.all('/test', function (req, res) {

  var GetName;
  var PostName;

  //GetName = req.query.firstname;
  PostName = req.body.lastname;
  res.send(PostName);

})

app.listen(8000, function () {
  console.log('Example app listening on port 8000!')
})
