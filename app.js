const morgan = require('morgan');
const express = require('express');
const app = express();
const layout = require('./views/layout');

app.use(morgan("dev"));
app.use(express.static(__dirname + '/public'));

app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send(layout(''));
});

app.listen(3000);
