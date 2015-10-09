var express = require('express');

var router = express.Router();
var ParserEngine = {};

var Twitter = require('node-twitter');


router.get('/details', function(req, res) {


		var Twitter = require('twitter');
 
		var client = new Twitter({
		  consumer_key: 'n4h3onsHHB6B9MdiPTbuU3zvf',
		  consumer_secret: 'Hugy2DD3kZXvAVg2MFXIL2506Rzk1qiRIPvGbuvnZVWkywxC2N',
		  access_token_key: '1157418127-VdrrfNdZi3hXs7GqSrRRHbplY2bZUqe388gFBQ2',
		  access_token_secret: 'LCmHESrWFKvhAmLM9FhO5CaN3V90n8O6W9EjAJT2va9B0'
		});

		var results={};
		var hashtags=[];
		var popular={};		
		var params = {screen_name: 'istanbulstartup',count: 5};
		client.get('statuses/user_timeline', params, function(error, tweets, response){
		  if (!error) {
		  	//get a picture
		  	results["profile_image"]=tweets[0]["user"]["profile_image_url_https"]

			for (var i=0, length=tweets.length; i<length; i++ ){
				popular[""+i]=tweets[i]["retweet_count"]+tweets[i]["favorite_count"]
				for ( var j=0, size=tweets[i]["entities"]["hashtags"].length; j<size; j++ ){
					hashtags.push(tweets[i]["entities"]["hashtags"][j]["text"])
					}			
			}
			//sort popular tweets:
			var sortable_popular=[];
			for (var vehicle in popular)
		      sortable_popular.push([vehicle, popular[vehicle]])
			sortable_popular.sort(function(a, b) {return a[1] - b[1]})
			sortable_popular=sortable_popular.reverse()
			results["popular_tweets"]=sortable_popular
			for (var ele in sortable_popular)
			{
				console.log(sortable_popular[ele][0]+"de")
				results["popular_tweets"].push(tweets[sortable_popular[ele][0]])
			}
			//count hashtags 
			hashtags_counted = {}
			hashtags.forEach(function(obj) {
			    var key =obj
			    hashtags_counted[key] = (hashtags_counted[key] || 0) + 1
			})
			//sort hashtags
			var sortable_hashtags = [];

			for (var vehicle in hashtags_counted)
			      sortable_hashtags.push([vehicle, hashtags_counted[vehicle]])
			sortable_hashtags.sort(function(a, b) {return a[1] - b[1]})
			results["popular_hashtags"]=sortable_hashtags.reverse()
			
			//Overview of profile
			

			res.json({ "results" :results});
		  }
		});


		//search on tweets
		// client.get('search/tweets', {q: 'Hadjadj'}, function(error, tweets, response){
		//    console.log("deee"+JSON.stringify(tweets));
		// });


		 // get tweets
		// var params = {screen_name: 'MezianeHadjadj',count: 3};
		// client.get('statuses/user_timeline', params, function(error, tweets, response){
		//   if (!error) {
		//   	console.log("jj"+JSON.stringify(tweets));
		//   }
		// });


		




	// var twitterSearchClient = new Twitter.SearchClient(
 //    'n4h3onsHHB6B9MdiPTbuU3zvf',
 //    'Hugy2DD3kZXvAVg2MFXIL2506Rzk1qiRIPvGbuvnZVWkywxC2N',
 //    '1157418127-VdrrfNdZi3hXs7GqSrRRHbplY2bZUqe388gFBQ2',
 //    'LCmHESrWFKvhAmLM9FhO5CaN3V90n8O6W9EjAJT2va9B0'
	// );
	// twitterSearchClient.search({'q': "MezianeHadjadj",'count':1}, function(error, result) {
	//     if (error)
	//     {
	//         console.log('Error: ' + (error.code ? error.code + ' ' + error.message : error.message));
	//     }
	 
	//     if (result)
	//     {
	//     	console.log(JSON.stringify(result));
	//     			console.log("lennnn"+result["statuses"].length+"nellll");

	// 		      for(var i=0, length=result["statuses"].length;i<length;i++){
	// 		      			tweet=result["statuses"][i];
	// 		      			console.log("################"+JSON.stringify(tweet));
			      			
	    	      					


	// 		      }

	//     }
	// });

			
	//	console.log(req.param('twitter_id'));

		
				
		//res.render('index', { title: 'Welcome' });
		
});




module.exports = router;
	