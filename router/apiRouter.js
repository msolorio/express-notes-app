const express = require("express");
const fs = require("fs");
const util = require("util");
const path = require("path");
const router = express.Router();
const readFilePromisify = util.promisify(fs.readFile);
const writeFilePromisify = util.promisify(fs.writeFile);

function readFromDb() {
  return readFilePromisify(path.join(__dirname, "../db/db.json"))
    .then((jsonData) => JSON.parse(jsonData));
};

function writeToDb(parsedData) {
  const stringifiedData = JSON.stringify(parsedData);
  return writeFilePromisify(path.join(__dirname, "../db/db.json"), stringifiedData);
};

router.post("/notes", (req, res) => {
  const newNote = req.body;

  readFromDb()
    .then((parsedData) => {
      const noteId = parsedData.length;
      newNote.id = noteId;
      parsedData.push(newNote);
      
      return parsedData;
    })
    .then((updatedData) => {
      writeToDb(updatedData);
    })
    .then(() => res.end())
    .catch((err) => {
      if (err) console.error(err);
    });
});

router.get('/notes', (req, res) => {
  readFromDb()
    .then((parsedData) => res.json(parsedData))
    .catch((err) => {
      if (err) console.error(err);
    })
});

router.delete('/notes/:id', (req, res) => {
  readFromDb()
    .then((parsedData) => parsedData.filter((note) => note.id !== parseInt(req.params.id, 10)))
    .then((filteredData) => writeToDb(filteredData))
    .then(() => res.end())
    .catch((err) => {
      if (err) console.error(err);
    });
});

module.exports = router;
