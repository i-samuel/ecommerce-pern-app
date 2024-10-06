const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const helmet = require("helmet");
const cors = require('cors');
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const passport = require('passport');
const initializePassport = require('./passport.config');
const pgPool = require("./model/database");
//const csurf = require('csurf');
const apiRouter = require('./routes/apiRouter');
const webhooksRouter = require('./routes/webhooks');

const path = require('path');

//server
const app = express();
const PORT = process.env.PORT || 4001;

// enabling the Helmet middleware
app.use(helmet({
    contentSecurityPolicy: {
        useDefaults: true,
        directives: {
            "default-src": ["'self'", "js.stripe.com"],
            "script-src": ["'self'", "js.stripe.com"],
        },
    },
}));

//static files
const buildPath = path.join(__dirname, 'view/build');
app.use(express.static(buildPath));

app.use(cors({ origin: true, credentials: true }));

//passport
initializePassport(passport);
app.use(passport.initialize());

app.use(
    session({
        store: new pgSession({
            pool: pgPool,
        }),
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: process.env.NODE_ENV === 'production',
            maxAge: 1000*60*60*24,
            sameSite: true           
        }
    })
);

app.use(passport.session());

//routes
app.use('/api', apiRouter);
app.use('/v2/webhooks', webhooksRouter);

// gets the static files from the build folder
app.get('*', (req, res) => {
    res.sendFile(path.join(buildPath, 'index.html'));
})

//error handling
app.use((err, req, res, next) => {{
    const status = err.status || 500;
    console.log(err.message);
    res.status(status).json({error: err.message});
}})

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
})