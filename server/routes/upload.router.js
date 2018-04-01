const express = require('express');
const pool = require('../modules/pool.js');
const router = express.Router();

const multer = require('multer');
const destination = 'server/public/uploads/'; //this location can be changed if needed

//multer is middleware for handling multipart form data
//multer adds a body and a file object to the request object
//body contains the text values in the form and file contains the files uploaded via the form
//more information can be found at github.com/expressjs/multer
const upload = multer({
  dest: destination
})
//fast-csv provides csv parsing and formatting more info at www.npmjs.com/package/fast-csv
let csv = require('fast-csv')
let fs = require('fs');
let lineReader = require('readLine');
let debug = false;


//this is the post for the .csv file
router.post('/:id', upload.single('file'), function(request, response){
  if(debug){console.log(request.file, 'file');}
  let id = request.params.id;
  if(debug){console.log(id, 'id in router');}

  let file = request.file;
  let stream = fs.createReadStream(file.path);
    csv.fromStream(stream, {
                    headers: ["task_name", "task_notes","op_cl"], //headers must match the order of the queryText
                    renameHeaders: true, //deletes the first line of the .csv file, renames it according to the headers property
                    ignoreEmpty: true,  //skips empty cells
                            })
    .on('data', function(data, callback){
      let queryText = `INSERT INTO "opening_closing" (task_name, task_notes, op_cl, property_id)
      VALUES ($1, $2, $3, $4);`;
      pool.query(queryText, [data.task_name, data.task_notes, data.op_cl, id])
      .then((result) => {
          if(debug){console.log('success in upload post', result);}
      }).catch((err) => {
          if(debug){console.log('error in upload post', err);}
      });
    }).on("end", function(){
      response.sendStatus(200);
      if(debug){console.log(("done with upload"));}
    })
});
//end POST

module.exports = router;
