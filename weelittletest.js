var fs = require('fs');
fs.readFile('database.json', function (err, data) {
    if (err) {
        console.log("oops!");
    } else {
        database = JSON.parse(data);
        console.log(database);
        for(i in database){
            console.log(database[i].Question);
        }
    }
});
