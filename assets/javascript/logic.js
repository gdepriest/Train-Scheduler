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

    console.log(trainName);
    console.log(destination);
    console.log(startTime);
    console.log(frequency);

    //nextArrival needs to be part of the math - it needs to take the user input start point, the current time, and user-input frequency
    
    // var startTimeConverted = moment()


})