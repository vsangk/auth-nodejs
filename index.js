const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const router = require('./router');
const mongoose = require('mongoose');

/** DB Setup */
mongoose.connect('mongodb://vsangk:test1234@ds133601.mlab.com:33601/dummy-auth');

/** App Setup */
const app = express();
// logging middleware
app.use(morgan('combined'));
// parses request body to json
app.use(bodyParser.json({ type: '*/*' }))
router(app);

/** Server Setup */
const port = process.env.PORT || 3090;
// create an http server and forward it to express app
const server = http.createServer(app)
server.listen(port);
console.log('====================================');
console.log('Server listening on', port);
console.log('====================================');