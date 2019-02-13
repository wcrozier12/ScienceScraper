const express = require("express");
const router = express.Router();
const axios = require("axios");
const scrapeArticles = require("../lib/scrapeArticles");
const db = require("../models");

router.get("/articles", function(req, res) {
  db.articles
    .find({})
    .populate("comments")
    .sort({ _id: -1 })
    .then(data => {
      res.json(data);
    });
});

router.get("/articles/scrape", async function(req, res) {
  const url = "https://www.sciencenews.org";
  try {
    const { data } = await axios.get(url);
    const scrapedArticles = scrapeArticles(data, url);
    const currentTitles = (await db.articles.find({})).map(e => e.get("title"));
    const titlesToInsert = scrapedArticles.filter(
      e => !currentTitles.includes(e.title)
    );
    if (!titlesToInsert.length) {
      return res.json([]);
    }
    db.articles.create(titlesToInsert).then(r => {
      res.json(r);
    });
  } catch (e) {
    res.status(500).send("Somethings wrong!");
  }
});

module.exports = router;
