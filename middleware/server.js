//Initialising node modules
var express = require("express");
var bodyParser = require("body-parser");

var sql = require("mssql");
var app = express();
var fs = require("fs"),
    json;
const sqlFolder = './sql/';


var localDB = "./magris.sqlite";
var exists = fs.existsSync(localDB);
if(!exists) {
 fs.openSync(localDB, "w");
}
var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database(localDB);
var tables = ["articles", "merceologicalCategories", "homogeneousCategories", "familyCategories"];
var namesForServices = ["Articles", "MerceologicalCategories", "HomogeneousCategories", "FamilyCategories"];

db.serialize(function() {
    //FIRST INIT 
    for (var i in tables){
        db.run('CREATE TABLE IF NOT EXISTS "' + tables[i] + '" ("value" TEXT NOT NULL, "updatetime" DATETIME NOT NULL )');
    }
});

function readFile(filepath, encoding){

    if (typeof (encoding) == 'undefined'){
        encoding = 'utf8';
    }
    var file = fs.readFileSync(filepath, encoding);
    //return JSON.parse(file);
    return file;
}

function getFile(filename){
    var filepath = __dirname + '/' + filename;
    return readFile(filepath);
}

// Body Parser Middleware
app.use(bodyParser.json({limit: '50mb'})); 
app.use(bodyParser.urlencoded({extended: true})); // to support URL-encoded bodies 



//CORS Middleware
app.use(function (req, res, next) {
    //Enabling CORS 
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization");
    next();
});

//Initialising connection string
var dbConfig = {
    user:  "reader",
    password: "R2uSUuv4srwAvCfpLofh",
    server: "server-sql",
    database:"MAGRIS"    
};

var connection = new sql.Connection(dbConfig);
connection.connect();
//Function to connect to database and execute query
var executeQuery = function(res, sqlquery){   
    var request = new sql.Request(connection);
    request.query(sqlquery, function (err, recordset) {
        if (err) {
            console.log("Error while querying database :- " + err);
            res.send(err);
        }
        else {
            res.send(recordset);
        }
    }); 
}

app.get('/node/express/api/getResource', (req, res) => {
    //var tableName = 'articles';
    var tableName = req.param('resourceName');
    db.all('select "value", "updatetime" FROM "' + tableName + '" ORDER BY "updatetime" DESC',
    function (err, row){
        if (err){
            res.status(500);
        } else {
            if (row.length > 0){
                var p = JSON.parse(row[0].value);
                res.send(p);
            }
            else{
                res.send({});
            }
        }
    });
});
    
app.post('/node/express/api/setResource', function(req, res){
    //var tableName = 'articles';
    var requestValue = req.body.value;
    var tableName = req.body.resourceName;
    var timestamp = new Date();
    var timestampstring = timestamp.toISOString();
    db.run('DELETE FROM "' + tableName + '"', function(err, row) {
        if (err){
            console.log("being in error");
            res.status(500);
        }
        else{
            db.run('INSERT INTO "' + tableName + '" ("value", "updatetime") VALUES (?,?)', [JSON.stringify(requestValue), timestampstring],
            function (err, row){
                if (err){
                    res.status(500);
                }else {            
                    res.end('true');
                }
            });
        }
    });
});

//GENERATES WS FOR EACH QUERY FOUND IN SQL FOLDER
fs.readdirSync(sqlFolder).forEach(file => {
    app.get("/node/express/api/" + file.split('.', 1), function(req , res){
        var query = getFile('sql/' + file);
        executeQuery(res, query);
    });
})

 var server = app.listen(process.env.PORT || 3000, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
 });