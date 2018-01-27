var express = require('express');
var router = express.Router();
var multer  = require('multer');
var upload = multer({ dest: 'uploads/' });
var fs = require('fs');
var python = require('python-shell');


/* GET users listing. */
router.get('/', function(req, res, next) {
  var a = {
    data: {a: 'pippo'},
    meta: {version: '1.0'}
  }; 
  res.json(a);
});

router.post('/profile', upload.single('avatar'), function (req, res, next) {
  // req.file is the `avatar` file 
  // req.body will hold the text fields, if there were any 
  var a = {
    data: null,
    meta: {version: '1.0'}
  };
  if (req.file && req.file.mimetype == 'image/jpeg') {
    var filenameOld = 'uploads/' + req.file.filename;
    var filename = filenameOld + '.jpg';
    fs.renameSync(filenameOld, filename);

    var options = {
      args: [filename]
    };
    python.run('my_script.py', options, function (err, results) {
      if (err) throw err;
      // results is an array consisting of messages collected during execution
      //console.log('results: %j', );
      a.data = {fromPython: results[0]};
      res.json(a);
    });

  } else {
    res.json(a);
  }

});

module.exports = router;
