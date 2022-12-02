const http = require('http');

// server create
const server = http.createServer((req, res) => {
    if (req.url === '/') {
        res.write('Hello programmers!');
        res.end();
    } else {
        res.write('sorry not found!');
        res.end();
    }
});

// server.on('connection', () => {
//     console.log('new connection...');
// });

server.listen(3000);
console.log('listing on port 3000');
