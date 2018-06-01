//  vreel app by Dan McKeown copyright 2017 http://danmckeown.info
var express = require('express')
var app = express()
var path = require('path')
const fileUpload = require('express-fileupload')
var loki = require('lokijs')
var crypto = require('crypto');

var db = new loki(__dirname + '/vspotindex.json')

function randomValueHex (len) { //  via https://blog.tompawlak.org/generate-random-values-nodejs-javascript
    return crypto.randomBytes(Math.ceil(len/2))
        .toString('hex') // convert to hexadecimal format
        .slice(0,len);   // return required number of characters
}

var valueHEX = randomValueHex(7)  // value 'ad0fc8c'

 app.get('/login', function (req, res) {
   res.send('Login under construction')
 })

// default options 
app.use(fileUpload());

app.get('/2017', function(req, res) {

		let userfiles = 'userfiles';
	
		db.loadDatabase({}, function () {
        let _collection = db.getCollection(userfiles);

        if (!_collection) {
            console.log("Collection %s does not exit. Creating ...", userfiles);
            _collection = db.addCollection(userfiles);
        }

		var fileList = _collection.find({ vYear:'2017' });
		res.send(fileList)
			
    });
});

app.get('/current', function(req, res) {
    let userfiles = 'userfiles';
	
	db.loadDatabase({}, function () {
        let _collection = db.getCollection(userfiles);

        if (!_collection) {
            console.log("Collection %s does not exit. Creating ...", userfiles);
            _collection = db.addCollection(userfiles);
        }

        var fileList = _collection.findOne({ vYear:'2017' });
        if ((fileList != 'undefined') && (fileList != null)) {
            console.log('sending this file: ' + fileList.vFile);
            res.send(fileList)
        }
        else {
            res.send(null);
        }
    });
});
 
app.post('/upload', function(req, res) {
    if (!req.files)
        return res.status(400).send('No files were uploaded.');
 
  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file 
    console.log(req.files);
    let sampleFile = req.files.sampleFile;
	
	let sampleFileName = req.files.sampleFile.name;
    let fileEnding = sampleFileName.substr(sampleFileName.length - 3);

	var actor1 = req.body;

	let fileName = actor1.vActor1 + "-" + actor1.vYear + "-" + actor1.vName + "-"  + valueHEX + "." + fileEnding;

    var fileNameRefined = fileName.split(' ').join('');
    fileNameRefined = fileNameRefined.split(',').join('');
    fileNameRefined = fileNameRefined.split('*').join('');
    fileNameRefined = fileNameRefined.split('#').join('');
    fileNameRefined = fileNameRefined.split('~').join('');
    fileNameRefined = fileNameRefined.split('_').join('-');
    fileNameRefined = fileNameRefined.split('@').join('');
    fileNameRefined = fileNameRefined.split('%').join('');
    fileNameRefined = fileNameRefined.split('^').join('');
    fileNameRefined = fileNameRefined.split('&').join('');
    fileNameRefined = fileNameRefined.split(';').join('-');
    fileNameRefined = fileNameRefined.split(':').join('-');
    fileNameRefined = fileNameRefined.split('{').join('');
    fileNameRefined = fileNameRefined.split('}').join('');
	
	actor1.vFile = fileNameRefined;
	
	console.log(actor1);
	console.log(actor1.vActor1);
 
  // Use the mv() method to upload the file to the '/public' directory
  sampleFile.mv(__dirname + '/public/' + fileNameRefined, function(err) {
    if (err)
        return res.status(500).send(err);
 
    res.send('File uploaded to ' + __dirname + '/public/' + fileNameRefined + ' <a href="http://localhost:3004">Home</a>');
		
	let userfiles = 'userfiles';
		
	db.loadDatabase({}, function () {
        let _collection = db.getCollection(userfiles);

        if (!_collection) {
            console.log("Collection %s does not exit. Creating ...", userfiles);
            _collection = db.addCollection(userfiles);
        }

        _collection.insert(actor1);
            
        db.saveDatabase();
    });
		
  });
});

app.get('/style.css', function(req, res) {
    res.sendFile(path.join(__dirname + '/build/style.css'));
});

app.use(express.static(path.join(__dirname + '/build/assets/*')));

app.use('/public', express.static(__dirname + '/public'));

app.get('/public/:thing/link', function (req, res) {
    res.sendFile(req.params.thing, {"root": __dirname + "/public/"});
})

app.get('/style.css', function(req, res) {
    res.sendFile(path.join(__dirname + '/build/style.css.map'));
});

app.get('/bundle.js', function(req, res) {
    res.sendFile(path.join(__dirname + '/build/bundle.js'));
});

app.get('/bundle.js.map', function(req, res) {
    res.sendFile(path.join(__dirname + '/build/bundle.js.map'));
});

app.get('/sw.js', function(req, res) {
    res.sendFile(path.join(__dirname + '/build/sw.js'));
});

app.get('/bundle.js.map', function(req, res) {
    res.sendFile(path.join(__dirname + '/build/bundle.js.map'));
});

app.get('/favicon-16x16.png', function(req, res) {
    res.sendFile(path.join(__dirname + '/favicon-16x16.png'));
});

app.get('/favicon-32x32.png', function(req, res) {
    res.sendFile(path.join(__dirname + '/favicon-32x32.png'));
});

app.get('/apple-touch-icon.png', function(req, res) {
    res.sendFile(path.join(__dirname + '/apple-touch-icon.png'));
});

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/build/index.html'));
});

app.listen(3004, function () {
  console.log('Express app listening on port 3004');
});

app.get('/latestvideo', function(req, res) {
    res.send('http://2012.danieljmckeown.com/library/images/Neener2012.mov');
});

app.get('/thisvideo/:video', function(req, res) {
    console.log(req.params.video);

    let userfiles = 'userfiles';
    let playVideo = req.params.video;
	
	db.loadDatabase({}, function () {
        let _collection = db.getCollection(userfiles);

        if (!_collection) {
            console.log("Collection %s does not exit. Creating ...", userfiles);
            _collection = db.addCollection(userfiles);
        }
        var fileList = _collection.findOne({ vFile: playVideo });
        var stringatron;
        if ((fileList != 'undefined') && (fileList != null)) {
            console.log('using this file: ' + playVideo);
            if (playVideo.indexOf('.gif') > -1) {
                stringatron = "<style>video#Video { max-width: 90%; } span#video-header { font-weight: bolder; }</style><img id='VideoImg' src='" + "/public/" + fileList.vFile + "' /><br /><span id='video-header'><a href='../../../../..'>🏠 Home</a></span><footer id='videoLinkFooter'><a href='" + "/public/" + fileList.vFile + "'><span id='arrow'>⬇</span> download video</a></footer>";
                res.send(stringatron)
            }
            else {
                stringatron = "<style>video#Video { max-width: 90%; }</style><video id='Video' controls><source src='" + "/public/" + fileList.vFile + "' /></video><br /><footer id='videoLinkFooter'><a href='" + "/public/" + fileList.vFile + "'><span id='arrow'>⬇</span> download video</a></footer>";
                res.send(stringatron)
            }
            
        }
        else {
            res.send(null);
        }
    });
});

app.get('/listlatest', function(req, res) {
    let userfiles = 'userfiles';
    let playVideo = req.params.video;
	
	db.loadDatabase({}, function () {
        let _collection = db.getCollection(userfiles);

        if (!_collection) {
            console.log("Collection %s does not exist. Creating ...", userfiles);
            _collection = db.addCollection(userfiles);
        }
        var results = _collection.find({'vYear': {'$gt': 2000}});   //  this makes it list all videos newer than 2000
        if ((results !== 'undefined') && (results !== null)) {
			res.send(results);
        }
        else {
            res.send({content: 'none'});
        }
    });
});

app.get('/servevideo', function(req, res) {
    let userfiles = 'userfiles';
	db.loadDatabase({}, function () {
        let _collection = db.getCollection(userfiles);

        if (!_collection) {
            console.log("Collection %s does not exit. Creating ...", userfiles);
            _collection = db.addCollection(userfiles);
        }
        var fileList = _collection.findOne({ vYear:'2017' });
        if ((fileList != 'undefined') && (fileList != null)) {
            console.log('using this file: ' + fileList.vFile);
            var stringatron = "<style>video#Video { max-width: 82%; }</style><video id='Video' controls><source src='" + "/public/" + fileList.vFile + "' /></video>"
            res.send(stringatron)
        }
        else {
            res.send(null);
        }
    });
});
