var firebaseConfig = {
    apiKey: "AIzaSyCFQnQO4kHjqQRnu7SeWj-4kL9YIEaFbII",
    authDomain: "testing-testing-84a4d.firebaseapp.com",
    databaseURL: "https://testing-testing-84a4d.firebaseio.com",
    projectId: "testing-testing-84a4d",
    storageBucket: "testing-testing-84a4d.appspot.com",
    messagingSenderId: "813376100953",
    appId: "1:813376100953:web:5453e22a0437e313"
};
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database();

$("#submit").on("click", function(event){
    event.preventDefault();
    var trainName = $("#trainName").val().trim();
    var destination = $("#destination").val().trim();
    var startTime = $("#startTime").val().trim();
    var frequency = $("#frequency").val().trim();

    var newTrain = {
        name: trainName,
        dest: destination,
        start: startTime,
        freq: frequency,
    }

    database.ref().push(newTrain);

    // console.log(newTrain.name);    
    // console.log(newTrain.dest);
    // console.log(newTrain.start);
    // console.log(newTrain.freq);

    alert("Train successfully added!");

    $("#trainName").val("");
    $("#destination").val("");
    $("#startTime").val("");
    $("#frequency").val("");

})

database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());

    var trainName = childSnapshot.val().name;
    var destination = childSnapshot.val().dest;

    var startTime = childSnapshot.val().start;
    var frequency = childSnapshot.val().freq;

    // console.log(trainName);
    // console.log(destination);
    // console.log(startTime);
    // console.log(frequency);

    //nextArrival needs to be part of the math - it needs to take the user input start point, the current time, and user-input frequency
    //convert time, set to a year ago (to make it always the bigger number. Needed for when a user arrives prior to when the train begins rotation ***Not sure about this step.)
    var startTimeConverted = moment(startTime, "hh:mm").subtract(1, "years");
    console.log(startTimeConverted);

    //take the current time from moment, set as variable
    var currentTime = moment();
    // console.log(currentTime);

    //difference between current time and startTime in minutes
    var timeDifference = currentTime.diff(moment(startTimeConverted), "minutes");
    console.log("Time Difference: " + timeDifference);

    //get the remainder b/t the difference in time and the frequency
    var remainder = timeDifference % frequency;
    console.log(remainder);

    //minutes away will be the difference b/t the frequency and the remainder.
    var minutesAway = frequency - remainder;
    console.log("Minutes Away: " + minutesAway);

    var nextArrival = currentTime.add(minutesAway, "minutes").format("hh:mm");
    console.log("Next Train: " + nextArrival);

    //new row with all the info
    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(destination),
        $("<td>").text(frequency),
        $("<td>").text(nextArrival),
        $("<td>").text(minutesAway),
      );

    //append row to table

    $("tbody").append(newRow);
    

})