const express = require('express');
const reload = require('reload');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const sass = require('node-sass-middleware');

// Init app
const app = express();

// Template engine setup
app.set('view engine', 'html');
app.engine('html', ejs.renderFile);

// SCSS parser
// Note: you must place sass-middleware *before* `express.static` or else it will not work
app.use(sass({
    src: __dirname + '/scss',
    dest: __dirname + '/public',
    debug: true,
    outputStyle: 'expanded'
}));

// Public folder setup
app.use(express.static(__dirname + 'public'));

// Body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    res.render('index');
});

// Define port
const port = 3000;

// Reload code
reload(app);

// Start server
const server = app.listen(port, () => console.log(`Server started on port ${port}`));
