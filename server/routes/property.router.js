const express = require('express');
const pool = require('../modules/pool.js');
const router = express.Router();

router.post('/', (request, response) => {

  console.log('in post', request.body);
  pool.query('INSERT INTO properties (property_name, property_picture, property_location, owner_id) VALUES ($1, $2, $3, $4);',
    [request.body.nickname, request.body.itemUrl, request.body.address, request.body.userObject.id])
      .then((result) => {
        console.log('registed new property');
        response.sendStatus(201);
      })
      .catch((err) => {
        console.log('error in property post', err);
        response.sendStatus(500);
      })
});
//end POST






module.exports = router;
