/**
 * Module to handel images for the carousel
 */
const express = require('express');
const fs = require('fs');
const path = require('path');

const url = 'https://engineering-on-display.github.io/carousel';

module.exports = () => {
  const router = express.Router();

  router.route('/')
    .get((req, res) => {

      //replace this with an http call but this will work for now.
      fs.readdir(url, (err, files) => {

        if (err) {
          res.status(500).send("Image Router Error: unable to read directory");

        } else {
          res.status(200).send(files.map(file => path.join(url, file)));
        }
      });
    });

  return router;
}
