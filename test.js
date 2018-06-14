
var natural = require('natural');
var fs = require('fs');
var parse = require('csv-parse');
var distance = require('word2vec-native');
var w2v = require('node-word2vec');
var path = require('path');
var classifier = new natural.BayesClassifier();
var tokenizer = new natural.WordTokenizer();
var myObj = {};
var j = 0;
var messageArray = [];
var messageList = JSON.parse(fs.readFileSync('./messageObject.json', 'utf8'));
//var messageList = JSON.parse(data);
var fileBin = path.normalize('./GoogleNews-vectors-negative300.bin');

function test() {
    for (var key in messageList) {
        j++;
        var logged = tokenizer.tokenize(messageList[key].Message);
        //console.log(logged);
        //for (var i = 0; i < logged.length; i++) {
                messageArray.push(logged);
                //messageArray[j].push(messageList[key].Moderator);
        //}
    }
    console.log(messageArray);
}


function sentimentJson() {
    //23 message, 24 sentiment
    var parser = parse({
        delimiter: ','
    }, function (err, data) {
        for (var i = 0; i < data.length; ++i) {
            myObj[i] = {
                Message: data[i][23],
                Moderator: data[i][30]
            };
        }
        var writing = JSON.stringify(myObj);
        fs.writeFile(__dirname + '/messageObject.json', writing, function (err) {});
    });
    console.log('finished loading messages');
    //read in companies here to  add company notes
    fs.createReadStream(__dirname + '/messages.csv').pipe(parser);
}

function toVecTest(){
    distance.open('./GoogleNews-vectors-negative300.bin', function(err, data){
        if(!err){
            console.log(distance.compare("hoodie","umbrella"));
            console.log(distance.get("business"));
           
        }
    });
}



var natural = require('natural');
var fs = require('fs');
var parse = require('csv-parse');
var distance = require('word2vec-native');
var w2v = require('node-word2vec');
var path = require('path');
var classifier = new natural.BayesClassifier();
var tokenizer = new natural.WordTokenizer();
var myObj = {};
var j = 0;
var messageArray = [];
var messageList = JSON.parse(fs.readFileSync('./messageObject.json', 'utf8'));
//var messageList = JSON.parse(data);
var fileBin = path.normalize('./GoogleNews-vectors-negative300.bin');

function test() {
    for (var key in messageList) {
        j++;
        var logged = tokenizer.tokenize(messageList[key].Message);
        //console.log(logged);
        //for (var i = 0; i < logged.length; i++) {
                messageArray.push(logged);
                //messageArray[j].push(messageList[key].Moderator);
        //}
    }
    console.log(messageArray);
}


function sentimentJson() {
    //23 message, 24 sentiment
    var parser = parse({
        delimiter: ','
    }, function (err, data) {
        for (var i = 0; i < data.length; ++i) {
            myObj[i] = {
                Message: data[i][23],
                Moderator: data[i][30]
            };
        }
        var writing = JSON.stringify(myObj);
        fs.writeFile(__dirname + '/messageObject.json', writing, function (err) {});
    });
    console.log('finished loading messages');
    //read in companies here to  add company notes
    fs.createReadStream(__dirname + '/messages.csv').pipe(parser);
}

function toVecTest(){
    distance.open('./GoogleNews-vectors-negative300.bin', function(err, data){
        if(!err){
            console.log(distance.compare("hoodie","umbrella"));
            console.log(distance.get("business"));
           
        }
    });
}


toVecTest();