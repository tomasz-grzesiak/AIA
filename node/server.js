const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const routing = require('./routing');
const dbManager = require('./dbmanager');

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
        req.session.message = '';
        req.session.choice = false;
        req.session.deletedCount = 0;
        console.log('created cart');
    }
    next();
});

app.use('/', routing);
dbManager.createConnection();
console.log("Connected to database")
dbManager.createDatabase().then(result => {
    console.log("Data ready to use");
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}/ ...`);
    });
}).catch(error => {
    console.log("Database filling currupted");
    throw error;
});