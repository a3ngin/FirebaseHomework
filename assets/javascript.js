$(document).ready(function () {
    console.log("ready!");


    var config = {
        apiKey: "AIzaSyBAcUgeBcFyUkfngAQQJwO3UTbl3cT3TS0",
        authDomain: "traintime-8f517.firebaseapp.com",
        databaseURL: "https://traintime-8f517.firebaseio.com",
        projectId: "traintime-8f517",
        storageBucket: "traintime-8f517.appspot.com",
        messagingSenderId: "86596357081"
    };
    firebase.initializeApp(config);

    var database = firebase.database();
    var name;
    var destination;
    var time;
    var frequency;



    $("#add-train-btn").on("click", function (event) {
        event.preventDefault();

        name = $("#train-name-input").val().trim();
        destination = $("#destination-input").val().trim();
        time = $("#time-input").val().trim();
        frequency = $("#frequency-input").val().trim();


        database.ref().push({
            name: name,
            destination: destination,
            time: time,
            frequency: frequency
        });
    })

    database.ref().on("child_added", function (snapshot) {

        var sv = snapshot.val();

        console.log(sv.name);
        console.log(sv.destination);
        console.log(sv.time);
        console.log(sv.frequency);

        var freq =  parseInt(sv.frequency);

        var arrivalCon =  moment(snapshot.val().time, 'HH:mm').subtract(1, 'years');
        var militime = moment(arrivalCon).format('HH:mm');
        var timecon = moment(militime, 'HH:mm').subtract(1, 'years');
        var difference = moment().diff(moment(timecon), 'minutes');
        var remainder = difference % freq;
        var  minAway  = freq  - remainder; 
        var nextTrain = moment().add(minAway, 'minutes');



        var tRow = $("<tr>");

        var nameID = $("<td>").text(sv.name);
        var destinationID = $("<td>").text(sv.destination);
        var timeID = $("<td>").text(sv.frequency);
        var minutesAwayID =  $("<td>").text(moment(nextTrain, 'HH:mm').format("hh:mm a"));
        var nextArrivalID = $("<td>").text(minAway);
        

        tRow.append(nameID, destinationID, timeID, minutesAwayID, nextArrivalID);
        $(".table").append(tRow);





    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
    })






});