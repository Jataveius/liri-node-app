require("dotenv").config();
var keys = require("./keys.js");
var action = process.argv[2];
var command = process.argv[2];
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var Twitter = require("twitter");
var client = new Twitter(keys.twitter);
var inquirer = require("inquirer");


// Stores the arguments
var nodeArgs = process.argv;

// Empthy Variable
var value = "";

// Loops through 

for (var i = 3; i < nodeArgs.length; i++) {

    if (i > 3 && i < nodeArgs.length) {

        value = value + " " + nodeArgs[i];

    } else {

        value = value + nodeArgs[i];
    }
}


//Switch Statment for inquirer

inquirer.prompt([{
type: "list",
name: "activity",
message: "Liri is ready when you are",
choices: ["my-tweets", "spotify-this-song", "movie-this", "do-what-it-says"]
}]).then(function (response) {

    //     var activity = response.activity;
    switch (action) {

        case "my-tweets":
            twitter();
            break;

        case "spotify-this-song":
            spotify();
            break;

        case "movie-this":
            imdb();
            break;

        case "do-what-it-says":
            dwis();
            break;
    }


    //TWITTER________________________________________________________

    function twitter() {
        //FS npm 
        var fs = require("fs");

        //Pulls twitter "keys.js" 
        var twitterKey = require("./keys.js");
        // console.log(twitterKey.twitterKeys)

        //Twitter package
        var Twitter = require("twitter");


        var client = new Twitter(twitterKey.twitterKeys);

        //Function that pulls twitter value 
        var params = {
            screen_name: value,
            count: 20
        };
        client.get("statuses/user_timeline", params, function (error, tweets, response) {
            if (!error) {

                console.log("_________________________________________________");
                console.log("Here are the most recent tweets");

                for (var i = 0; i < tweets.length; i++) {

                    console.log("_____________________________________________");
                    console.log("Tweeted on: " + tweets[i].created_at);
                    console.log(tweets[i].text);

                }
            }
        });
    }


    //SPOTIFY________________________________________________________
    function spotify() {
     
        if (value != false) {
         
            spotify.search({
                type: 'track',
                query: value + "",
            }, function(error, data) {
                if (error) {
                    console.log('Error occurred: ' + error);
                    return;
                }
                // DO SOMETHING WITH 'data'
                console.log("---------------------------------------------------");
                console.log(" ");
                console.log("The song you entered was " + value + ".");
                console.log(" ");
                console.log("Here is the infromation you requested!");
                console.log(" ");
                console.log("Track Title: " + data.tracks.items[0].name);
                console.log(" ");
                console.log("Artist Name: " + data.tracks.items[0].artists[0].name);
                console.log(" ");
                console.log("Preview URL: " + data.tracks.items[0].preview_url);
                console.log(" ");
                console.log("---------------------------------------------------");
            });
        } else {
            {
                var spotify = require('spotify');
    value=tracks;
                spotify.search({
                    type: 'track',
                    query: 'ace+of+base+sign' + '&limit=1&'
                }, function(error, data) {
                    if (error) {
                        console.log('Error occurred: ' + error);
                        return;
                    }
                    // DO SOMETHING WITH 'data'
                    console.log("---------------------------------------------------");
                    console.log(" ");
                    console.log("Since you didnt enter a song here is the following: ");
                    console.log(" ");
                    console.log("Track Title: " + tracks.items[0].name);
                    console.log(" ");
                    console.log("Artist Name: " + tracks.items[0].artists[0].name);
                    console.log(" ");
                    console.log("Preview URL: " + tracks.items[0].url);
                    console.log(" ");
                    console.log("---------------------------------------------------");
                });
            }
    
        }
    }
        

    //IMDB________________________________________________________

    function imdb() {

        // Npm package request 
        var request = require("request");

        // Runs movie request
        request("http://www.omdbapi.com/?t=" + value + "&y=&plot=short&apikey=742bef6d", function (error, response, body) {

            //Succesfull request 200
            if (value != false) {

                // Parse the body data
                console.log("======================================================================");
                console.log("Title: " + JSON.parse(body).Title);
                console.log("Release Year: " + JSON.parse(body).Year);
                console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
                console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
                console.log("Country where move was produced: " + JSON.parse(body).Country);
                console.log("Language of the movie: " + JSON.parse(body).Language);
                console.log("Plot of the movie: " + JSON.parse(body).Plot);
                console.log("Actors in the movie: " + JSON.parse(body).Actors);
            } else {

                //Mr. Nobody if no user input for movie search     
                // var request = require("request");

                request("http://www.omdbapi.com/?t=mr+nobody&y=&plot=short&tomatoes=true&r=json", function (error, response, body) {

                    // Parses through the body data.
                    console.log("======================================================================");
                    console.log("Title: " + JSON.parse(body).Title);
                    console.log("Release Year: " + JSON.parse(body).Year);
                    console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
                    console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
                    console.log("Country where move was produced: " + JSON.parse(body).Country);
                    console.log("Language of the movie: " + JSON.parse(body).Language);
                    console.log("Plot of the movie: " + JSON.parse(body).Plot);
                    console.log("Actors in the movie: " + JSON.parse(body).Actors);

                });
            }
        });
    }


                //do-what-it-says____________________

                function dwis() {

                    //FS npm package
                    var fs = require("fs");

                    // Reads from the "random.txt" file 
                    fs.readFile("random.txt", "utf8", function (error, data) {

                        data = data.split(",");

                        var command;
                        var parameter;

                        // for (var i = 0; i < data.length; i++) {
                        //     result = data[i];
                        // }
                        if (data.length == 2) {
                            command = data[0];
                            parameter = data[1];
                            // console.log(command);
                            // console.log(parameter);
                        }

                        //console.log(result);

                        // if (result != false) {
                        parameter = parameter.replace('"', '');
                        parameter = parameter.replace('"', '');
                        // console.log(parameter);

                        switch (command) {
                            case "my-tweets":
                                value = parameter;
                                twitter();
                                break;

                            case "spotify-this-song":
                                value = parameter;
                                spotify();
                                break;

                            case "movie-this":
                                value = parameter;
                                imdb();
                                break;
                        }
                    })
                }
            })