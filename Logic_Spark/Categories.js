var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('database/mart.db');

var express = require('express');
var router = express.Router();


router.get("/categories", (req, res, next) => {
    db.all("SELECT * FROM categories",
        function (err, rows) {
            if (err) {
                res.status(400).json({ "error": err.message })
                return;
            }
            res.status(200).json({ rows });
        });
});


router.post("/categories", (req, res, next) => {
    var categories = {
        name: req.body.name,
        detail: req.body.detail,
    }
    db.run('INSERT INTO categories (name, detail) VALUES (?,?)',
        [categories.name, categories.detail],
        function (err, rows) {
            if (err) {
                res.status(400).json({ "error": err.message })
                return;
            }
            res.json({
                "sucess": "save sucess",
                "categories": categories,
            })
        });
})


router.put("/categories", (req, res, next) => {
    var categories = {
        id: req.body.id,
        name: req.body.name,
        detail: req.body.detail,
    }
    db.run('UPDATE categories set name = ?, detail = ? WHERE id = ?',
        [categories.name, categories.detail, categories.id],
        function (err, rows) {
            if (err) {
                res.status(400).json({ "error": res.message })
                return;
            }
            res.json({
                "sucess": "update sucess",
                "categories": categories,
            })
        });
});


router.delete("/categories/:id", (req, res, next) => {
    db.run('DELETE FROM categories WHERE id = ?',
        req.params.id,
        function (err, rows) {
            if (err) {
                res.status(400).json({ "error": res.message })
                return;
            }
            res.status(200).json({ "Delete sucess": "sucess" })
        });
});



module.exports = router;