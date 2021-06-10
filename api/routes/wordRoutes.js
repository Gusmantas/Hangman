const express = require("express");
const router = express.Router();
const wordController = require("../controllers/wordController");

router.get("/:wordId", wordController.getWordById);
router.post("", wordController.createNewWord);

module.exports = router;