const express = require("express");
const inquirer = require("inquirer");
const apiRouter = require("./router/apiRouter");
const htmlRouter = require("./router/htmlRouter");

const app = express();
const PORT = 3000;
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

app.use('/api', apiRouter);

app.use('/', htmlRouter);

app.listen(PORT, () => {
  console.log(`your app is listening on PORT: ${PORT}.`);
});
