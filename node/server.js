const express = require('express');
const session = require('express-session');
const app = express();

const port = 8000;


app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/styles/'));
app.use(session({
    name: 'session',
    secret: 'spacesloth',
    resave: true,
    saveUninitialized: true
}));

// let planets = [];
let planets = [{id: 1, name: 'Pluto', cost: 85.20},
                {id: 2, name: 'Mars', cost: 23.76},
                {id: 3, name: 'Venus', cost: 348.10}];

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}: ${new Date()}`);
    if (!req.session.cart) {
        req.session.cart = [];
        console.log('created cart');
    }
    next();
});

app.get('/', (req, res) => {
    res.render('index', {planets: planets});
});

app.get('/status', (req, res) => {
    console.log(req.session.cart);
    res.render('status', {statusMessage: 'added to'})
});

app.post('/addPlanet', (req, res) => {
    req.session.cart.push('something');
    console.log("added planet");
    res.redirect('/status');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/ ...`);
});