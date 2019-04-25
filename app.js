const morgan = require('morgan');
const express = require('express');
const app = express();
const layout = require('./views/layout');
const models = require('./models/index');
const routes = require('./routes/router');

models.db.authenticate().
then(() => {
  console.log('connected to the database');
});

app.use(morgan("dev"));
app.use(express.static(__dirname + '/public'));

app.use(express.urlencoded({ extended: false }));
app.use('/wiki', routes);

app.get('/', (req, res) => {
  res.send(layout(''));
});

const syncTables = async () => {
  await models.db.sync({ force: true });

  app.listen(3000, () => {
    console.log('listening on port 3000');
  });
};

// call sync

syncTables();
