/**
 * Module to handel images for the carousel
 */
const express = require('express');
const fs = require('fs');
const path = require('path');
const cloudinary = require('cloudinary');

module.exports = () => {
  const router = express.Router();

  router.route('/')
  .get((req, res)=>{

    //replace this with an http call but this will work for now.
    fs.readdir(path.join(__dirname, '../../dist/assets/carousel'), (err, files) => {

      if(err){
        res.status(500).send("Image Router Error: unable to read directory");

      } else {
        res.send(files.map(file => `http://localhost:8000/assets/carousel/${file}`));
      }
    });
  })
  return router;
}
