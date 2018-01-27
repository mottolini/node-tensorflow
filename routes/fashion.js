var express = require('express');
var router = express.Router();
var multer  = require('multer');
var upload = multer({ dest: 'uploads/' });
var fs = require('fs');
var python = require('python-shell');
var http = require('http');
var uuidv4 = require('uuid/v4');

/* GET users listing. */
router.get('/', function(req, res, next) {
  var a = {
    data: {a: 'pippo'},
    meta: {version: '1.0'}
  }; 
  res.json(a);
});

router.post('/check', function (req, res, next) {
  var a = {
    data: null,
    meta: {version: '1.0'}
  };
  console.log("BODY");
  console.log(req.body);
  console.log("QUERY");
  console.log(req.query);
  if (req.body && req.body.filename) {
    var filename = 'uploads/' + uuidv4() + '.jpg';
    var file = fs.createWriteStream(filename);
    var request = http.get(req.body.filename, function(response) {
      //Save file downlades
      response.pipe(file);

      var options = {
        args: [filename]
      };
      python.run('my_script.py', options, function (err, results) {
        if (err) throw err;
        // results is an array consisting of messages collected during execution
        //console.log('results: %j', );
        a = {
          "messages": [
            {"text": results[0]},
            {
              "attachment": {
                "type": "image",
                "payload": {
                  "url": req.body.filename
                }
              }
            }
          ]
        };
        res.json(a);
      });
    });
  } else {
    res.json(a);
  }
});

router.get('/check', function (req, res, next) {
  var a = {
    data: null,
    meta: {version: '1.0'}
  };
  console.log("BODY");
  console.log(req.body);
  console.log("QUERY");
  console.log(req.query);
  if (req.body && req.body.filename) {
    a.data = {filename: req.body.filename};
    res.json(a);
  } else {
    res.json(a);
  }
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
