var http = require('http');
var path = require('path');
var url = require('url');
var fs = require('fs');
var ctypes = require('./content-types');

var serverRoot = path.join(__dirname, 'public');
var serverIndex = 'index.html';
var port = process.env.PORT || 3000;

function logRequest(method, fileName, statusCode) {
    console.log([method, fileName, statusCode].join(' -> '));
}

function getFileHandler(req, res, filePath, fileName) {
    function handleRequest(err, stats) {
        if (err) {
            res.writeHead(404, 'Not Found');
            res.end();

            logRequest(req.method, fileName, 404);
        } else {
            if (stats.isDirectory()) {
                filePath = path.join(filePath, serverIndex);

                fs.stat(filePath, handleRequest);
            } else {
                var ctype = ctypes(filePath);

                res.writeHead(200, 'OK', ctype ? {'Content-Type': ctype} : {});
                fs.createReadStream(filePath).pipe(res);
                logRequest(req.method, fileName, 200);
            }
        }
    }

    return handleRequest;
}

http.createServer(function(req, res) {

    if (req.method != 'GET') {
        res.writeHead(405, 'Method Not Allowed');
        res.end();
        return;
    }

    var fileName = url.parse(req.url).pathname;
    var filePath = path.join(serverRoot, fileName);

    fs.stat(filePath, getFileHandler(req, res, filePath, fileName));

}).listen(port, function() {
    console.log('Start listening on port ' + port);
});
