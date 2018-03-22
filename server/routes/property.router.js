const express = require('express');
const pool = require('../modules/pool.js');
const router = express.Router();

router.post('/', (request, response) => {

  console.log('in post', request.body);
  pool.query('INSERT INTO properties (property_name, property_picture, property_location, property_state, owner_id) VALUES ($1, $2, $3, $4,$5);',
    [request.body.nickname, request.body.itemUrl, request.body.address, request.body.state, request.body.userObject.id])
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

router.get('/:id', (request, response) => {
  console.log('in get all', request.params.id);
  pool.query('SELECT * FROM properties WHERE owner_id = $1 ORDER BY id;', [request.params.id])
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

router.get('/display/:id', (request, response) => {
  console.log('in get single', request.params.id);
  pool.query('SELECT * FROM properties WHERE id = $1;', [request.params.id])
  .then((result) => {
    console.log('success in get', result);
    response.send(result);
  })
  .catch((err) => {
    console.log('error in get', err);
    response.sendStatus(500);
  })
});
//end getCabin for display

router.delete('/:id', (request, response) => {
  console.log('in delete cabin route', request.params.id);
  pool.query('DELETE FROM properties WHERE id = $1;', [request.params.id])
  .then((result) => {
    console.log('success in delete', result);
    response.sendStatus(200)
  })
  .catch((err) => {
    console.log('error in delete', err);
    response.sendStatus(500);
  })
});
//end deleteCabin

router.put('/showEdit/:id', (request, response) => {
  let is_edit = '';
  if (request.body.edit == true){
    is_edit = false;
  } else {
    is_edit = true;
  }
  pool.query('UPDATE properties SET is_edit = $1 WHERE id = $2;', [is_edit, request.params.id])
  .then((result) => {
    console.log('success in showEdit', result);
    response.sendStatus(200);
  })
  .catch ((err) => {
    console.log('error in showEdit', err);
    response.sendStatus(500);
  })
})
// end showEdit

router.put('/edit/:id', (request, response) => {
  console.log('in edit route', request.body);
  pool.query('UPDATE properties SET property_name = $1, property_location = $2, property_state = $3 WHERE id = $4;',
              [request.body.property_name, request.body.property_location, request.body.property_state, request.body.id])
  .then((result) => {
    console.log('success in edit', result);
    response.sendStatus(200);
  })
  .catch ((err) => {
    console.log('error in edit', err);
    response.sendStatus(500);
  })
})
//end edit


module.exports = router;
