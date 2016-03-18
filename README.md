Simple Node.js server for static files
======================================
Serves static files from public folder. If file not specified in requested url, tries to serve `index.html` from requested folder. Also supports setting properly content types for some files. Check file `content-types.js` for full list.

Supports only `GET` method. For other methods return `405 - Method Not Allowed` HTTP status code.

Usage
-----
You need `node` to run this sample. Just execute following command:
```
node server.js
```
Server will start listening port `3000` on `localhost`. You can point you browser to `http://localhost:3000` to view a demo page.

You can specify custom port by setting `PORT` environment variable like so:
```
(export PORT=3001; node server.js)
```
