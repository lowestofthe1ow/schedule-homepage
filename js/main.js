var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
// Month strings
var weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
var current = 0;
// Weekday strings

function updateDay() {
  var today = new Date();
  // Current date
  var date = weekdays[today.getDay()] + ", " + months[today.getMonth()] + " " + today.getDate() + ", " + today.getFullYear()
  // Current date in day of week, MM DD, YYYY
  var time = today.toLocaleTimeString()
  // Time in HH:MM
  document.getElementById("subtitle").innerHTML = "It is " + date + ", " + time;
  setInterval(function () {updateDay(); updateNext();}, 500);
};

function addSched() {
  var weekday = new Date().getDay();
  var i;
  if (sched[weekday].slots == 0) {
    document.getElementById("schedule").insertAdjacentHTML("beforeend", "<tr><td class='bodytext'>You have no classes today.</td></tr>")
  }
  else {
    for (i = 1; i < sched[weekday].slots + 1; i++) {
      document.getElementById("schedule").insertAdjacentHTML("beforeend", "<tr><td class='bodytext'><a href='https://meet.google.com/" + sched[weekday][i].link + "'>" + sched[weekday][i].name + " &#8594; </a></td><td class='bodytext'>" + sched[weekday][i].stime + "</td></tr>");
    };
  };
};

function updateNext() {
  var weekday = new Date().getDay();
  var seconds = (new Date().getHours() * 3600) + (new Date().getMinutes() * 60) + new Date().getSeconds();
  if (sched[weekday].slots == 0) {
    document.getElementById("nextclass").innerHTML = "You have no classes today.";
  }
  else if (seconds <= sched[weekday][current+1].time) {
    document.getElementById("nextclass").innerHTML = "Your next class is: " + sched[weekday][current+1].name;
    document.getElementById("nextclasslink").setAttribute("href", "https://meet.google.com/" + sched[weekday][current+1].link)
    document.getElementById("nextclassbutton").setAttribute("class", "enabled");
  }
  else {
    current++;
    if (current >= sched[weekday].slots) {
      current = 0;
      document.getElementById("nextclass").innerHTML = "That was the final one! No more classes for today.";
      document.getElementById("nextclassbutton").className = "disabled";
    };
  };
}
