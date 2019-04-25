const express = require('express');
const router = express.Router();
const addPage = require('../views/addPage');
const layout = require('../views/layout');
const models = require('../models/index');
const wikipage = require('../views/wikipage');

router.get('/', (req, res) => {
  res.send(layout(''));
});

router.post('/', async (req, res, next) => {
  const title = req.body.title;
  const content = req.body.content;

  const page = new models.Page({
    title: title,
    content: content
  })

  try{
    await page.save();
    res.redirect(`/wiki/${page.slug}`);
    console.log(page);
  } catch (err){
    next(err);
  }
});

router.get('/add', (req, res) => {
  res.send(addPage());
});

router.get('/:slug', async (req, res, next) => {
  const foundSlug = await models.Page.findOne({
    where: {
      slug: req.params.slug
    }
  })
  res.send(wikipage(foundSlug));
});

module.exports = router;
