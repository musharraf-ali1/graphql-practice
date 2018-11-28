const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    name: String,
    genre: String,
    authorId: String,
    // I FOUND THIS THING AFTER A WHILE THAT I WAS NOT DECLARING THE VALUE
    // HERE THAT'S THE REASON I AM NOT GETTING ANYTHING THEN, BECAUSE DATA
    // IS FETCHED FROM HERE.
    subscribed: Boolean
});

module.exports = mongoose.model('Book', bookSchema);
