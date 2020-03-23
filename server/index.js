const express = require('express');
const path = require('path');
const volleyball = require('volleyball');
const app = express();
const session = require('express-session');

const SequelizeStore = require('connect-session-sequelize')(session.Store);
const passport = require('passport');
const db = require('./db');
const socketio = require('socket.io');
const PORT = process.env.PORT || 3000;

module.exports = app;
const sessionStore = new SequelizeStore({ db });

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
const createApp = () => {
  //logging middleware
  app.use(volleyball);

  // body parsing middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(
    session({
      secret: process.env.SESSION_SECRET || 'my best friend is Cody',
      store: sessionStore,
      resave: false,
      saveUninitialized: false,
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());

  // auth and api routes
  app.use('/auth', require('./auth'));
  app.use('/api', require('./api'));

  // static file-serving middleware
  app.use(express.static(path.join(__dirname, '..', 'public')));

  // any remaining requests with an extension (.js, .css, etc.) send 404
  app.use((req, res, next) => {
    if (path.extname(req.path).length) {
      const err = new Error('Not found');
      err.status = 404;
      next(err);
    } else {
      next();
    }
  });

  // error handling endware
  app.use((err, req, res, next) => {
    console.error(err);
    console.error(err.stack);
    res.status(err.status || 500).send(err.message || 'Internal server error.');
  });
};

const syncDb = () => db.sync();

const startListening = () => {
  // start listening (and create a 'server' object representing our server)
  const server = app.listen(PORT, err => {
    if (err) {
      console.error(err);
    } else console.log('app listening on port: ', PORT);
  });
  const io = socketio(server);
  require('./socket')(io);
};

async function bootApp() {
  await sessionStore.sync();
  await syncDb();
  await createApp();
  await startListening();
}

bootApp();
