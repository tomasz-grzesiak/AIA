const mysql = require('mysql');


const con = mysql.createConnection({
    host: "localhost",
    user: "spacesloth",
    password: "spacesloth",
    database: "planetsdb"
});


const createConnection = () => {
    con.connect(err => {
        if (err) throw err;
    });
};

const createDatabase = () => {
    return fetchData('SHOW TABLES', undefined).then(result => {
        if (result.length === 1 && result[0].Tables_in_planetsdb === 'planets')
            return fetchData('DROP TABLE planets', undefined);
        }
    ).then(result => {
        return fetchData('CREATE TABLE planets (id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY, name VARCHAR(50) NOT NULL, price DECIMAL(6, 2) NOT NULL)', undefined);
    }).then(result => {
        return fetchData('INSERT INTO planets (name, price) VALUES (\'Mercury\', 23.50)', undefined);
    }).then(result => {
        return fetchData('INSERT INTO planets (name, price) VALUES (\'Uranus\', 175.45)', undefined);
    }).then(result => {
        return fetchData('INSERT INTO planets (name, price) VALUES (\'Jupyter\', 267.20)', undefined);
    }).then(result => {
        return fetchData('INSERT INTO planets (name, price) VALUES (\'Pluto\', 50.00)', undefined);
    }).then(result => {
        return fetchData('INSERT INTO planets (name, price) VALUES (\'Venus\', 74.80)', undefined);
    }).then(result => {
        return fetchData('INSERT INTO planets (name, price) VALUES (\'Mars\', 63.75)', undefined);
    });
};

const getAllPlanets = () => {
    return fetchData('SELECT * FROM planets', undefined);
};

const deletePlanets = (planets) => {
    let count = 0;
    console.log(planets);
    let tmp = fetchData(`DELETE FROM planets WHERE id=?`, [ planets[0].id ]);
    planets.slice(1).forEach(planet => {
        tmp.then(result => {
            // console.log(result);
            count += parseInt(result.affectedRows);
            console.log(count);
            return fetchData(`DELETE FROM planets WHERE id=?`, [ planet.id ]);
        });
    });
    return tmp.then(result => {
       count += parseInt(result.affectedRows);
       console.log(count);
       return new Promise((resolve, reject) => {
           resolve(count);
       })
    });
};

const fetchData = (query, params) => {
    return new Promise((resolve, reject) => {
        con.query(query, params, (err, result) => {
            if (err) reject(err);
            resolve(result);
        })
    });
};

module.exports = {
    createConnection,
    createDatabase,
    getAllPlanets,
    deletePlanets
};