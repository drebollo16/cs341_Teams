const http = require('http');

const fs = require('fs');
const requestHandler = ((req, res) => {
    const url = req.url;
    const method = req.method;
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
        res.write('<body><li class="username"></li><li>user2</li></body>');
        res.write('</html>');
        return res.end();
    }
    //send a html response page not found

    if (url == '/create-user' && method === 'POST') {
        const body = [];
        req.on('data', (chunk) => {
            body.push(chunk);
        });

        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1];
            console.log(parsedBody.split('=')[1]);
            //send the usernames to li in /users
            fs.writeFile('user.txt', message, (err) => {

                res.statusCode = 302;
                res.setHeader('Location', '/');
                return res.end();
            });
        });
    }

});

exports.handler = requestHandler;