const express = require('express');
const fs = require('fs');
const app = express();
const d = new Date();
const csv = require('csvtojson');

app.set('json spaces', 2);

app.use((req, res, next) => {
    let agent =  req.header('User-Agent').replace(',' , '');
    let time = d.toISOString();
    let method = req.method;
    let resource = req.path;
    let version = ('HTTP/' + req.httpVersion);
    let status = 200;
    let data = agent + ',' + time + ',' +   method + ',' + resource + ',' + version + ',' + status + '\n';
    console.log(data);

fs.appendFile('./server/log.csv' , data , 'utf8' ,
    function(err){
        if (err) throw err;
        next();
    })
})



// // write your logging code here
app.get('/', (req, res) => {

// write your code to respond "ok" here
res.send('ok');
})

// // write your code to return a json object containing the log data here
app.get('/logs', (req, res) => {
        csv()
    .fromFile('./server/log.csv')
    .then((csvObj)=>{
    res.send(csvObj)
    });
});

module.exports = app;