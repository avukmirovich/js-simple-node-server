var path = require('path');

var contentTypes = {};
contentTypes['.htm'] = 'text/html; charset=UTF-8';
contentTypes['.html'] = 'text/html; charset=UTF-8';
contentTypes['.ico'] = 'image/x-icon';
contentTypes['.css'] = 'text/css; charset=UTF-8';
contentTypes['.js'] = 'application/javascript; charset=UTF-8';
contentTypes['.jpeg'] = 'image/jpeg';
contentTypes['.jpg'] = 'image/jpeg';
contentTypes['.png'] = 'image/png';
contentTypes['.gif'] = 'image/gif';
contentTypes['.md'] = 'text/markdown; charset=UTF-8';

module.exports = function(fileName) {
    var ext = path.extname(fileName);
    return contentTypes[ext];
};
