const express = require("express");
const router = express.Router();
const axios = require("axios");
const scrapeArticles = require("../lib/scrapeArticles");
const db = require("../models");

router.get("/articles", async function(req, res) {
  const url = "https://www.sciencenews.org";
  try {
    const { data } = await axios.get(url);
    const scrapedArticles = scrapeArticles(data, url);
    const currentArticles = await db.articles
      .find({})
      .populate("comments")
      .sort({ _id: 1 });
    const currentTitles = currentArticles.map(e => e.get("title"));
    const titlesToInsert = scrapedArticles.filter(
      e => !currentTitles.includes(e.title)
    );
    if (!titlesToInsert.length) {
      return res.json(currentArticles);
    }
    await db.articles.create(titlesToInsert).then(r => {
      return res.json([...r, ...currentArticles]);
    });
  } catch (e) {
    res.status(500).send("Somethings wrong!");
  }
});

module.exports = router;
