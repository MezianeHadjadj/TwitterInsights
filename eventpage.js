console.log("start");
document.addEventListener('DOMContentLoaded', function() {
    var link = document.getElementById('btn');

    // onClick's logic below:
    console.log ("event");
    link.addEventListener('click', function() {
        console.log("hiiiiiiiii");
    });
});