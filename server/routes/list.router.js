const express = require('express');
const pool = require('../modules/pool.js');
const router = express.Router();

router.get('/:id', (request, response) => {
  console.log('in get all', request.params.id);
  pool.query('SELECT * FROM opening_closing WHERE property_id = $1 ORDER BY id;', [request.params.id])
  .then((result) => {
    console.log('success in get', result);
    response.send(result);
  })
  .catch((err) => {
    console.log('error in get', err);
    response.sendStatus(500);
  })
});
//end getCabins


module.exports = router;
