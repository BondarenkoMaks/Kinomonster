const mongoose = require("../../db").mongoose;

const FilmSchema = mongoose.Schema({
    nameRu: {
        type: String
    },
    nameEn: {
        type: String
    },
    year: {
        type: String
    },

    img: {
        type: String
    },
    descriptionRu: {
        type: String
    },
    descriptionEn: {
        type: String
    },
});

let Film = module.exports = mongoose.model("Film", FilmSchema);

module.exports.getAllFilms = (lang, callback) => {
    let name ='name'+ lang;
    let description ='description'+lang;
    Film.find({},{[name]:1, img:1, [description]: 1}).exec(callback);
};