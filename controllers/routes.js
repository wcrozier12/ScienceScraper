const express = require('express');
const router = express.Router();
const axios = require("axios");
const cheerio = require("cheerio");
const db = require("../models");


router.get('/api/articles', function(req, res) { 
  db.articles
  .find({})
  .populate('comments')
  .sort({_id: -1})
  .then((data) => {
    res.json(data);
  })
})
// A GET route for scraping the echojs website
router.get("/scrape", function(req, res) {
  const url = "https://www.sciencenews.org";
  const articles ='hi';
  // First, we grab the body of the html with request
  axios.get(url).then(function(response) {
    // Then, we load that into cheerio and save it to $ for a shorthand selector
    const $ = cheerio.load(response.data);
    const element = $('div#page').children('section#section-content').children('div#zone-content-wrapper')
        .children('div#zone-content').children('div#region-content').children('div.region-inner')
        .children('div#block-system-main').children('div.block-inner').children('div.content').children('article')
        .children('div.content').children('div.field').children('div.field-items').children('div.field-item');
        
      element.each((i, element) => {
        const result = {};
        const title = $(element).children('article').children('header').children('h2').children('a').attr('title');
        const link = url + $(element).children('article').children('div.main-image').children('div.field')
        .children('div.field-items').children('div').children('a').attr('href');
        const photo = $(element).children('article').children('div.main-image').children('div.field')
        .children('div.field-items').children('div').attr('resource');
        const desc = $(element).children('article').children('div.content').text();
        //If the title is undefined, it means it was an ad and not an article.
        if (title === undefined) {
          return;
        }

        result.title=title;
        result.link=link;
        result.photo=photo;
        result.desc = desc;

        db.articles
        .create(result)
        .then((data) => { 
          return console.log(data);;
        })
        .catch((err) => {
          return console.log(err);
        })
      
      });
      return res.json('All done');
  });
});

router.post('/newComment/:id', ((req, res) =>  {
  db.comments
  .create(req.body)
  .then((dbComment) => {
      res.json(dbComment);
      return db.articles.findOneAndUpdate({_id: req.params.id}, { $push: { comments: dbComment} }, { new: true });
  })
  .then((result) => {
    console.log(result)
  })
  .catch((err) => {
    console.log(err)
  })
}))

module.exports = router;