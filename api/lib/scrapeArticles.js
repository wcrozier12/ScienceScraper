const cheerio = require("cheerio");
function scrapeArticles(data, url) {
  const $ = cheerio.load(data);
  const articleItems = $("div#page")
    .children("section#section-content")
    .children("div#zone-content-wrapper")
    .children("div#zone-content")
    .children("div#region-content")
    .children("div.region-inner")
    .children("div#block-system-main")
    .children("div.block-inner")
    .children("div.content")
    .children("article")
    .children("div.content")
    .children("div.field")
    .children("div.field-items")
    .children("div.field-item");

  const articles = [];
  articleItems.map((_, item) => {
    const title = $(item)
      .children("article")
      .children("header")
      .children("h2")
      .children("a")
      .attr("title");
    const link =
      url +
      $(item)
        .children("article")
        .children("div.main-image")
        .children("div.field")
        .children("div.field-items")
        .children("div")
        .children("a")
        .attr("href");
    const photo = $(item)
      .children("article")
      .children("div.main-image")
      .children("div.field")
      .children("div.field-items")
      .children("div")
      .attr("resource");
    const desc = $(item)
      .children("article")
      .children("div.content")
      .text();
    //If the title is undefined, it means it was an ad and not an article.
    if (title === undefined) {
      return;
    }
    articles.push({ title, link, photo, desc });
  });
  return articles;
}
module.exports = scrapeArticles;
