// Load environment variables from .env file
require('dotenv').config();

const express = require("express");
const path = require("path");
const database = require('./database.js');
const cors = require("cors");
const http = require('http');
const session = require('express-session');
const bodyParser = require('body-parser');

const app = express();
const server = http.createServer(app);

// Start the server
const PORT = process.env.PORT || 3001;
app.use(express.static(path.resolve(__dirname, '../frontend/build')));
server.listen(PORT, () => console.log(`Backend Started On Port ${PORT}`));

// Setup CORS based on environment
const corsOrigins = process.env.NODE_ENV === 'production' 
  ? [process.env.HEROKU_APP_URL || 'https://unite-pro-0d311a8552a3.herokuapp.com'] 
  : ['http://localhost:3000'];

app.use(cors({
  origin: corsOrigins,
  credentials: true // Important for cookies/sessions with OAuth
}));

// Add middleware to parse JSON bodies
app.use(express.json());
// Add middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// session store and session config
app.use(
  session({
    store: new (require('memorystore')(session))(),
    secret: process.env.COOKIE_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: {
      maxAge: 60000 * 60 * 2,
    },
  }),
);

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Serve static files from the React frontend app in production
if (process.env.NODE_ENV === 'production') {
  console.log('Serving static files from:', path.join(__dirname, 'public'));
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'public')));
}

app.get('/ping', (req, res) => {
  console.log("backend hit");
  res.json({message: 'Pong'});
});

// Routes - load AFTER all middleware is set up
require('./routes/manage.js')(app, database);
require('./routes/polls.js')(app, database);
require('./routes/signIn.js')(app, database);

// Serve the frontend build
if (process.env.NODE_ENV === 'production') {
  app.get('*', (_, res) => res.sendFile('index.html', {root: '../frontend/build'}));
}