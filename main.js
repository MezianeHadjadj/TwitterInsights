var  Parser= {};

var actual_index=0;
var profile_elements=[];

// show icons after a scroll ps: not professional to append icons after one second, just imagine if the use has a bad connection
$(window).scroll(function() {
    if($(window).scrollTop() + $(window).height() == $(document).height()) {
        console.log("botommm");
        run();
    }
});

function run() {
    setTimeout(after, 1000);
}

function after(){
    var tweets = document.getElementsByClassName("stream-item-header");
    var ids= document.getElementsByClassName("username js-action-profile-name");
    console.log(actual_index);
    Parser.getids(actual_index,tweets,ids);
    actual_index=actual_index+tweets.length
}

////////////////////////Start show icons for each tweet//////////////////////
Parser.init=function(){

    var tweets = document.getElementsByClassName("stream-item-header");
    var ids= document.getElementsByClassName("username js-action-profile-name");
    actual_index=actual_index+tweets.length;
    Parser.getids(0,tweets,ids);
};
/////////////////Delete the dtails page///////////////

/////////////////////Get Ids/////////////////////
Parser.getids= function (actual_index, tweets, ids){
    for (var i = actual_index; i <actual_index+tweets.length-1; i++) {
        //add image to each tweet
        try {
            if(ids[i]!=undefined){
                //Thi code is made in the goal to delete ids and just pass tweets
                //   var obj=tweets[i].childNodes[1];
                //  //console.log("image:"+ obj.childNodes[1].src  );
                // // console.log("ID:"+ obj.childNodes[5].innerHTML  );
                //  console.log("ID:"+ (obj.childNodes[6]).childNodes[1].textContent );
                //  var id=JSON.stringify((obj.childNodes[6]).childNodes[1].textContent)
                //  id=JSON.parse(id)
                ////////

                var object=ids[i].childNodes[1];
                var DOM_img = document.createElement("img");
                var imgURL = chrome.extension.getURL("icon.png/");
                DOM_img.src = "http://www.epigami.sg/partners/wp-content/uploads/2015/02/edcational-services.png";
                DOM_img.width=20;
                var id=JSON.stringify(object.textContent);
                id=JSON.parse(id);
                DOM_img.id=id;
                DOM_img.style.marginLeft = "50px";
                ids[i].parentNode.parentNode.appendChild(DOM_img);
                profile_elements.push({"id": id,"name": ((tweets[i].childNodes[1]).textContent).split('\n')[2]});

                //click event
                $('#'+id).on('click', function(e){

                    var clicked_id=e["currentTarget"]["id"];

                    //$( ".details" ).load( "https://www.dropbox.com/s/eguah1o4ajsakqw/index.html?dl=1" );
                    /*    if (document.getElementById("twitter_profile_insight")!=null) {
                     var element = document.getElementById("twitter_profile_insight");
                     element.parentNode.removeChild(element);
                     }
                     if (document.getElementById("details_twitter_insights")!=null) {
                     var element = document.getElementById("details_twitter_insights");
                     element.parentNode.removeChild(element);
                     }
                     */
                    Parser.show_insights(e["currentTarget"]["id"]);

                });
            }
        }
        catch(err) {
        }
        //document.getElementById("stream-items-id").appendChild(node);
    }
    //Stats.show_insights("test")
};
//////////////////////Show details of profile//////////////////////
Parser.show_insights= function (profile_name) {
    //get the name of user by id
    var name = "";
    for (j in profile_elements) {
        if (profile_elements[j]["id"] == profile_name) {
            name = profile_elements[j]["name"].trim();
            break
        }
    }
    if (name != "") {

        AngelistExtractor.angellist_details(name);
    }
  /*  if (document.getElementById("twitter_profile_insight")) {
        try {
            console.log("dell");
            var element = document.getElementById("twitter_profile_insight");
            element.parentNode.removeChild(element);
            var element2 = document.getElementById("Profile");
            element2.parentNode.removeChild(element2);
        } catch (err) {
            console.log(err+"err");
        }
    } */


    //  $( ".details_twitter_insights").append(menu );
    //Stats.menushow();

    //Create the Div
    if ((document.getElementsByClassName("twitter_profile_insight").length) == 0) {
        console.log(document.getElementsByClassName("twitter_profile_insight"))
        //var ddetails=
        var details = document.createElement("div");
    }else{
        var details=document.getElementsByClassName("twitter_profile_insight")[0]
        $( ".twitter_profile_insight" ).empty();
    }
    details.className="twitter_profile_insight";
    details.style.position = "fixed";
    details.style.top="30px";
    details.style.right="0px";
    details.style.width="340px";
    details.style.background="#E9E9E9";
    //var basic_profile= "<canvas id='canvas' ></canvas> <div  id='Profile'> " + "  <img id='image_of_twitter_profile' src='https://s3-us-west-2.amazonaws.com/harriscarney/images/150x150.png'/><span>"+'profile_name'+"</span> <div class='menu_item_twitter_insights_content' ></div> </div>";
    var basic_profile= "  <canvas id='canvas' ></canvas>  <div  id='Profile'> " + " <a style=' margin-top=200px' id='delete_angelist_insights' class='close-thik'></a>  <img id='image_of_twitter_profile' src='https://s3-us-west-2.amazonaws.com/harriscarney/images/150x150.png'/><span>"+profile_name+"</span> <div class='menu_item_twitter_insights_content' ></div> </div>";
    $( ".twitter_profile_insight" ).append(basic_profile );
    document.body.appendChild(details);

    $( "#delete_angelist_insights" ).click(function() {
        console.log("delete insights");

        $( ".twitter_profile_insight" ).empty();
        //var element = document.getElementById("twitter_profile_insight");
       // element.parentNode.removeChild(element);
    });

/////////////////////////Show menu//////////////////////
    Stats.show_dots();
};



Parser.init();
// to charge the context but with time we should find the solution for this bug
Parser.show_insights("profile_name");
