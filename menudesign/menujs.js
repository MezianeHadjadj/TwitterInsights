//uses classList, setAttribute, and querySelectorAll
//if you want this to work in IE8/9 youll need to polyfill these
(function(){
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
  }

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
	console.log("switch")
	console.log(e.target)
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

  document.getElementById("accordion_twitter_insights1").click();

})();