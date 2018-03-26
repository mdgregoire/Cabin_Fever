const express = require('express');
const pool = require('../modules/pool.js');
const router = express.Router();

router.get('/:id', (request, response) => {
  console.log('in get all', request.params.id);
  pool.query('SELECT * FROM chores WHERE property_id = $1 ORDER BY id;', [request.params.id])
  .then((result) => {
    console.log('success in get', result);
    response.send(result);
  })
  .catch((err) => {
    console.log('error in get', err);
    response.sendStatus(500);
  })
});
//end getList

router.delete('/:id', (request, response) => {
  console.log('in delete chore', request.params.id);
  pool.query('DELETE FROM chores WHERE id = $1;', [request.params.id])
  .then((result) => {
    console.log('success in delete', result);
    response.send(result);
  })
  .catch((err) => {
    console.log('error in delete', err);
    response.sendStatus(500);
  })
});
//end delete chore

module.exports = router;
