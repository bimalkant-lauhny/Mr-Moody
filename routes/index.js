var express = require('express');
var router = express.Router();

var lastfm = require('./lastfm');
var musixmatch = require('./musixmatch');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Mr-Moody' });
});

router.post('/get-user', function (req, res, next) {
    var user = req.body.username;
    lastfm.getLastfmSearchRes(user, function (err, response) {
        if (err) { 
           throw err;
        }
        if (response.length === 0) {
            res.render('visual', {username: user, details: "No Last Played Songs!"});
        } else {
            console.log(response);
            for (let track of response) {
                musixmatch.getMusixmatchSearchRes(track, function (err, results) {
                    if (err) {
                        throw err;
                    }
                    console.log(results); 
                });
            }
        }
    });
    res.render('visual', {username: req.body.username}); 
});

module.exports = router;
