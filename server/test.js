var express = require('express')
var app = express()

var db = require('mongoskin').db('mongodb://nodeIO:ioGrow.nodeJS@130.211.172.237:27017/test_database',{safe:true});
app.get('/', function (req, res) {
	console.log('i will search for');
	console.log(req['query']['query']);
	db.collection('posts').find({
    "$text": {
      "$search": req['query']['query']
    }
  },{},{limit:3}).toArray(function(err, result) {
	  if (err) throw err;
	  res.send(result)
	});
  	// res.send('Hello World!')
})

var server = app.listen(3000, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)

})
