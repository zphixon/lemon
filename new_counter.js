
// lemon tuesday is
// W E B S C A L E
// E
// B
// S
// C
// A
// L
// E

function byId(id) {
    return document.getElementById(id);
}

// returns 3rd tuesday of a given year
function findDate(year) {
    var first = new Date(year, 10, 1).getDay();

    if (first === 0) { return 17; }
    else if (first === 1) { return 16; }
    else if (first === 2) { return 15; }
    else if (first === 3) { return 21; }
    else if (first === 4) { return 20; }
    else if (first === 5) { return 19; }
    else if (first === 6) { return 18; }
}

var updatedCounterImg = false;

function update() {
    // CURRENT_YEAR
    var year = new Date().getFullYear();

    // get our countdown
    var timespan = countdown(new Date(year, 10, findDate(year)),
        null, countdown.MONTHS | countdown.WEEKS | countdown.DAYS | countdown.HOURS
        | countdown.MINUTES | countdown.SECONDS);

    // lemon tuesday has passed :C
    if (timespan.value >= 1000 * 60 * 60 * 24)
        timespan = countdown(new Date(year + 1, 10, findDate(year + 1)),
            null, countdown.MONTHS | countdown.WEEKS | countdown.DAYS | countdown.HOURS
            | countdown.MINUTES | countdown.SECONDS);

    // today's the big day!
    if (0 <= timespan.value && timespan.value <= 1000 * 60 * 60 * 24) {
        byId("counterDetail").innerHTML = "Today!";
        byId("counterOverview").innerHTML = ":)";
        byId("counterIcon").src = "img/counter.png";
        byId("counterUnit").innerHTML = "<br/>";
        return;
    }

    // lemon logo
    byId("counterOverview").innerHTML = timespan.months;

    // actual counter
    byId("months").innerHTML = timespan.months;
    byId("weeks").innerHTML = timespan.weeks;
    byId("days").innerHTML = timespan.days;
    byId("hours").innerHTML = timespan.hours;
    byId("minutes").innerHTML = timespan.minutes;
    byId("seconds").innerHTML = timespan.seconds;

    // plurals 'n' sheit
    if (timespan.months == 1) {
        byId("monthUnit").innerHTML = "month";
        byId("counterUnit").innerHTML = "month";
    } else {
        byId("monthUnit").innerHTML = "months";
        byId("counterUnit").innerHTML = "months";
    }

    if (timespan.weeks == 1)
        byId("weekUnit").innerHTML = "week";
    else
        byId("weekUnit").innerHTML = "weeks";

    if (timespan.days == 1)
        byId("dayUnit").innerHTML = "day";
    else
        byId("dayUnit").innerHTML = "days";

    if (timespan.hours == 1)
        byId("hourUnit").innerHTML = "hour";
    else
        byId("hourUnit").innerHTML = "hours";

    if (timespan.minutes == 1)
        byId("minuteUnit").innerHTML = "minute";
    else
        byId("minuteUnit").innerHTML = "minutes";

    if (timespan.seconds == 1)
        byId("secondUnit").innerHTML = "second";
    else
        byId("secondUnit").innerHTML = "seconds";

    if (!updatedCounterImg) {
        byId("counterIcon").src = "img/counter-" + (12 - timespan.months) + ".png";
        updatedCounterImg = true;
    }
}

update();
setInterval(update, 1000);

