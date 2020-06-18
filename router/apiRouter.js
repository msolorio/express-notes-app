const express = require("express");
const fs = require("fs");
const util = require("util");
const path = require("path");
const router = express.Router();
const readFilePromisify = util.promisify(fs.readFile);
const writeFilePromisify = util.promisify(fs.writeFile);

router.post("/notes", (req, res) => {
  const newNote = req.body;

  readFilePromisify(path.join(__dirname, "../db/db.json"))
    .then((jsonData) => {
      const parsedData = JSON.parse(jsonData);
      parsedData.push(newNote);
      const stringifiedData = JSON.stringify(parsedData);

      return writeFilePromisify(path.join(__dirname, "../db/db.json"), stringifiedData);
    })
    .then(() => res.end())
    .catch((err) => {
      if (err) console.error(err);
    });
});

module.exports = router;
