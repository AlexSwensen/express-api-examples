var express = require('express');


var routes = function (Book) {
    var bookRouter = express.Router();

    bookRouter.route('/books')
        .post(function (req, res) {
            var book = new Book(req.body);

            book.save();
            //console.log(book);
            res.status(201).send(book);
        })
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
    return bookRouter;
};

module.exports = routes;