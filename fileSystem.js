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



