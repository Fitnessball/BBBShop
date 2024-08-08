var express = require('express');
var app = express();
var path = require('path');
var mysql = require('mysql');
var cors = require('cors');
var socket = require('socket.io');
var bodyParser = require('body-parser');

const allowCrossDomain = (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
};

// support parsing of application/json type post data
app.use(bodyParser.json());

// support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());
app.use(allowCrossDomain);

// configuration =================
app.use(express.static(path.join(__dirname, '/dist/BBBShop/browser'))); // TODO rename to your app-name

// listen (start app with node server.js) ======================================
var server = app.listen(8080, function () {
    console.log("App listening on port 8080");
});

// START websockets
var io = socket(server);
io.on('connection', (socket) => {
    socket.on('goUpdateTicketCounter', (counter, v_nr) => {
        io.emit('updateTicketCounter', counter, v_nr);
    });
    socket.on('goUpdatePlaetze', (currentIndex) => {
        io.emit('updatePlaetze', currentIndex);
    });
    socket.on('createConnection', (msg) => {
        io.emit('updateTicketCounter');
    });

    // Handle socket errors
    socket.on('error', (err) => {
        console.error('Socket error:', err);
    });

    // Handle socket disconnections
    socket.on('disconnect', (reason) => {
        console.log('Socket disconnected:', reason);
    });
});
// END websockets

// application -------------------------------------------------------------
app.get('/', function (req, res) {
    res.sendFile('index.html', { root: __dirname + '/dist/BBBShop/browser' }); // TODO rename to your app-name
});

var pool;

function createPool() {
    pool = mysql.createPool({
        connectionLimit: 10, // Adjust based on your needs
        host: "w013fda3.kasserver.com",
        port: "3306",
        user: "d0406613",
        password: "CWAGP8K9Jqf5zqGpb85b",
        database: "d0406613",
        connectTimeout: 10000, // 10 seconds
        acquireTimeout: 10000, // 10 seconds
        timeout: 10000 // 10 seconds
    });

    pool.on('connection', (connection) => {
        console.log('Database connection established');
        connection.on('error', (err) => {
            console.error('Database connection error:', err);
            if (err.code === 'PROTOCOL_CONNECTION_LOST' || err.code === 'ECONNRESET') {
                console.error('Connection lost or reset, recreating pool...');
                recreatePoolWithBackoff(); // Use the backoff strategy
            } else {
                throw err; // Fatal error, rethrow
            }
        });
    });

    pool.on('error', (err) => {
        console.error('Pool error:', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST' || err.code === 'ECONNRESET') {
            console.error('Pool connection lost or reset, recreating pool...');
            recreatePoolWithBackoff(); // Use the backoff strategy
        } else {
            throw err; // Fatal error, rethrow
        }
    });
}

let backoffDelay = 1000; // Start with 1 second

function recreatePoolWithBackoff() {
    setTimeout(() => {
        createPool();
        console.log('Pool recreated');
        backoffDelay = Math.min(backoffDelay * 2, 60000); // Exponential backoff with a max delay of 60 seconds
    }, backoffDelay);
}

createPool();

function executeQueryWithRetry(query, retries = 3) {
    return new Promise((resolve, reject) => {
        const attemptQuery = (retryCount) => {
            pool.query(query, (error, results) => {
                if (error) {
                    if (retryCount <= 1) {
                        return reject(error);
                    }
                    console.warn(`Retrying query... (${retries - retryCount + 1}/${retries})`);
                    setTimeout(() => attemptQuery(retryCount - 1), 2000); // Wait 2 seconds before retrying
                } else {
                    resolve(results);
                }
            });
        };

        attemptQuery(retries);
    });
}

app.get('/loadartikel', async function (req, res) {
    const query = "SELECT * FROM artikelliste ORDER BY artikel";
    try {
        const results = await executeQueryWithRetry(query);
        const artikel = results.map(row => ({
            a_nr: row.a_nr,
            r_nr: row.r_nr,
            artikel: row.artikel,
            kategorie: row.kategorie,
            anzahl: row.anzahl,
            gebinde: row.gebinde,
        }));
        res.json(artikel);
        console.log(artikel);
    } catch (error) {
        console.error('Query error: ' + error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/setcounter', function (req, res) {
    const sql = "UPDATE artikelliste SET anzahl = ? WHERE a_nr = ?;";
    const { anzahl, index } = req.body;

    pool.query(sql, [anzahl, index], function (err, result) {
        if (err) {
            console.error(err);
            res.status(500).send({ error: 'Database query failed' });
            return;
        }
        res.status(200).send({ message: 'Records updated' });
    });
});
