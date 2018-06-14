
/*var w2v = require('word2vector');
w2v.load("./GoogleNews-vectors-negative300.bin");
var a = w2v.getNeighbors(w2v.getVector("interview"), {N: 4});
var b = w2v.getNeighbors(w2v.getVector("interview"), {N: 4, returnType: "Object"});
//var c = w2v.getNeighbors(w2v.options.1)
console.log(a);
console.log(b);
console.log(w2v.getSimilarWords("interview", {N:4, returnType: "Object"}));*/

var distance = require('word2vec-native');
var w2v = require('node-word2vec');
var sw = require('stopword');
var stringSimilarity = require('string-similarity');
var natural = require('natural');
var fs = require('fs');
var og1 = 'What time is the interview'.split(' ');
var og2 = 'Can I wear a hoodie to the interview'.split(' ');
var r1 = sw.removeStopwords(og1).toString();
var r2 = sw.removeStopwords(og2).toString();
var p1 = r1.replace(/,/g, ' ');
var p2 = r2.replace(/,/g, ' ');
var wearTrainingArray = {};
var wink = require('wink-nlp-utils');
var winkDistance = require('wink-distance');
var now = require("performance-now");

/*
var dog = ['the','dog','chased','the','cat']
var wank = wink.tokens.bow(dog);
var cat = ['the','cat','chased', 'the','mouse']
var wank2 = wink.tokens.bow(cat);



console.log(wank);
console.log(wank2);

console.log(winkDistance.bow.cosine(wank, wank2));

let ss = require('sentence-similarity')
 
let similarity = ss.sentenceSimilarity;
let similarityScore = ss.similarityScore;
 
var start = new Date();

var time = new Date() - start;

function timer(script){
    var start = new Date();
    script();
    return new Date() - start;
}

time = timer(function(){
let s1 = ['how','close','is','this','to','that']
let s2 = ['these','two','are','not','that','close']

let s3 = ['what','time','is','the','interview']
let s4 = ['when','is','the','interview']

let winkOpts = { f: similarityScore.winklerMetaphone, options : {threshold: 0} }
 
var logged = similarity(s1,s2,winkOpts);
    console.log(logged);
//console.log("======== this is a breaker =======");
var logged2 = similarity(s3,s4,winkOpts);
});
*/
var start = now();
let ss = require('sentence-similarity')
let similarity = ss.sentenceSimilarity;
let similarityScore = ss.similarityScore;
let winkOpts = { f: similarityScore.winklerMetaphone, options : {threshold: 0} }

stringToArray = function(str){
    return str.trim().split(" ");
};

fs.readFile('wearTraining.txt', function(err, data){
    if(err) throw err;
    wearTrainingArray = data.toString().split("\n");
    for(i in wearTrainingArray) {
        console.log(wearTrainingArray[i]);
    }
});


for(i in wearTrainingArray){
    let a = stringToArray(wearTrainingArray[i]);
    let b = stringToarray(wearTrainingArray[i + 1]);
    console.log(similarity(a,b,winkOpts));
}

var end = now();
console.log((end-start).toFixed(3));
/*
var start = now();

let ss = require('sentence-similarity')
let similarity = ss.sentenceSimilarity;
let similarityScore = ss.similarityScore;

let s1 = ['how','close','is','this','to','that']
let s2 = ['these','two','are','not','that','close']

let s3 = ['what','time','is','the','interview']
let s4 = ['when','is','the','interview']

let winkOpts = { f: similarityScore.winklerMetaphone, options : {threshold: 0} }
 
var logged = similarity(s1,s2,winkOpts);
var logged2 = similarity(s3,s4,winkOpts);
console.log(logged);
console.log(logged2);
var end = now();


console.log((end-start).toFixed(3));

/*
function read(file, callback){
    fs.readFile(file, 'utf8', function(err, data){
        if (err){
            console.log(err);
        }
        callback(data);
    });
}

var output = read('interviewTimeTraining.txt', function(data){
    //console.log(data);
    timeTrainingArray = data.split(',');
    //console.log(trainingArray);
});

var output2 = read('wearTraining.txt', function(data1){
    console.log(data1);
    wearTrainingArray = data1.split(',');
});
console.log(wearTrainingArray);
var classifier = new natural.BayesClassifier();

classifier.addDocument(timeTrainingArray,'interview time');
classifier.addDocument(wearTrainingArray,'what to wear');
classifier.train();

//console.log(classifier.classify('Time of the interview')); 
console.log(classifier.classify('Clothes for interview')); 


console.log(p1);
console.log(p2);

var similarity = stringSimilarity.compareTwoStrings(p1, p2);
console.log(similarity);

*/

/*
console.log("====== natural testing to follow ======");

var classifier = new natural.BayesClassifier();

classifier.addDocument('What time is the interview', 'looking for interview time');
classifier.addDocument('Time of interview', 'looking for interview time');
classifier.addDocument('interview time', 'looking for interview time');
classifier.addDocument('what time does the interview start', 'looking for interview time');
classifier.addDocument('When to go for interview', 'looking for interview time');
classifier.addDocument('When is the interview', 'looking for interview time');
classifier.addDocument('time that the interview starts', 'looking for interview time');
classifier.addDocument('What can I wear', 'what to wear');
classifier.addDocument('what shal I wear', 'what to wear');
classifier.addDocument('What to wear', 'what to wear');
classifier.addDocument('Can I wear jeans', 'what to wear');
classifier.addDocument('Can I wear a hoodie', 'what to wear');
classifier.addDocument('Clothes for interview', 'what to wear');
classifier.addDocument('what should I wear', 'what to wear');
classifier.addDocument('what can we wear to the interview', 'what to wear');

classifier.train();
console.log(classifier.classify('Time of the interview'));
console.log(classifier.classify('can wear to'));
*/

/*distance.open('./GoogleNews-vectors-negative300.bin', function(err, data){
      if(!err){
          console.log(distance.compare("hoodie","umbrella"));
          console.log(distance.get("business"));
         
      }

/*var w2v = require('word2vector');
w2v.load("./GoogleNews-vectors-negative300.bin");
var a = w2v.getNeighbors(w2v.getVector("interview"), {N: 4});
var b = w2v.getNeighbors(w2v.getVector("interview"), {N: 4, returnType: "Object"});
//var c = w2v.getNeighbors(w2v.options.1)
console.log(a);
console.log(b);
console.log(w2v.getSimilarWords("interview", {N:4, returnType: "Object"}));*/

var distance = require('word2vec-native');
var w2v = require('node-word2vec');
var sw = require('stopword');
var stringSimilarity = require('string-similarity');
var natural = require('natural');
var fs = require('fs');
var og1 = 'What time is the interview'.split(' ');
var og2 = 'Can I wear a hoodie to the interview'.split(' ');
var r1 = sw.removeStopwords(og1).toString();
var r2 = sw.removeStopwords(og2).toString();
var p1 = r1.replace(/,/g, ' ');
var p2 = r2.replace(/,/g, ' ');
var wearTrainingArray = {};
var wink = require('wink-nlp-utils');
var winkDistance = require('wink-distance');
var now = require("performance-now");

/*
var dog = ['the','dog','chased','the','cat']
var wank = wink.tokens.bow(dog);
var cat = ['the','cat','chased', 'the','mouse']
var wank2 = wink.tokens.bow(cat);



console.log(wank);
console.log(wank2);

console.log(winkDistance.bow.cosine(wank, wank2));

let ss = require('sentence-similarity')
 
let similarity = ss.sentenceSimilarity;
let similarityScore = ss.similarityScore;
 
var start = new Date();

var time = new Date() - start;

function timer(script){
    var start = new Date();
    script();
    return new Date() - start;
}

time = timer(function(){
let s1 = ['how','close','is','this','to','that']
let s2 = ['these','two','are','not','that','close']

let s3 = ['what','time','is','the','interview']
let s4 = ['when','is','the','interview']

let winkOpts = { f: similarityScore.winklerMetaphone, options : {threshold: 0} }
 
var logged = similarity(s1,s2,winkOpts);
    console.log(logged);
//console.log("======== this is a breaker =======");
var logged2 = similarity(s3,s4,winkOpts);
});
*/
var start = now();
let ss = require('sentence-similarity')
let similarity = ss.sentenceSimilarity;
let similarityScore = ss.similarityScore;
let winkOpts = { f: similarityScore.winklerMetaphone, options : {threshold: 0} }

stringToArray = function(str){
    return str.trim().split(" ");
};

fs.readFile('wearTraining.txt', function(err, data){
    if(err) throw err;
    wearTrainingArray = data.toString().split("\n");
    for(i in wearTrainingArray) {
        console.log(wearTrainingArray[i]);
    }
});


for(i in wearTrainingArray){
    let a = stringToArray(wearTrainingArray[i]);
    let b = stringToarray(wearTrainingArray[i + 1]);
    console.log(similarity(a,b,winkOpts));
}

var end = now();
console.log((end-start).toFixed(3));
/*
var start = now();

let ss = require('sentence-similarity')
let similarity = ss.sentenceSimilarity;
let similarityScore = ss.similarityScore;

let s1 = ['how','close','is','this','to','that']
let s2 = ['these','two','are','not','that','close']

let s3 = ['what','time','is','the','interview']
let s4 = ['when','is','the','interview']

let winkOpts = { f: similarityScore.winklerMetaphone, options : {threshold: 0} }
 
var logged = similarity(s1,s2,winkOpts);
var logged2 = similarity(s3,s4,winkOpts);
console.log(logged);
console.log(logged2);
var end = now();


console.log((end-start).toFixed(3));

/*
function read(file, callback){
    fs.readFile(file, 'utf8', function(err, data){
        if (err){
            console.log(err);
        }
        callback(data);
    });
}

var output = read('interviewTimeTraining.txt', function(data){
    //console.log(data);
    timeTrainingArray = data.split(',');
    //console.log(trainingArray);
});

var output2 = read('wearTraining.txt', function(data1){
    console.log(data1);
    wearTrainingArray = data1.split(',');
});
console.log(wearTrainingArray);
var classifier = new natural.BayesClassifier();

classifier.addDocument(timeTrainingArray,'interview time');
classifier.addDocument(wearTrainingArray,'what to wear');
classifier.train();

//console.log(classifier.classify('Time of the interview')); 
console.log(classifier.classify('Clothes for interview')); 


console.log(p1);
console.log(p2);

var similarity = stringSimilarity.compareTwoStrings(p1, p2);
console.log(similarity);

*/

/*
console.log("====== natural testing to follow ======");

var classifier = new natural.BayesClassifier();

classifier.addDocument('What time is the interview', 'looking for interview time');
classifier.addDocument('Time of interview', 'looking for interview time');
classifier.addDocument('interview time', 'looking for interview time');
classifier.addDocument('what time does the interview start', 'looking for interview time');
classifier.addDocument('When to go for interview', 'looking for interview time');
classifier.addDocument('When is the interview', 'looking for interview time');
classifier.addDocument('time that the interview starts', 'looking for interview time');
classifier.addDocument('What can I wear', 'what to wear');
classifier.addDocument('what shal I wear', 'what to wear');
classifier.addDocument('What to wear', 'what to wear');
classifier.addDocument('Can I wear jeans', 'what to wear');
classifier.addDocument('Can I wear a hoodie', 'what to wear');
classifier.addDocument('Clothes for interview', 'what to wear');
classifier.addDocument('what should I wear', 'what to wear');
classifier.addDocument('what can we wear to the interview', 'what to wear');

classifier.train();
console.log(classifier.classify('Time of the interview'));
console.log(classifier.classify('can wear to'));
*/

/*distance.open('./GoogleNews-vectors-negative300.bin', function(err, data){
      if(!err){
          console.log(distance.compare("hoodie","umbrella"));
          console.log(distance.get("business"));
         
      }

  });*/