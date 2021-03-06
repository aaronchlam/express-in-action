const express = require('express');
const http = require('http');
const logger = require('morgan');
const path = require('path');

const app = express();

// Middleware example
app.use(logger('short'));

// Fake authentication middleware
app.use((req, res, next) => {
    const now = new Date();
    const minute = now.getMinutes();
    
    if ((minute % 2) === 0) {
        next();
    } else {
        res.statusCode = 403;
        res.end("Not authorized");
    }
});

// serve static files
publicPath =  path.resolve(__dirname, 'public');
app.use(express.static(publicPath));

app.use((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' })
    res.end('Hello, World!')
});

http.createServer(app).listen(3000);
