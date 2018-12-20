const express = require('express');
const state = require('./state.js');

const app = express();
const port = 9999;

app.listen(port);

// app.use(express.json());       // to support JSON-encoded bodies
// app.use(express.urlencoded()); // to support URL-encoded bodies

app.get('/get/:key', (request, response) => {
    const retrievedValue = state.get(request.params.key);
    console.log('Getting: ', retrievedValue);
    response.send(retrievedValue);
});

app.post('/set', (request, response) => {
    state.set(request.body.key, request.body.value);
    const updatedValue = state.get(request.body.key)
    console.log('Setting: ', updatedValue);
    response.send(updatedValue);
});

console.log('Session service started on: ' + port);
