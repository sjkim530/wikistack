const express = require("express"),
  router = express.Router(),
  { Page } = require("../models");
(wikiPage = require("../views/wikipage.js")),
  (addPage = require("../views/addPage.js")),
  (main = require("../views/main.js"));

router.get("/", async (req, res) => {
  try {
    const pages = await Page.findAll();
    res.send(main(pages));
  } catch (err) {
    res.send(err);
  }
});

router.get("/add", (req, res) => {
  res.send(addPage());
});

router.get("/:slug", async (req, res) => {
  try {
    const page = await Page.findOne({ where: { slug: req.params.slug } });
    res.send(wikiPage(page));
  } catch (err) {
    res.send(err);
  }
});

router.post("/", async (req, res) => {
  const { authorName, authorEmail, pageTitle, content, status } = req.body;
  try {
    const page = await Page.create({
      authorName: authorName,
      authorEmail: authorEmail,
      title: pageTitle,
      content: content,
      status: status,
    });

    // make sure we only redirect *after* our save is complete! Don't forget to `await` the previous step. `create` returns a Promise.
    res.redirect(`/wiki/${page.slug}`);
  } catch (err) {
    res.send(err);
  }
});

module.exports = router;
