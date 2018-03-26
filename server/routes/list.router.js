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
//end getList

router.put('/:id', (request, response) => {
  console.log('in click list put', request.params.id, request.body.completed);
  let completed = ''
  if (request.body.completed){
      completed = false;
  } else{
    completed = true;
  }
  console.log(completed , 'completed in router');
  pool.query('UPDATE opening_closing SET completed = $1 WHERE id = $2;', [completed, request.params.id])
  .then((result) => {
    console.log('success in put list', result);
    response.sendStatus(200);
  })
  .catch((err) => {
    console.log('error in put list', err);
    response.sendStatus(500);
  })
});
//end put list

module.exports = router;
