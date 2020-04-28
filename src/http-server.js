var http = require('http');
var httpPort = 80;

http.createServer(handler).listen(httpPort, start_callback);

function handler(req, res) {
    var clientIP = req.connection.remoteAddress;
    var connectUsing = req.connection.encrypted ? 'SSL' : 'HTTP';
    
    console.log('Request received: ' + connectUsing + ' ' + req.method + ' ' + req.url);
    console.log('Client IP: ' + clientIP);

    res.writeHead(200, "OK", {'Content-Type': 'text/plain'});
    res.write("OK");
    res.end();
    return;
}

function start_callback() {
    console.log('Start HTTP on port ' + httpPort)
}