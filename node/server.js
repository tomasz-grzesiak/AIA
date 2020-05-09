const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();

const port = 8000;

// express app setup
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(__dirname + '/styles/'));
app.use(express.static(__dirname + '/rsrc/'));

app.use(session({
    name: 'session',
    secret: 'spacesloth',
    resave: true,
    saveUninitialized: true
}));

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}: ${new Date()}`);
    if (!req.session.cart) {
        req.session.cart = [];
        console.log('created cart');
    }
    next();
});


// database setup
const con = mysql.createConnection({
    host: "localhost",
    user: "spacesloth",
    password: "spacesloth",
    database: "planetsdb"
});

con.connect(err => {
    if (err) throw err;
});

createDatabase(true);
let planets = [];



// request handling
app.get('/', (req, res) => {
    con.query('SELECT * FROM planets', (err, result) => {
        if (err) throw err;
        planets = result;
        res.render('index', {planets: planets});
    });
});

app.get('/cart', (req, res) => {
   res.render('cart', {planets: req.session.cart});
});

app.get('/status', (req, res) => {
    res.render('status');
});

app.get('/finalizeStatus', (req, res) => {
   const planetsLength = req.session.cart.length;
   req.session.cart = [];
   res.render('finalizeStatus', {planetsLength: planetsLength});
});

app.get('/discardStatus', (req, res) =>{
    res.render('discardStatus')
});

app.post('/addPlanet', (req, res) => {
    req.session.cart.push(planets.find(planet => planet.id === parseInt(req.body.planetId)));
    res.redirect('/status');
});

app.post('/removePlanet',(req, res) => {
    req.session.cart = req.session.cart.filter(planet => planet.id !== parseInt(req.body.planetId));
    res.redirect('/status')
});

app.post('/finalize', (req, res) => {
    //TODO remove planets from database
    res.redirect('/finalizeStatus');
});

app.post('/discard', (req, res) => {
   req.session.cart = [];
   res.redirect('/discardStatus');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/ ...`);
});

function createDatabase(dropExisting) {
    if (dropExisting)
        con.query('DROP TABLE planets', err => {
            if (err) throw err;
        });
    con.query('CREATE TABLE planets (id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY, name VARCHAR(50) NOT NULL, price DECIMAL(6, 2) NOT NULL)',
        err => {
            if (err) throw err;
        });
    con.query(`INSERT INTO planets (name, price) VALUES ('Mercury', 23.50)`,
        err => {
            if (err) throw err;
        });
    con.query(`INSERT INTO planets (name, price) VALUES ('Jupyter', 267.20)`,
        err => {
            if (err) throw err;
        });
    con.query(`INSERT INTO planets (name, price) VALUES ('Uranus', 175.45)`,
        err => {
            if (err) throw err;
        });
    con.query(`INSERT INTO planets (name, price) VALUES ('Pluto', 50.00)`,
        err => {
            if (err) throw err;
        });
    con.query(`INSERT INTO planets (name, price) VALUES ('Venus', 74.80)`,
        err => {
            if (err) throw err;
        });
    con.query(`INSERT INTO planets (name, price) VALUES ('Mars', 63.75)`,
        err => {
            if (err) throw err;
        });
}