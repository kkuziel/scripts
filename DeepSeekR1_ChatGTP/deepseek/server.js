const express = require('express');
const app = express();

app.get('/health', (req, res) => {
    res.sendStatus(200);
});

const server = app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
module.exports = app;