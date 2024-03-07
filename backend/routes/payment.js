const express = require("express");
const router = express.Router();
const Payment = require("../models/Payment.js");

router.post("/", async (req, res) => {
  try {
    console.log(req.body);
    const newPayment = new Payment(req.body);
    await newPayment.save();

    res.status(201).json(newPayment);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error." });
  }
});

module.exports = router;
