const express = require('express');

function titleSlug (title){
  return title.replace(/\s+/g, '_').replace(/\W/g,"");
}

module.exports = titleSlug;
