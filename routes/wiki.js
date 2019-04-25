const express = require('express');
const router = express.Router();
const addPage = require('../views/addPage');
const layout = require('../views/layout');
const models = require('../models/index');

router.get('/', (req, res) => {
  res.send(layout(''));
});

router.post('/', (req, res) => {
  res.json(req.body);
  // const title = req.body.title;
  // // const slug =;
  // const content = req.body.content;
  // const status = req.body.status;
  // const page = models.Page.create();
  // res.send('got to post /wiki');
});

router.get('/add', (req, res) => {
  res.send(addPage());
});

module.exports = router;
