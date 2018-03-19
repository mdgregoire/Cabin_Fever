const express = require('express');
const pool = require('../modules/pool.js');
const router = express.Router();

router.post('/', (request, response) => {

  console.log('in post', request.body);
  pool.query('INSERT INTO properties (property_name, property_picture, property_location) VALUES ($1, $2, $3)',
    [request.body.nickname, request.body.itemUrl, request.body.address])
      .then((res) => {
        console.log('registed new pet');
        res.sendStatus(201);
      })
      .catch((err) => {
        console.log('Oh no!', err);
        res.sendStatus(500);
      })
});





module.exports = router;
