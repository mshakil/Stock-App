const express = require("express");
const { createHolding, getHoldings, deleteHolding } = require("../models");
const router = express.Router();

router.get("/", (req, res) => {
  getHoldings((err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

router.post("/", (req, res) => {
  createHolding(req.body, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(result);
  });
});

router.delete("/:id", (req, res) => {
  deleteHolding(req.params.id, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true });
  });
});

module.exports = router;
