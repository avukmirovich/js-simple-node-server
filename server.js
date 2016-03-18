var http = require('http');
var path = require('path');
var url = require('url');
var fs = require('fs');

var serverRoot = path.join(__dirname, 'public');
var serverIndex = 'index.html';

function logRequest(method, fileName, statusCode) {
    console.log([method, fileName, statusCode].join(' -> '));
}

http.createServer(function(req, res) {

    if (req.method != 'GET') {
        res.writeHead(405, 'Method Not Allowed');
        res.end();
        return;
    }

    var fileName = url.parse(req.url).pathname;
    var filePath = path.join(serverRoot, fileName);
    var method = req.method;
    var statusCode = 404;

    fs.stat(filePath, function(err, stats) {
        if (err) {
            res.writeHead(404, 'Not Found');
            res.end();
            logRequest(method, fileName, statusCode);
        } else {
            if (stats.isDirectory()) {
                filePath = path.join(filePath, serverIndex);
            }

            fs.stat(filePath, function(err) {
                if (err) {
                    res.writeHead(404, 'Not Found');
                    res.end();
                    logRequest(method, fileName, statusCode);
                } else {
                    statusCode = 200;
                    res.writeHead(200, 'OK');
                    fs.createReadStream(filePath).pipe(res);
                    logRequest(method, fileName, statusCode);
                }
            });
        }

    });

}).listen(process.env.PORT || 3000);
