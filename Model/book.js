const mongoose = require("mongoose");

const bookSchema = mongoose.Schema({
    book_id : String,
    name : String,
    price : Number,
    pages : Number,
    author : String
});

const bookModel = mongoose.model("bookDetails",bookSchema,"bookDetails");

module.exports = bookModel;