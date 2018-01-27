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
        a = {
          "messages": [
            {"text": "Here are some suggestions for you:"},
            {
              "attachment": {
                "type": "image",
                "payload": {
                  "url": "https://www.stories.com/Content/ProductContent/0515386001/0515386001_22_100011.jpg"
                }
              }
            },
            {
              "attachment": {
                "type": "image",
                "payload": {
                  "url": "http://demandware.edgesuite.net/sits_pod68-pod69/dw/image/v2/AAQM_PRD/on/demandware.static/Sites-IT-Site/Sites-master/it/dw33d437f2/34CAW0057_A75_01.jpg?sw=800&sh=800&sm=fit"
                }
              }
            },
            {
              "attachment": {
                "type": "image",
                "payload": {
                  "url": "https://d2zt2hjwrvnskq.cloudfront.net/slir/w1000/media/catalog/product/cache/4/image/9df78eab33525d08d6e5fb8d27136e95/C/F/CF1803_004_1.jpg"
                }
              }
            }
          ]
        };

        a ={
          "messages": [
             {
               "attachment":{
                 "type":"template",
                 "payload":{
                   "template_type":"generic",
                   "image_aspect_ratio": "square",
                   "elements":[
                     {
                       "title":"Horsebit Loafer Pumps",
                       "image_url":"https://www.stories.com/Content/ProductContent/0515386001/0515386001_22_100011.jpg",
                       "subtitle":"Designed in Paris. Ultra chic loafer pumps made from soft leather, featuring a horsebit metal buckle.",
                       "buttons":[
                         {
                           "type":"web_url",
                           "url":"https://rockets.chatfuel.com/store/shirt",
                           "title":"View Item"
                         }
                       ]
                     },
                     {
                       "title":"SNEAKERS STRAIGHTSET LACE IN PELLE",
                       "image_url":"http://demandware.edgesuite.net/sits_pod68-pod69/dw/image/v2/AAQM_PRD/on/demandware.static/Sites-IT-Site/Sites-master/it/dw33d437f2/34CAW0057_A75_01.jpg?sw=800&sh=800&sm=fit",
                       "subtitle":"",
                       "default_action": {
                         "type": "web_url",
                         "url": "https://rockets.chatfuel.com/store",
                         "messenger_extensions": true
                       },
                       "buttons":[
                         {
                           "type":"web_url",
                           "url":"https://rockets.chatfuel.com/store/hoodie",
                           "title":"View Item"
                         }
                       ]
                     },
                     {
                       "title":"Slippers Argento Flirting",
                       "image_url":"https://d2zt2hjwrvnskq.cloudfront.net/slir/w1000/media/catalog/product/cache/4/image/9df78eab33525d08d6e5fb8d27136e95/C/F/CF1803_004_1.jpg",
                       "subtitle":"ballerine in glitter argento con ricamo in perline “flirting” a “tendina” e tacco rivestito ton-sur-ton. bordo in pelle argento, suola e fodera in pelle azzurra. made in italy",
                       "default_action": {
                         "type": "web_url",
                         "url": "https://rockets.chatfuel.com/store",
                         "messenger_extensions": true
                       },
                       "buttons":[
                         {
                           "type":"web_url",
                           "url":"https://rockets.chatfuel.com/store/hoodie",
                           "title":"View Item"
                         }
                       ]
                     }
                   ]
                 }
               }
             }
           ]
         }


        res.json(a);
      });
  } else {
    res.json(a);
  }
});

router.post('/check-correct', function (req, res, next) {
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
        a = {
          "messages": [
            {"text": "Here are some suggestions for you:"},
            {
              "attachment": {
                "type": "image",
                "payload": {
                  "url": "https://www.stories.com/Content/ProductContent/0515386001/0515386001_22_100011.jpg"
                }
              }
            },
            {
              "attachment": {
                "type": "image",
                "payload": {
                  "url": "http://demandware.edgesuite.net/sits_pod68-pod69/dw/image/v2/AAQM_PRD/on/demandware.static/Sites-IT-Site/Sites-master/it/dw33d437f2/34CAW0057_A75_01.jpg?sw=800&sh=800&sm=fit"
                }
              }
            },
            {
              "attachment": {
                "type": "image",
                "payload": {
                  "url": "https://d2zt2hjwrvnskq.cloudfront.net/slir/w1000/media/catalog/product/cache/4/image/9df78eab33525d08d6e5fb8d27136e95/C/F/CF1803_004_1.jpg"
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
