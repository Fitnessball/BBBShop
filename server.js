// set up ========================
var express = require('express');
var app = express();                               // create our app w/ express
var path = require('path');
var mysql = require('mysql');
var cors = require('cors');
var socket = require('socket.io');
const string_decoder = require("string_decoder");
const allowCrossDomain = (req, res, next) => {
      res.header(`Access-Control-Allow-Origin`, `*`);
      res.header(`Access-Control-Allow-Methods`, `GET,PUT,POST,DELETE`);
      res.header(`Access-Control-Allow-Headers`, `Content-Type`);
      next();
};



bodyParser = require('body-parser');

// support parsing of application/json type post data
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());
app.use(allowCrossDomain);

// configuration =================
app.use(express.static(path.join(__dirname, '/dist/BBBShop/browser')));  //TODO rename to your app-name

// listen (start app with node server.js) ======================================
var server = app.listen(8080, function () {
      console.log("App listening on port 8080");
});

//START websockets

var io = socket(server)
io.on('connection',(socket)=>{
  socket.on('goUpdateTicketCounter',(counter,v_nr)=>{
      io.emit('updateTicketCounter',counter,v_nr);
  });
  socket.on('goUpdatePlaetze',(currentIndex)=>{
    io.emit('updatePlaetze',currentIndex);
});
  
  socket.on('createConnection',(msg)=>{
    io.emit('updateTicketCounter');
});

});
//END websockets

// application -------------------------------------------------------------
app.get('/', function (req, res) {
      res.sendFile('index.html', { root: __dirname + '/dist/BBBShop/browser' });    //TODO rename to your app-name
});
var con = mysql.createConnection({
  database: "d0406613",
  host: "w013fda3.kasserver.com",
  port: "3306",
  user: "d0406613",
  password: "CWAGP8K9Jqf5zqGpb85b"
});
con.connect((err) => {
  if (err) {
    console.error('Error connecting: ' + err.stack);
    return;
  }
  console.log('Connected as id ' + con.threadId);
});

con.on('error', (err) => {
  console.error('Database error: ' + err);
  if (err.code === 'PROTOCOL_CONNECTION_LOST') {
    handleDisconnect(); // Reconnect if the connection is lost
  } else {
    throw err;  // Fatal error, rethrow
  }
});

function handleDisconnect() {
  con = mysql.createConnection(con.config);
  con.connect((err) => {
    if (err) {
      console.error('Error reconnecting: ' + err.stack);
      setTimeout(handleDisconnect, 2000); // Try to reconnect after 2 seconds
    }
  });
}
app.get('/loadartikel', function (req, res) {
  const query = "SELECT * FROM artikelliste";
  con.query(query, function (error, results) {
    if (error) throw error;
    const artikel = results.reduce((acc, row) => {
        acc.push({
          a_nr: row.a_nr,
          r_nr: row.r_nr,
          artikel: row.artikel,
          kategorie: row.kategorie,
          anzahl: row.anzahl,
          gebinde: row.gebinde,
        });
      return acc;
    }, []);
    res.json(artikel);
    console.log(artikel)
}
);
  });