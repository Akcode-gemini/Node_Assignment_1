const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    if (req.method === 'GET' && req.url === '/') {
        fs.readFile('text.json', 'utf8', (err, data) => {
            if (err) {
                res.statusCode = 500;
                res.end('Internal Server Error');
            }
            else {
                try {
                    const myData = JSON.parse(data);
                    const newData = { ...myData };

                    fs.writeFile('data.txt', JSON.stringify(newData), 'utf8', (err) => {
                        if (err) {
                            res.statusCode = 500;
                            res.end('Error 500 , Internal Server Error');
                        }
                        else {
                            res.setHeader('Content-Type', 'application/json');
                            res.end(JSON.stringify(newData));
                        }
                    });
                }
                catch (error) {
                    res.statusCode = 500;
                    res.end('Error 500 , Internal Server Error');
                }
            }
        });
    }
    else {
        res.statusCode = 404;
        res.end('Error 404 , Not Found');
    }
});

server.listen(8080, () => {
    console.log('Server running at PORT 8080 ');
});
