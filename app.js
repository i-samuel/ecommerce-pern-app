const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');
//const csurf = require('csurf');
const apiRouter = require('./routes/apiRouter');

const passport = require('passport');
const initializePassport = require('./passport.config');

//const cookieParser = require('cookie-parser')


//server
const app = express();
const PORT = process.env.PORT || 4001;
//app.use(cookieParser());
//cors
app.use(cors({ origin: true, credentials: true }));

//body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//app.use(cookieParser({secret: process.env.SESSION_SECRET}));
//passport
initializePassport(passport);
app.use(passport.initialize());

app.use(
    session({
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

app.get('/', (req, res) => {
    res.send('hello home');
})

//error handling
app.use((err, req, res, next) => {{
    const status = err.status || 500;
    res.status(status).json({error: err.message});
}})

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
})