const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const csv = require('csvtojson');
const path = require('path');

const app = express();
const port = 3000;


app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('source'));

let urlencodedParser = bodyParser.urlencoded({extended: false});
app.post('/save', urlencodedParser, (req, res) => {
    let date = new Date();
    let str = `${req.body.player},${req.body.points},${date.toLocaleDateString()},${date.toLocaleTimeString()}\n`;
    fs.appendFile('./data/result.csv', str, function(err) {
        if (err) {
            console.error(`Nastala chyba při zápisu souboru: ${err}`);
            return res.status(400).json({
                success: false,
                message: `Nastala chyba při zápisu souboru: ${err}`
            });
        }
    });
    res.redirect(301, '/results');
});

app.get('/results', (req, res) => {
    csv().fromFile('./data/result.csv')
    .then(data => {
        console.log(data);
        data.sort(function(a,b){return b.points-a.points});
        res.render('results.pug', {'nadpis': 'Výsledky', 'players': data});
    })
    .catch(err => {
        console.log(err);
    });
});

app.listen(port, () => {
    console.log(`Server is running, port: ${port}`);
});