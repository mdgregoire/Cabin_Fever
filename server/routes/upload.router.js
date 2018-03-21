const express = require('express');
const pool = require('../modules/pool.js');
const router = express.Router();
const multer = require('multer');
const destination = 'server/public/uploads/';
const upload = multer({
  dest: destination
})
// let parse = require('csv-parse');
let csv = require('fast-csv')
let fs = require('fs');
let lineReader = require('readLine');

router.post('/', upload.single('file'), function(request, response){
  let file = request.file;
  let stream = fs.createReadStream(file.path);
    csv.fromStream(stream, {
                    headers: [
                      ,
                      "task_name",
                      "task_notes",
                      "op_cl",
                      "property_name",
                    ]
    })
    .on('data', function(data, callback){
      let queryText = `INSERT INTO "opening_closing" (task_name, task_notes, op_cl, property_name)
      VALUES ($1, $2, $3, $4);`;
      pool.query(queryText, [data.task_name, data.task_notes, data.op_cl, data.property_name])
      .then((result) => {
          console.log('success in upload post', result);
      }).catch((err) => {
        console.log('error in upload post', err);
      });
    }).on("end", function(){
      response.sendStatus(200);
      console.log(("done with upload"));
    })
});
//end POST

module.exports = router;
