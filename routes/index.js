const express = require("express");
const router = express.Router();
const Film = require("../db").Film;

const ensureAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        if (req.url == "/") {
            let cookieLang = req.cookies.lang || "En";
            let pathRdirect = "/" + cookieLang;
            res.redirect(pathRdirect);
        } else {
            next();
        }
    } else {
        req.flash("error_msg", "You are not logged in");
        res.redirect("/users/login");
    }
};

router.get("/:lang", ensureAuthenticated, (req, res) => {

    let cookieLang = req.cookies.lang || "Ru";
    let lang = req.params.lang || cookieLang;
    let view = "Watch";
    if (lang == "Ru")
        view = "Смотреть";

    if (cookieLang !== lang)
        res.cookie('lang', lang);
    Film.getAllFilms(lang, (err, docs) => {
        if (err) throw err;

        let data = [];
        docs.forEach(function (el, i) {

            let obj = {};
            obj.name = el._doc.nameRu || el._doc.nameEn;
            obj.description = el._doc.descriptionRu || el._doc.descriptionEn;
            obj.img = el._doc.img;
            obj.view = view;
            data.push(obj);
        });

        res.render("index", {docs: data, view: view});

    });
});


module.exports = router;