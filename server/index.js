const express = require('express');
const volleyball = require('volleyball');
const app = express();
const passport = require('passport');
const db = require('./db');
const PORT = process.env.PORT || 3000;

module.exports = app;

//passport registration
passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser(async (id, done) => {
  try {
    const user = await db.models.user.findByPk(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

//logging middleware
app.use(volleyball);

// body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.use('/api', require('./api'));
app.use('/auth', require('./auth'));

// error handling endware
app.use((err, req, res, next) => {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error.');
});

const syncDb = () => db.sync();

const startListening = () => {
  // start listening (and create a 'server' object representing our server)
  const server = app.listen(PORT, err => {
    if (err) {
      console.error(err);
    } else console.log('app listening on port');
  });
};

async function bootApp() {
  await syncDb();
  await startListening();
}

bootApp();
