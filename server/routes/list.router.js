const express = require('express');
const pool = require('../modules/pool.js');
const router = express.Router();
let debug = false;

router.get('/:id', (request, response) => {
  if(debug){console.log('in get all', request.params.id);}
  pool.query('SELECT * FROM opening_closing WHERE property_id = $1 ORDER BY id;', [request.params.id])
  .then((result) => {
    if(debug){console.log('success in get', result);}
    response.send(result);
  })
  .catch((err) => {
    if(debug){console.log('error in get', err);}
    response.sendStatus(500);
  })
});
//end getList

router.put('/clear/:id', (request, response) => {
  if(debug){console.log('in clear list put', request.params.id, request.body.openState);}
  pool.query('UPDATE opening_closing SET completed = false WHERE property_id = $1;', [request.params.id])
  .then((result) => {
    if(debug){console.log('success in put clear list', result);}
    response.sendStatus(200);
  })
  .catch((err) => {
    if(debug){console.log('error in put clear list', err);}
    response.sendStatus(500);
  })
});
//end put list for clear

//this function stores if an opening or closing taask has been completed and updates the DB
router.put('/:id', (request, response) => {
  if(debug){console.log('in click list put', request.params.id, request.body.completed);}
  let completed = ''
  if (request.body.completed){
      completed = false;
  } else{
    completed = true;
  }
  if(debug){console.log(completed , 'completed in router');}
  pool.query('UPDATE opening_closing SET completed = $1 WHERE id = $2;', [completed, request.params.id])
  .then((result) => {
    if(debug){console.log('success in put list', result);}
    response.sendStatus(200);
  })
  .catch((err) => {
    if(debug){console.log('error in put list', err);}
    response.sendStatus(500);
  })
});
//end put list

router.delete('/delete/:id', (request, response) => {
  if(debug){console.log('in delete list', request.params.id);}
  pool.query('DELETE FROM opening_closing WHERE property_id = $1;', [request.params.id])
  .then((result) => {
    if(debug){console.log('success in delete list', result);}
    response.sendStatus(200);
  }).catch((err) => {
    if(debug){console.log('error in delete list', err);}
    response.sendStatus(500);
  })
});
//end delete list

module.exports = router;
