const http = require('http');

const MAX_BODY_SIZE = 50;

const parseRequestBody = (req) => {
    return new Promise((resolve, reject) => {
        let data = '';

        req.on('data', (chunk) => {
            data += chunk;
            if (data.length > MAX_BODY_SIZE) {
                req.destroy();
                reject(new Error('Request body too large'));
            }
        });

        req.on('end', () => resolve(data));
        req.on('error', reject);
    });
};

const requestHandler = async (req, res) => {
    if (req.method === 'POST' && req.url === '/') {
        try {
            const body = await parseRequestBody(req);
            console.log('Request:', JSON.stringify(JSON.parse(body)));

            res.writeHead(200);
            res.end();
        } catch (error) {
            console.error('Error processing request:', error.message);
            res.writeHead(400);
            res.end();
        }
    } else {
        res.writeHead(404);
        res.end();
    }
};

const server = http.createServer(requestHandler);
server.listen(3000, () => console.log('Server running on port 3000'));
