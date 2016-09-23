//written by: Michael Christy
//written for: Louisivlle Fire Department
//Purpose: Used to calculate required GPM for structure fire planning per ISO.
//Note: written in just JavaScript to compensate for possible blocking of jquery or frameworks by IT Security


var length = 1;
var width = 1;
var floors = 1;
var squareFoot = 0;
var occupancyFactor = 0;
var adjustedGPM = 0;
var exposureDist=0;
var final = 0;


//calculates the effective area of the subject building
function effectiveArea(){
     if (floors > 1) {
    //each floor above the first is calculated at 1/2 the area add added to the first.
    squareFoot = Math.sqrt (((length * width) + (floors - 1) * (0.5 * (length * width))));
    } else {
    squareFoot = Math.sqrt(length*width);
    };
    return Math.ceil(squareFoot);
};

//get the coefficent used by the exposures. Only need the max of the options.  
function exposure(){
    for (var i = 0; i < document.isoCalc.exposures.length; i++) {
        if (document.isoCalc.exposures[i].checked) {
            return exposureDist = document.isoCalc.exposures[i].value;
        }
    };
} 

//takes the coefficients from occupancy and exposures and mutliplies them with the effective area. still requires rounding.
function maths (occupancyFactor, exposuresDist) {
   final = (squareFoot * occupancyFactor * (1+exposureDist));
    //return final;
};

//iso requires rounding at certain points
function finalRounding (i) {
    squareFoot * 18 * i;
    if (final > 8000) {
        adjustedGPM = 8000
    } else if (final < 500) {
        adjustedGPM = 500
    } else {
        adjustedGPM = Math.ceil(final);
    };
    return adjustedGPM;
};

   

//recalculate when user inputs something new then displays on the page after rounding
 document.onchange = function() {
    length = document.getElementById("length").value;
    width = document.getElementById("width").value;
    floors = document.getElementById("floors").value;
    effectiveArea();
    //exposure();
    for (var i = 0; i < document.isoCalc.combust.length; i++) {
        if (document.isoCalc.combust[i].checked) {
            occupancyFactor = document.isoCalc.combust[i].value;
        }
    };
    for (var i = 0; i < document.isoCalc.exposures.length; i++) {
        if (document.isoCalc.exposures[i].checked) {
            exposureDist = document.isoCalc.exposures[i].value;
        }
    };
    maths();
//document.getElementById("class1").value = finalRounding (1.5);
//document.getElementById("class2").value = finalRounding (1);
//document.getElementById("class3").value = finalRounding (0.8);
//document.getElementById("class4").value = finalRounding (0.6);
 };
   


//min is 6000 for 1story regardless