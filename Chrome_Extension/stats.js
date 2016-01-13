var  Stats= {};

Stats.show_dots= function(){
///show dots
    var canvas = $('canvas')[0];
    var context = canvas.getContext('2d');

    canvas.width = 350;
    canvas.height = 800;

    var Dots = [];
    var colors = ['#FF9900', '#424242', '#BCBCBC', '#3299BB'];
    var maximum = 70;

    function Initialize_Dots() {
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

    Initialize_Dots();

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
