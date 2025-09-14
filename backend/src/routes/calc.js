const express = require("express");
const { suggestBuy } = require("../services/calcService");
const router = express.Router();

router.post("/suggest-buy", (req, res) => {
  try {
    const result = suggestBuy(req.body);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
