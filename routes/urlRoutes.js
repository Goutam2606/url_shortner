const express = require('express');

const router = express.Router();

const ShortURL = require("../models/urlSchema");

router.get('/', async (req, res) => {
    const shorturls = await ShortURL.find();
    res.render('index', { shorturls: shorturls });
});

router.post('/shortUrls', async (req, res) => {
    const url = req.body.name;
    const newShortURL = new ShortURL({
        name: url
    });

    await newShortURL.save();
    console.log("Short URL Created ", newShortURL);
    res.redirect(shortUrl.name);
});

router.get("/shortUrl", async (req, res) => {
    const shortUrl = await ShortURL.findOne({ short: req.params.shortUrl });
    if (shortUrl == null) {
        return res.sendStatus(404);
    }
    await shortUrl.clicks++;
    shortUrl.save();
    res.redirect(shortUrl.name);
});


router.get('/delete/:id', async (req, res) => {
    const id = req.params.id;
    try {
        await ShortURL.deleteOne({ _id: id });
        console.log("Data Delete SuccessFully");
    } catch (err) {
        console.log(err);
    }
});
module.exports = router;