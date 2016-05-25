var http = require('http');
var path = require('path');
var fs   = require('fs');
var ctypes = require('./content-types');

var serverRoot = path.join(__dirname, 'public');
var serverIndex = 'index.html';
var port = process.env.PORT || 3000;

function logRequest(method, fileName, statusCode) {
    console.log([method, fileName, statusCode].join(' -> '));
}

http.createServer(function (req, res) {
    var fileName = path.basename(req.url) || serverIndex;
    var fileDir  = path.dirname(req.url);
    var filePath = path.join(serverRoot, fileDir, fileName);

    if (req.method !== 'GET') {
        res.writeHead(405, 'Method Not Allowed');
        res.end();

        logRequest(req.method, fileName, 405);
        return;
    }

    fs.stat(filePath, function (err) {
        if (err) {
            res.writeHead(404, 'Not Found');
            res.end();

            logRequest(req.method, fileName, 404);
        } else {
            var ctype = ctypes(fileName);

            res.writeHead(200, 'OK', ctype ? { 'Content-Type': ctype } : null);
            fs.createReadStream(filePath).pipe(res);
            logRequest(req.method, fileName, 200);
        }
    });

}).listen(port, function () {
    console.log('Start listening on port ' + port);
});
