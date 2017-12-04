var year;
var novFirstDate;
var novFirstDay;
var day;
var month;
var now;
var lemonTuesday;
var tMinus;
var prevMonths;
var months;
var weeks;
var days;
var hours;
var minutes;
var seconds;
var general;
var generalUnit;
var daysToMonth;

function findDate () {
    // Figure out the date of the third Tuesday of November
    
    // Start by finding out the day of the week of November 1st
    year = new Date().getFullYear();
    
    // Check for the two months after Lemon Tuesday
    if (new Date().getMonth() === 10) {
        //Calculate the day that Lemon Tuesday falls on this year
        novFirstDate = new Date(year, 10, 1);
        novFirstDay = novFirstDate.getDay();
        if (novFirstDay === 0) {day = 17; }
        if (novFirstDay === 1) {day = 16; }
        if (novFirstDay === 2) {day = 15; }
        if (novFirstDay === 3) {day = 21; }
        if (novFirstDay === 4) {day = 20; }
        if (novFirstDay === 5) {day = 19; }
        if (novFirstDay === 6) {day = 18; }
        
        if (new Date().getDate() > day) {
            year = new Date().getFullYear() + 1;
        }
    }
    if (new Date().getMonth() === 11) {
        year += 1;
    }
    
    novFirstDate = new Date(year, 10, 1);
    novFirstDay = novFirstDate.getDay();
    
    // These statements are always true (Excpet in the case of polar shifting)
    if (novFirstDay === 0) {day = 17; }
    if (novFirstDay === 1) {day = 16; }
    if (novFirstDay === 2) {day = 15; }
    if (novFirstDay === 3) {day = 21; }
    if (novFirstDay === 4) {day = 20; }
    if (novFirstDay === 5) {day = 19; }
    if (novFirstDay === 6) {day = 18; }
}

function findTime () {
    // Find the time between now and the date calculated before
    
    now = new Date();
    month = now.getMonth();
    
    // If we are in the month of November
    if (year === now.getFullYear()) {
        if (month === 10) {
            now = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes(), now.getSeconds());
            lemonTuesday = Date.UTC(year, 10, day);
            tMinus = (lemonTuesday - now) / 1000;
        } else {
            now = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes(), now.getSeconds());
            lemonTuesday = Date.UTC(year, 10, day) - Date.UTC(year, 10, 0);
            daysToMonth = Date.UTC(year, month + 1, 1) - 82800000 - now;
            tMinus = (daysToMonth + lemonTuesday) / 1000;
        }
    } else {
        now = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes(), now.getSeconds());
        lemonTuesday = Date.UTC(year, 10, day) - Date.UTC(year, 10, 0);
        daysToMonth = Date.UTC(year - 1, month + 1, 1) - 82800000 - now;
        tMinus = (daysToMonth + lemonTuesday) / 1000;
    }
}

function timer () {
    // Invoke's the script's functions
    findTime();
    if (tMinus < 86400){
        findDate();
        findTime();
    }
    if (tMinus < 0){
        tMinus = 0;
    }
    update();
}

function update () {
    // Update the page to reflect the new times
    
    // Calculate individual units from largest to smallest
    if ( year === new Date().getFullYear()) {
        months = 9 - new Date().getMonth();
    }
    else{
        months = 21 - new Date().getMonth();
    }
    weeks = Math.floor(tMinus/604800);
    days = Math.floor(tMinus / 86400 - weeks * 7);
    hours = Math.floor(tMinus / 3600 - days * 24 - weeks * 168);
    minutes = Math.floor(tMinus / 60 - hours * 60 - days * 1440 - weeks * 10080);
    seconds = Math.floor(tMinus - minutes * 60 - hours * 3600 - days * 86400 - weeks * 604800);
    
    if ( months == 12){ months = 11;}; //Cap the number of months to 11
    if ( months < 0 ){ months = 0; } //There can't be negative months
    
    // detailled times
    document.getElementById("months").innerHTML = months;
    document.getElementById("weeks").innerHTML = weeks;
    document.getElementById("days").innerHTML = days;
    document.getElementById("hours").innerHTML = hours;
    document.getElementById("minutes").innerHTML = minutes;
    document.getElementById("seconds").innerHTML = seconds;
    
    // Fix the grammar on the units
    if (months == 1){document.getElementById("monthUnit").innerHTML = "month";}
    else{document.getElementById("monthUnit").innerHTML = "months";};
    if (weeks == 1){document.getElementById("weekUnit").innerHTML = "week";}
    else{document.getElementById("weekUnit").innerHTML = "weeks";};
    if (days == 1){document.getElementById("dayUnit").innerHTML = "day";}
    else{document.getElementById("dayUnit").innerHTML = "days";};
    if (hours == 1){document.getElementById("hourUnit").innerHTML = "hour";}
    else{document.getElementById("hourUnit").innerHTML = "hours";};
    if (minutes == 1){document.getElementById("minuteUnit").innerHTML = "minute";}
    else{document.getElementById("minuteUnit").innerHTML = "minutes";};
    if (seconds == 1){document.getElementById("secondUnit").innerHTML = "second";}
    else{document.getElementById("secondUnit").innerHTML = "seconds";};
    
    // overview
    if (months > 0){
        general = months;
        if (months == 1){generalUnit = "Month"}
        else{generalUnit = "Months"};
    }
    else{
        if (weeks > 0){
            general = weeks;
            if ( months == 1 ){generalUnit = "Week"}
            else{generalUnit = "Weeks"};
        }
        else{
            if(days > 0){
                general = days;
                if ( days == 1 ){generalUnit = "Day"}
                else{generalUnit = "Days"};
            }
            else{
                if( hours > 0 ){
                    general = hours;
                    if ( hours == 1){generalUnit = "Hour";}
                    else{ generalUnit = "Hours"};
                }
                else{
                    if( minutes > 0){
                        general = minutes;
                        if ( minutes == 1 ){ generalUnit = "Minute"}
                        else{ generalUnit = "Minutes"; };
                    }
                    else{
                        general = seconds;
                        if( seconds == 1 ){ generalUnit = "Second"; }
                        else{ generalUnit = "Seconds"; };
                        
                        //If it is currently lemon tuesday
                        if( seconds == 0){
                            general = "<span style='font-size:150px; position:relative; bottom:25px;'>Now</span>";
                            generalUnit = year;
                        }
                    }
                }
            }
        }
    }
    
    document.getElementById("counterOverview").innerHTML = general;
    document.getElementById("counterUnit").innerHTML = generalUnit;
    
    // Finally, change the counter icon
    if( months != prevMonths){
        if ( months > 11 || year > new Date().getFullYear() ){
            document.getElementById("counterIcon").src="img/counter-0.png"
        }
        if ( months == 10 && year == new Date().getFullYear() ){
            document.getElementById("counterIcon").src="img/counter-1.png"
        }
        if ( months == 9 ){
            document.getElementById("counterIcon").src="img/counter-2.png"
        }
        if ( months == 8 ){
            document.getElementById("counterIcon").src="img/counter-3.png"
        }
        if ( months == 7 ){
            document.getElementById("counterIcon").src="img/counter-4.png"
        }
        if ( months == 6 ){
            document.getElementById("counterIcon").src="img/counter-5.png"
        }
        if ( months == 5 ){
            document.getElementById("counterIcon").src="img/counter-6.png"
        }
        if ( months == 4 ){
            document.getElementById("counterIcon").src="img/counter-7.png"
        }
        if ( months == 3 ){
            document.getElementById("counterIcon").src="img/counter-8.png"
        }
        if ( months == 2 ){
            document.getElementById("counterIcon").src="img/counter-9.png"
        }
        if ( months == 1 ){
            document.getElementById("counterIcon").src="img/counter-10.png"
        }
        if ( months < 1 && tMinus > 0 ){
            document.getElementById("counterIcon").src="img/counter-11.png"
        }
        if ( tMinus <= 0 ){
            document.getElementById("counterIcon").src="img/counter-12.png"
        }
        prevMonths = months;
    };
}

findDate();
timer();
setInterval(function(){timer()},1000);