const request = require('request');
const assert = require('assert');

var apiKey = '57ee3318536b23ee81d6b27e36997cde';
var apiUrl = "http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&format=json";

exports.getLastfmSearchRes = function (user, callback) {
    request(apiUrl + "&api_key=" + apiKey + "&user=" + user,
        function (err, response, body) {
            assert.equal(null, err);
            if (response.statusCode != 200) {
                callback(new Error("Bad Status: " + response.statusCode)); 
            } else {
                callback(null, filterResults(body)); 
            }
    });
};

function filterResults(body) {
    body = JSON.parse(body);
    var recentTracks= body['recenttracks'];
    var tracksArray = recentTracks['track'];
    
    var songDetails = [];

    for (let track of tracksArray) {
       songDetails.push({
           "artist": track['artist']['#text'],  
           "title": track['name'] 
       }); 
    }

    return songDetails;
};

