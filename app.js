const morgan = require('morgan');
const express = require('express');
const app = express();
const models = require('./models/index');
const wiki = require('./routes/wiki');
const user = require('./routes/user');


models.db.authenticate().
then(() => {
  console.log('connected to the database');
});

app.use(morgan("dev"));
app.use(express.static(__dirname + '/public'));

app.use(express.urlencoded({ extended: false }));
app.use('/wiki', wiki);
app.use('/', user);

app.get('/', (req, res) => {
  res.redirect('/wiki');
});

const syncTables = async () => {
  await models.db.sync({ force: true });

  app.listen(3000, () => {
    console.log('listening on port 3000');
  });
};

// call sync

syncTables();
