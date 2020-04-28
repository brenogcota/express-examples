// Filesystem I/O 
// Asynchronously Read from files
const fs = require('fs');

fs.readFile('/tmp/hello.txt', { encoding: 'utf8' }, (err, content) => {
    if(err) return console.error(err);

    console.log(content);
});

// Listing directory contents with readdir or readdirSync
const fs = require('fs');

fs.readdir('/usr/local/bin', (err, files) => {
    if(err) return console.error(err);

    console.log(files.join(' '));
})

// A synchronous is available as readdirSync
let files;

try {
    files. fs.readdirSync('/var/tmp');
} catch(err) {
    console.error(err);
}

// Copying files by piping streams
var fs = require('fs');

var readable = fs.createReadStream(__dirname + '/node.txt', { encoding:  'utf8', highWaterMark: 16 * 1024 });

var writable = fs.createWriteStream(__dirname + '/nodePipe.txt');

readable.pipe(writable);

// other functions for fs module: check permissions, count lines for file, check if a file or a directory exists



// File upload
// single file upload using multer
const express = require('express');
const multer = require('multer');
const app = express();
const fs = require('fs');

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
})

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        fs.mkdir('./uploads', function(err) {
            if(err) {
                console.log(err.stack)
            } else {
                callback(null, './uploads')
            }
        })
    },
    filename: function (req, file, callback) {
        callback(null, file.fieldname + '-' + Date.now());
    }
});

app.post('/api/file', function(req, res){
    const upload = multer({ storage : storage}).single('userFile');
    upload(req, res, function(err){
        if(err) {
            return res.end("Error uploading file.");
        }
        res.end("File is uploaded");
    });
});

app.listen(3000, function() {
    console.log("Working on port 3000");
});

/*
    index.html

    <form id="uploadedForm"
          enctype = "multipart/form-data"
          action  = "/api/file"
          method  = "post"
    >
    <input type="file" name="userFile" />
    <input type="submit" value="Upload File" name="submit">
    </form>
*/ 



// Formidable module
// npm i formidable@latest
const formidable = require('formidable'),
      http = require('http'),
      util = require('util');

http.createServer(function(req, res) {
    if (req.url == '/upload' && req.method.toLowerCase() == 'post') {
        const form = new formidable.IncomingForm();

        form.parse(req, function(err, fields, files) {
            if (err)
                console.log(err); // or do-smth process error

            // Copy file from temporary place     
            // var fs = require('fs');      
            // fs.rename(file.path, <targetPath>, function (err) { ... });        
            // Send result on client
            res.writeHead(200, {'content-type': 'text/plain'});
            res.write('received upload:\n\n');
            res.end(util.inspect({ fields: fields, files: files}));
        });
        return;
    }

    // show a file upload form
    res.writeHead(200, {'content-type' : 'text/html' });
    res.end(
        '<form action="/upload" enctype="multipart/form-data" method="post">'+
        '<input type="text" name="title"><br>'+
        '<input type="file" name="upload" multiple="multiple"><br>'+ 
        '<input type="submit" value="Upload">'+
        '</form>' 
    );
}).listen(8080);