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

router.post('/:id', (request, response) => {
  console.log('in post chore', request.params.id, request.body.newChore);
  pool.query('INSERT into chores (chore_name, chore_notes, property_id) VALUES ($1, $2, $3);',
  [request.body.newChore.choreName, request.body.newChore.choreNotes, request.params.id])
  .then((result) => {
    console.log('posted new chore');
    response.sendStatus(201);
  })
  .catch((err) => {
    console.log('error in chore post', err);
    response.sendStatus(500);
  })
})

module.exports = router;
