var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('database/mart.db');

var express = require('express');
var router = express.Router();


router.get("/products", (req, res, next) => {
    db.all("SELECT * FROM products",
        function (err, rows) {
            if (err) {
                res.status(400).json({ "error": err.message })
                return;
            }
            res.status(200).json({ rows });
        });
});


router.post("/products", (req, res, next) => {
    var product = {
        name: req.body.name,
        price: req.body.price,
        categories_id: req.body.categories_id
    }
    db.run('INSERT INTO products (name, price, categories_id) VALUES (?,?,?)',
        [product.name, product.price, product.categories_id],
        function (err, rows) {
            if (err) {
                res.status(400).json({ "error": err.message })
                return;
            }
            res.json({
                "sucess": "save sucess",
                "product": product,
            })
        });
})


router.put("/products", (req, res, next) => {
    var product = {
        id: req.body.id,
        name: req.body.name,
        price: req.body.price,
        categories_id: req.body.categories_id
    }
    db.run('UPDATE products set name = ?, price = ?, categories_id = ? WHERE id = ?',
        [product.name, product.price, product.categories_id, product.id],
        function (err, rows) {
            if (err) {
                res.status(400).json({ "error": res.message })
                return;
            }
            res.json({
                "sucess": "update sucess",
                "product": product,
            })
        });
});


router.delete("/products/:id", (req, res, next) => {
    db.run('DELETE FROM products WHERE id = ?',
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