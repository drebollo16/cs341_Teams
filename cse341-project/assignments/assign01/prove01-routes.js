const http = require('http');

const requestHandler = ((req, res) => {
    const url = req.url;
    if (url === '/') {
        res.setHeader('Content-type', 'text/html');
        res.write('<html>');
        res.write('<head><title>Assignment 01 </title></head>');
        res.write('<body><h1>Welcome to my first assignment! </h1>');
        res.write('<form action="/create-user" method="POST"><input type="text" name="username"><button type="submit">Send</button></input></form></body>');
        res.write('</html>');
        return res.end();
    }

    if (url === '/users') {
        res.setHeader('Content-type', 'text/html');
        res.write('<html>');
        res.write('<head><title>Assignment 01 </title></head>');
        res.write('<body><li>user1</li><li>user2</li></body>');
        res.write('</html>');
        return res.end();
    }
    //send a html response page not found

    if (url == '/create-user') {
        const body = [];
        req.on('data', (chunk) => {
            body.push(chunk);
        });

        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            console.log(parsedBody.split('=')[1]);
        });
        res.statusCode = 302;
        res.setHeader('Location', '/');
        res.end();
    }
});

exports.handler = requestHandler;
exports.someText = 'Some hard code';