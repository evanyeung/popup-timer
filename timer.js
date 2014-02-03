function hasClass(elem, className)
{
    return new RegExp(" " + className + " ").test(" " + elem.className + " ");
}

function addClass(elem, className)
{
    if(!hasClass(elem, className))
    {
        elem.className += " " + className;
    }
}

function removeClass(elem, className)
{
    if(hasClass(elem, className))
    {
        elem.className = elem.className.replace(className, "");
    }
}

//error checks the input and returns the interval in seconds
function getInterval(inputElem)
{
    var interval = inputElem.value;
    if (!interval.match(/^\d+$/ig) && (interval != ""))
    {
        alert("Please enter a positive integer");
        return -1;
    }
    return parseInt(interval)*1000 || 0; //in seconds
}

//displays modal overlay when time is up
function toggleOverlay()
{
    var modal = document.getElementById("overlay");
    modal.style.visibility = (modal.style.visibility == "visible")?"hidden":"visible";
}

var toggle = document.getElementById("toggle-timer");
var input_min = document.getElementById("interval-min");
var input_sec = document.getElementById("interval-sec");
var dismiss_btn = document.getElementById("dismiss");
var intervalID = null;

toggle.onclick = function () {
    if (hasClass(toggle, "stopped"))
    {
        var interval_min = getInterval(input_min) //is in seconds still
        var interval_sec = getInterval(input_sec);
        var interval = interval_min*60 + interval_sec
        if ((interval_min != -1) && (interval_sec != -1) && (interval != 0))
        {
            removeClass(toggle, "stopped");
            addClass(toggle, "running");
            toggle.innerHTML = "<strong>Running</strong>";
            toggle.blur(); //for some reason js leaves it focused after changing class
        
            //set interval to alert in minutes
            //assigns the id of the interval process
            intervalID = window.setInterval(function() {
                //alert("time");
                toggleOverlay();
            }, interval);
            input.disabled = true; //cannot change interval when running
        }
    }
    else
    {
        removeClass(toggle, "running");
        addClass(toggle, "stopped");
        clearInterval(intervalID); //stop repetition
        toggle.innerHTML = "<strong>Stopped</strong>";
        toggle.blur();
        input.disabled = false; //re-enable field
    }
};

dismiss_btn.onclick = function() {
    toggleOverlay();
};