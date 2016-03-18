var http = require('http');
var path = require('path');
var url = require('url');
var fs = require('fs');

var serverRoot = path.join(__dirname, 'public');
var serverIndex = 'index.html';

http.createServer(function(req, res) {

    if (req.method != 'GET') {
        res.writeHead(405, 'Method Not Allowed');
        res.end();
        return;
    }

    var filePath = path.join(serverRoot, url.parse(req.url).pathname);
    fs.stat(filePath, function(err, stats) {
        if (err) {
            res.writeHead(404, 'Not Found');
            res.end();
        } else {
            if (stats.isDirectory()) {
                filePath = path.join(filePath, serverIndex);
            }

            fs.stat(filePath, function(err) {
                if (err) {
                    res.writeHead(404, 'Not Found');
                    res.end();
                } else {
                    res.writeHead(200, 'OK');
                    fs.createReadStream(filePath).pipe(res);
                }
            });
        }
    });

}).listen(process.env.PORT || 3000);
