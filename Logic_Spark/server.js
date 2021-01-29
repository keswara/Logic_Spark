var express = require("express")
var app = express()
const body_parser = require('body-parser');
app.use(body_parser.urlencoded({ extended: false }));
app.use(body_parser.json());


app.get('/', (req, res) => {
    res.send('Hello Welcome')
})

var categories = require('./Categories');
app.use('/api', categories)


var products = require('./Product');
app.use('/api', products)


app.listen(3000, () => {
    console.log('Start server at port 3000.')
})
