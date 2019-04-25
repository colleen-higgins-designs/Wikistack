const express = require('express');
const router = express.Router();
const layout = require('../views/layout');
const main = require('../views/main');
const models = require('./models/index');

router.get('/', (req, res) => {
  res.send(layout(main('')));
});

router.post('/', (req, res) => {
  const title = req.body.title;
  const slug =;
  const content = req.body.content;
  const status = req.body.status;
  const page = models.Page.create()

})

module.exports = router;
