// Cluester Module
const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
    });
} else {
    // Workers can share any TCP connection  
    // In this case it is an HTTP server
    require('./server.js')();
}

// Your server.js
const http = require('http');

function startServer() {
    const server = http.createServer((req, res) => {
        res.writeHead(200);
        res.end('Hello Http');
    });

    server.listen(3000);
}

if(!module.parent) {
    startServer();
} else {
    module.exports = startServer;
}