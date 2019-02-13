const express = require("express");
const router = express.Router();
const db = require("../models");

router.post("/comment/:id", async (req, res) => {
  try {
    const comment = await db.comments.create(req.body);

    await db.articles.findOneAndUpdate(
      { _id: req.params.id },
      { $push: { comments: comment } },
      { new: true }
    );

    res.json(comment);
  } catch (e) {
    res.status(500).send({ Error: e });
  }
});

module.exports = router;
