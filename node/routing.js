const express = require('express');
const dbManager = require('./dbmanager');
const asyncLock = require('async-lock');
const router = express.Router();

let planets = [];

router.get('/', (req, res) => {
    dbManager.getAllPlanets().then(result => {
        planets = result;
        res.render('index', {planets: planets});
    });
});

router.get('/cart', (req, res) => {
    res.render('cart', {planets: req.session.cart});
});


router.get('/status', (req, res) =>
    res.render('status', {message: req.session.message, choice: req.session.choice}));

router.post('/addPlanet', (req, res) => {
    const inDB = planets.find(planet => planet.id === parseInt(req.body.planetId));
    const exists = req.session.cart.find(planet => planet.id === parseInt(req.body.planetId));
    if (!inDB) {
        req.session.message = 'Planet was already bought by someone else :(';
        if (exists)
            req.session.cart = req.session.cart.filter(planet => planet.id !== parseInt(req.body.planetId))
    } else if (exists) {
        req.session.message = 'Planet is already in your shopping cart';
    }
    else {
        req.session.cart.push(inDB);
        req.session.message = 'Planet was added to your shopping cart';
    }
    req.session.choice = true;
    res.redirect('/status');
});

router.post('/removePlanet',(req, res) => {
    req.session.cart = req.session.cart.filter(planet => planet.id !== parseInt(req.body.planetId));
    req.session.message = 'Planet was removed from your shopping cart';
    req.session.choice = true;
    res.redirect('/status')
});

router.post('/finalize', (req, res) => {
    const lock = new asyncLock();
    //lock.acquire('secretkey', () => {return
    dbManager.deletePlanets(req.session.cart).then(result => {
        console.log(result);
        if (result === req.session.cart.length) {
            req.session.message = `Congratulations! You're now proud owner of ${req.session.cart.length} planets.`;
            req.session.choice = false;
        } else {
            req.session.message = `Oh no! Some of your planets were just taken. Better luck with others`;
            req.session.choice = true;
        }
        req.session.cart = [];
        res.redirect('/status');
    });
});

router.post('/discard', (req, res) => {
    req.session.cart = [];
    req.session.message = 'Alright...  not even one?';
    req.session.choice = false;
    res.redirect('/status');
});



module.exports = router;