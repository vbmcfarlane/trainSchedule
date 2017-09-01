// javascript fot train schedule

// declare and initialize firebase database      
var config = {
apiKey: "AIzaSyDCjW8faawXul1SiEMqPgmC1XhE7i9pQ9U",
authDomain: "vbm-dubootcamp.firebaseapp.com",
databaseURL: "https://vbm-dubootcamp.firebaseio.com",
projectId: "vbm-dubootcamp",
storageBucket: "",
messagingSenderId: "736108126611"
};
firebase.initializeApp(config);

// assign firedatabase to variable

var database = firebase.database();
//define variables used in computation and displaying. 
 var currentTime="";
 var diffTime ="";
 var tRemainding="";
 var tMinutesTillTrain ="";
 var nextTrain="";
 var fTFormatted="";
 var tFreqFormatted="";
 var trainName = "";
 var tDestination = "";
 var fTTime = "";
 var tFrequency="";
 var nTFormatted="";
 var newtrain="";

// Collecting data from input form and uploading to database
$("#add-employee-btn").on("click", function(event) {
      event.preventDefault();

      // Grabs user input
       trainName = $("#trainName-input").val().trim();
       tDestination = $("#tDestination-input").val().trim();
       fTTime = moment($("#firstTrainTime-input").val().trim(), "HH:mm").format("HH:mm");

       tFrequency =  $("#tFrequency-input").val().trim();
      // Creates local "temporary" object for holding employee data
      newtrain = {
        tname: trainName,
        tDest: tDestination,
        fTime: fTTime,
        tFreq: tFrequency
      };
      // Uploads employee data to the database
      database.ref().push(newtrain);
      
      alert("Employee successfully added");
      // Clears the text-boxes
      $("#trainName-input").val("");
      $("#tDestination-input").val("");
      $("#firstTrainTime-input").val("");
      $("#tFrequency-input").val("");
});
//   Create Firebase event for adding train to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {
    console.log(childSnapshot.val());
    // Store everything into a variable.
    var trainName = childSnapshot.val().tname;
    var tDestination = childSnapshot.val().tDest;
    var fTTime = childSnapshot.val().fTime;
    var tFrequency = childSnapshot.val().tFreq;

    // First Time (pushed back 1 year to make sure it comes before current time)
   
    fTFormatted = moment(fTTime,"HH:mm").subtract(1, "years");
    currentTime = moment();
    diffTime = moment().diff(moment(fTFormatted),"minutes");
    tRemainding = diffTime % tFrequency;
    tMinutesTillTrain = tFrequency - tRemainding;  
    nextTrain = moment().add(tMinutesTillTrain, "minutes");
    nTFormatted = moment(nextTrain).format("hh:mm");
// displays  date and time in header
  $("#dateTime").text(moment().format("dddd, MMMM Do YYYY, h:mm:ss a"));
// add train schedule info from database to the display table
  $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + tDestination + "</td><td>" +
  tFrequency + "</td><td>" + nTFormatted + "</td><td>" + tMinutesTillTrain + "</td><td>");
});
 
   