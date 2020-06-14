var http = require('http'),
    fs = require('fs');

var serverPort = process.env.PORT || 1337;

fs.readFile('./build/index.html', function(err, html) {
    if (err) {
        throw err;
    }
    http.createServer(function(request, response) {
        response.writeHeader(200, { 'Content-Type': 'text/html' });
        response.write(html);
        response.end();
    }).listen(serverPort);
});

// Console will print the message
console.log('Server running at http://127.0.0.1:80/');
