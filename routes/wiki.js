const express = require('express');
const router = express.Router();
const addPage = require('../views/addPage');
const main = require('../views/main');
const models = require('../models/index');
const wikipage = require('../views/wikipage');

router.get('/', async (req, res) => {
  const pages = await models.Page.findAll();
  res.send(main(pages));
});

router.post('/', async (req, res, next) => {
  const title = req.body.title;
  const content = req.body.content;
  const author = req.body.author;
  const email = req.body.email;

  await models.User.findOrCreate({where: {name: author, email: email}});

  const page = new models.Page({
    title: title,
    content: content
  });

  try {
    await page.save();
    res.redirect(`/wiki/${page.slug}`);
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
