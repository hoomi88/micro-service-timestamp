// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/:myTime?", function (req, res) {
  
  let myTime = req.params.myTime;  
  //let regex = /-/g;
  let findRes;
  let fullDate;
  let timestamp;
  let date;
  console.log(findRes);
  if (myTime === 0 || myTime == null) {
    date = new Date();
  } else {  
    //findRes = myTime.search(regex);
    if (myTime.length == 13) {      
      date = new Date(Number(myTime));  
    } else {
      date = new Date(myTime);    
    }
  }
  console.log(date);
  if (date == "Invalid Date"){
    res.json({error : "Invalid Date"});
  } else {
    fullDate = date.toUTCString();
    timestamp = Date.parse(date)
    console.log(fullDate);  
    console.log(timestamp);
    res.json({"unix": timestamp, "utc": fullDate });
  }
});


//[project url]/api/2015-12-25
//[project url]/api/1451001600000
//{"unix":1451001600000, "utc":"Fri, 25 Dec 2015 00:00:00 GMT"}

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
