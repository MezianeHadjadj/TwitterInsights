var  Parser= {};
var  Stats= {};


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
//////////////////////

//start show icons for each tweet

Parser.init=function(){

var tweets = document.getElementsByClassName("stream-item-header");
var ids= document.getElementsByClassName("username js-action-profile-name");
actual_index=actual_index+tweets.length;
Parser.getids(0,tweets,ids);  
};


///////

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
    	 	Stats.show_insights(e["currentTarget"]["id"]);
  	  });
     }

     }
      catch(err) {

        }

	//document.getElementById("stream-items-id").appendChild(node);
    }
    //Stats.show_insights("test")

};



Stats.show_insights= function (profile_name){
    var name="";
for (j in profile_elements){
    if (profile_elements[j]["id"]==profile_name){
        name=profile_elements[j]["name"].trim();
        break
    }
}
   if (name!="") {

       var result;
       var url = "https://api.angel.co/1/search?query=" + name + "&callback=parse&client_id=ID%20f1b889bdfdef6736ee350f6047773c54947a7f7d0adb60fc&access_token=07b6d69f0a41aec4d513a2232e28d86ad80ddfdf68b53298";
       var xhr = new XMLHttpRequest();
       xhr.open("GET", url, true);
       xhr.onreadystatechange = function () {
           if (xhr.readyState == 4) {
               // WARNING! Might be evaluating an evil script!
               //var resp = eval("(" + xhr.responseText + ")");
               result =JSON.parse(JSON.stringify(eval(xhr.responseText.substring(5))));
                console.log(result[0]["name"]+"iiii"+name)
                if(result[0]["name"]==name){
                    var angelist_id=result[0]["id"]
                    console.log(angelist_id)
                }

           }
       }
       xhr.send();
   }
      if(document.getElementById("details_twitter_insights")){
        try {
          var element=document.getElementById("details_twitter_insights");
        	element.parentNode.removeChild(element);
             var element2=document.getElementsByClassName("container_twitter_insights");
        	element2.parentNode.removeChild(element2);
        }catch(err){}
    	}

    var basic_profile= "<div id='details_twitter_insights' ><canvas id='canvas' ></canvas> <div  id='Profile'> " + "  <img id='image_of_twitter_profile' src='https://s3-us-west-2.amazonaws.com/harriscarney/images/150x150.png'/><span>"+profile_name+"</span> <div class='menu_item_twitter_insights_content' ></div> </div></div>";

      $( ".twitter_profile_insight" ).append(basic_profile );
    //  $( ".details_twitter_insights").append(menu );
     Stats.menushow();
 		 
     //Create the Div
     var details = document.createElement("div"); 
     details.className="twitter_profile_insight";


  		details.style.position = "fixed";
  		details.style.top="30px";
  		details.style.right="0px";
  		details.style.width="340px";
  		details.style.background="#E9E9E9";
  		//details.style.marginRight="1px"
  		
  		details.style.color="red";
  		// details.style.visibility = "hidden"
  		document.body.appendChild(details);
///////////////



///show menu
Stats.show_dots();
};


Stats.show_dots= function(){
///show dots
var canvas = $('canvas')[0];
var context = canvas.getContext('2d');

canvas.width = 350;
canvas.height = 800;

var Dots = [];
var colors = ['#FF9900', '#424242', '#BCBCBC', '#3299BB'];
var maximum = 70;

function Initialize() {
  GenerateDots();

  Update();
}

function Dot() {
  this.active = true;

  this.diameter = Math.random() * 7;

  this.x = Math.round(Math.random() * canvas.width);
  this.y = Math.round(Math.random() * canvas.height);

  this.velocity = {
    x: (Math.random() < 0.5 ? -1 : 1) * Math.random() * 0.7,
    y: (Math.random() < 0.5 ? -1 : 1) * Math.random() * 0.7
  };

  this.alpha = 0.1;
  this.hex = colors[Math.round(Math.random() * 3)];
  this.color = HexToRGBA(this.hex, this.alpha);
}

Dot.prototype = {
  Update: function() {
    if(this.alpha < 0.8) {
      this.alpha += 0.01;
      this.color = HexToRGBA(this.hex, this.alpha);
    }

    this.x += this.velocity.x;
    this.y += this.velocity.y;

    if(this.x > canvas.width + 5 || this.x < 0 - 5 || this.y > canvas.height + 5 || this.y < 0 - 5) {
      this.active = false;
    }
  },

  Draw: function() {
    context.fillStyle = this.color;
    context.beginPath();
    context.arc(this.x, this.y, this.diameter, 0, Math.PI * 2, false);
    context.fill();
  }
};

function Update() {
  GenerateDots();

  Dots.forEach(function(Dot) {
    Dot.Update();
  });

  Dots = Dots.filter(function(Dot) {
    return Dot.active;
  });

  Render();
  requestAnimationFrame(Update);
}

function Render() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  Dots.forEach(function(Dot) {
    Dot.Draw();
  });
}

function GenerateDots() {
  if(Dots.length < maximum) {
    for(var i = Dots.length; i < maximum; i++) {
      Dots.push(new Dot());
    }
  }

  return false;
}

function HexToRGBA(hex, alpha) {
  var red = parseInt((TrimHex(hex)).substring(0, 2), 16);
  var green = parseInt((TrimHex(hex)).substring(2, 4), 16);
  var blue = parseInt((TrimHex(hex)).substring(4, 6), 16);

  return 'rgba(' + red + ', ' + green + ', ' + blue + ', ' + alpha + ')';
}

function TrimHex(hex) {
  return (hex.charAt(0) == "#") ? hex.substring(1, 7) : h;
}

$(window).resize(function() {
  Dots = [];
  canvas.width = 300;
  canvas.height = 800;
});

Initialize();

  			//var search=document.getElementsByClassName("three-col logged-in user-style-MezianeHadjadj enhanced-mini-profile");
	 		//search[0].appendChild(newDiv);

 		 
};



///JS related to menu

Stats.menushow= function () {
  
  
  
  $(".menu_item_twitter_insights").click(function(e) {
    console.log("iiii");
    //menu_item_twitter_insights_content
    var item_content=document.getElementById("menu_item_twitter_insights_content");
    

    $( ".menu_item_twitter_insights_content" ).append("<p>content</p>" );

  // make sure we cannot click the slider
  if ($(this).hasClass('slider')) {
    return;
  }

  /* Add the slider movement */

  // what tab was pressed
  var whatTab = $(this).index();

  // Work out how far the slider needs to go
  var howFar = 160 * whatTab;

  $(".slider").css({
    left: howFar + "px"
  });

  /* Add the ripple */

  // Remove olds ones
  $(".ripple").remove();

  // Setup
  var posX = $(this).offset().left,
      posY = $(this).offset().top,
      buttonWidth = $(this).width(),
      buttonHeight = $(this).height();

  // Add the element
  $(this).prepend("<span class='ripple'></span>");

  // Make it round!
  if (buttonWidth >= buttonHeight) {
    buttonHeight = buttonWidth;
  } else {
    buttonWidth = buttonHeight;
  }

  // Get the center of the element
  var x = e.pageX - posX - buttonWidth / 2;
  var y = e.pageY - posY - buttonHeight / 2;

  // Add the ripples CSS and start the animation
  $(".ripple").css({
    width: buttonWidth,
    height: buttonHeight,
    top: y + 'px',
    left: x + 'px'
  }).addClass("rippleEffect");
});
  
  //uses classList, setAttribute, and querySelectorAll
//if you want this to work in IE8/9 youll need to polyfill these

	var d = document,
	accordion_twitter_insightsToggles = d.querySelectorAll('.js-accordion_twitter_insightsTrigger'),
	setAria,
	setaccordion_twitter_insightsAria,
	switchaccordion_twitter_insights,
  touchSupported = ('ontouchstart' in window),
  pointerSupported = ('pointerdown' in window);
  
  skipClickDelay = function(e){
    e.preventDefault();
    e.target.click();
  };

		setAriaAttr = function(el, ariaType, newProperty){
		el.setAttribute(ariaType, newProperty);
	};
	setaccordion_twitter_insightsAria = function(el1, el2, expanded){
		switch(expanded) {
      case "true":
      	setAriaAttr(el1, 'aria-expanded', 'true');
      	setAriaAttr(el2, 'aria-hidden', 'false');
      	break;
      case "false":
      	setAriaAttr(el1, 'aria-expanded', 'false');
      	setAriaAttr(el2, 'aria-hidden', 'true');
      	break;
      default:
				break;
		}
	};
//function
switchaccordion_twitter_insights = function(e) {
	console.log("switch");
	console.log(e.target);
	e.preventDefault();
	var thisAnswer = e.target.parentNode.nextElementSibling;
	var thisQuestion = e.target;
	if(thisAnswer.classList.contains('is-collapsed')) {
		setaccordion_twitter_insightsAria(thisQuestion, thisAnswer, 'true');
	} else {
		setaccordion_twitter_insightsAria(thisQuestion, thisAnswer, 'false');
	}
  	thisQuestion.classList.toggle('is-collapsed');
  	thisQuestion.classList.toggle('is-expanded');
		thisAnswer.classList.toggle('is-collapsed');
		thisAnswer.classList.toggle('is-expanded');
 	
  	thisAnswer.classList.toggle('animateIn');
	};

	for (var i=0,len=accordion_twitter_insightsToggles.length; i<len; i++) {

		if(touchSupported) {
      accordion_twitter_insightsToggles[i].addEventListener('touchstart', skipClickDelay, false);
    }
    if(pointerSupported){
      accordion_twitter_insightsToggles[i].addEventListener('pointerdown', skipClickDelay, false);
    }
    accordion_twitter_insightsToggles[i].addEventListener('click', switchaccordion_twitter_insights, false);
  }

  //document.getElementById("accordion_twitter_insights1").click();


};




Parser.init();
  // to charge the context but with time we should find the solution for this bug
  Stats.show_insights("profile_name");
