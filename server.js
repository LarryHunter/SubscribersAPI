require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to subscribers database'));

app.use(express.json());

const subscribersRouters = require('./routes/subscribers');
app.use('/subscribers', subscribersRouters);

// This is the 'catch all' response for anything that is not found.
app.get('*', (req, res) => res.send("Error 404 - Page not found!"));

// Tell Express to listen for requests (start server)
const port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log("Server has started and listening on port: " + port);
});
