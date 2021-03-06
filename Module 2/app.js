var express = require('express'),
    mongoose = require('mongoose');

var db = mongoose.connect('mongodb://localhost/bookAPI');

var Book = require('./models/bookModel');

var app = express();
var port = process.env.PORT || 3000;

var bookRouter = express.Router();

bookRouter.route('/books')
    .get(function (req, res) {
        var query = {};
        if (req.query.genre) {
            query.genre = req.query.genre;
        }
        Book.find(query, function (err, books) {
            if (err) {
                console.log(err);
            }
            else {
                res.json(books);
            }
        });
        //var responsJson = {hello: "This is my API"};
        //
        //res.json(responsJson);
    });

bookRouter.route('/books/:bookId')
    .get(function (req, res) {
        Book.findById(req.params.bookId, function (err, books) {
            if (err) {
                console.log(err);
            }
            else {
                res.json(books);
            }
        });
        //var responsJson = {hello: "This is my API"};
        //
        //res.json(responsJson);
    });

app.use('/api', bookRouter);


app.get('/', function (req, res) {
    res.send('Welcome to my API!');
});

app.listen(port, function () {
    console.log('Running on PORT: ' + port);
});
