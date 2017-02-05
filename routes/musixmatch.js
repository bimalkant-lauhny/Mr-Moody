const assert = require('assert');
const pythonShell = require('python-shell');
const jsonp = require('node-jsonp');
const fs = require('fs');

var apiUrl = "https://api.musixmatch.com/ws/1.1/matcher.lyrics.get?format=jsonp&callback=callback&apikey=a8f43200bf2692c6b462a99528e41b98";

exports.getMusixmatchSearchRes = function (trackObj, callback) {
    jsonp(apiUrl + "&q_artist=" + trackObj['artist'] + "&q_track=" + trackObj['title'], function (data) {
        console.log(data);
        if (data['message']['header']['status_code'] != 200) {
            callback(new Error('Bad Response Error!')); 
        } /* else {
            var body = data['message']['body']; 
            var lyrics = body['lyrics']['lyrics_body'];
            console.log(lyrics);
            fs.writeFile("./python-scripts/lyrics", lyrics, 
                function (err) {
                    assert.equal(null, err);
                    pythonShell.run('./python-scripts/hello.py', function (err, res) {
                        if (err) {
                            throw err;
                        }
                        callback(null, res)
                    });    
                });
        } */
    });
};
