var fs = require('fs');
var wearTrainingArray = {};
var wink = require('wink-nlp-utils');
var winkDistance = require('wink-distance');
var now = require("performance-now");
var start = now();
var results = [];
//var jsonArray = require('database.json');
var wordScores = [];
var database = [];
let ss = require('sentence-similarity')
let similarity = ss.sentenceSimilarity;
let similarityScore = ss.similarityScore;
let winkOpts = {
    f: similarityScore.winklerMetaphone,
    options: {
        threshold: 0
    }
}
var bestQuestion = [];
var prompt = require('prompt');

stringToArray = function (str) {
    return str.trim().split(" ");
};

findHighestScore = function (array, key, value) {
    for (i in array) {
        if (array[i][key] === value) {
            return array[i];
        }
    }
    return null;
}

getMaxValue = function (numArray) {
    return Math.max.apply(null, numArray);
}

prompt.start();

prompt.get(['question'], function (err, result) {
    console.log(' sentence given: ' + result.question);
    fs.readFile('database.json', function (err, data) {
        //fs.readFile('sentence.json', function (err, data) {
        if (err) throw err;
        var found = false;
        let a = stringToArray(result.question.toLowerCase());
        database = JSON.parse(data);
        for (i in database) {
            console.log("=================");
            console.log(a.length);
            console.log(a);
            let b = database[i].Question;
            console.log(b);
            console.log(similarity(a, b, winkOpts));
            var object = similarity(a, b, winkOpts);
            results.push(object);
            console.log("=================");
            object.compare = b;
            if (b.toString() == a.toString()) {
                found = true;
                console.log("WE FOUND IT");
            }
        }
        /* var iObject = {
                        Question: b,
                        Answers: []
                    };
                    database.push(iObject);

                }

                        for (i in database) {
                               if (a === database[i].Question) {
                                found = true;
                                break;
                            } else {
                                found = false;
                            }
        }   console.log(found);*/ 
                if (found === true & a.length /*==<*/) {
                    //console.log("it was already there!!!!");
                } else {
                    console.log("im going to pop this in the array!!!!");
                   
                    var newObject = {
                        Question: a,
                        Answers: []
                    };
                    database.push(newObject);
                 
                }
        results.forEach(function (arrayItem) {
            wordScores.push(arrayItem.score);

        });
        //console.log(wordScores);
        var bestValue = getMaxValue(wordScores);
        var bestObj = findHighestScore(results, 'score', bestValue);
        //console.log(bestObj);
        //console.log(results);
        bestQuestion = bestObj.compare;
        //console.log("=====BEST QUESTION GOES HERE=====");
        //console.log(bestQuestion);
        //Get answer from user TESTING PURPOSES, Create or Ammend Object already existing in database
        prompt.get(['answer'], function (err, result) {
            //console.log(database);
            var found = false;
            var numberId = 0;
            var answerArray = [];
            var answerGiven = stringToArray(result.answer);
            //console.log(' answer for sentence given: ' + result.answer);
            for (i in database) {
                if (a.toString() == database[i].Question.toString()) {
                    found = true;
                    numberId = i;
                    //console.log(database[i].Question)
                    break;
                } 
            }
            if (found === true) {
                //console.log("That question was already there, so im adding the answer to it");
                var answerObj = {
                    Text: answerGiven,
                    Score: 0
                };
                //console.log(numberId);
                //console.log(database[numberId].Answers);
                var answerFound = false;
                var itsHere = 0;
               for(i in database[numberId].Answers){
                   //console.log(answerGiven.toString());
                   //console.log(database[numberId].Answers[i].Text.toString());
                  if(answerGiven.toString() == database[numberId].Answers[i].Text.toString()){
                       answerFound = true;
                       itsHere = i;
                       //console.log("Answer was found");
                       break;
                   } 
               } 
                if(answerFound === true){
                    //console.log("PLUS 1 SCORE!!!!");
                    //console.log(database[numberId].Answers[itsHere].Score);
                    database[numberId].Answers[itsHere].Score++;
                }else{
                    database[numberId].Answers.push(answerObj);
                }
        
            } else {
                //console.log("Adding it to the object " + numberId);
                var answerObj = {
                    Text: answerGiven,
                    Score: 0
                };
                //console.log(answerObj)
                answerArray.push(answerObj);

                questionObject = {
                    Question: bestQuestion,
                    Answers: answerArray
                };
                database.push(questionObject);

            }
            console.log(database[numberId]);
            var writing2 = JSON.stringify(database);
            fs.writeFile('database.json', writing2, function (err) {});
        });
    });
});