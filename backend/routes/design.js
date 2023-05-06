const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const Design = require("../models/Design");

//Route 1 - alldesigns
router.get("/fetchalldesigns", async (req, res) => {
  try {
    const designs = await Design.find({});
    res.json(designs);
  } catch (error) {
    res.status(500).send("Some error occured");
  }
});

//Route 2 - Add Design
router.post(
  "/adddesign",
  [body("url", "Enter a link for design")],
  async (req, res) => {
    try {
      const { url } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const design = new Design({ url });
      const saveDesigns = await design.save();
      res.json(saveDesigns);
    } catch (error) {
      res.status(500).send("Some error occured");
    }
  }
);

module.exports = router;
