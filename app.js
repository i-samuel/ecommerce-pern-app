const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');
const bcrypt = require('bcrypt');
const apiRouter = require('./routes/apiRouter');

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const pool = require('./model/database');

//server
const app = express();
const PORT = process.env.PORT || 4001;


app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000*60*60*24,
            sameSite: "none"            
        }
    })
)

//cors
app.use(cors({ origin: true, credentials: true }));

//body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
//passport
app.use(passport.initialize());
app.use(passport.session());

//seriealize user
passport.serializeUser((user, done) => {
    done(null, user.id);
})

//deserialize user
passport.deserializeUser((id, done) => {
    pool.query('SELECT id, username FROM users WHERE id = $1', [id], (err, results) => {
        if(err) return done(err);
        done(null, results.rows[0]);
    })
})

passport.use(new LocalStrategy(
    async function (username, password, done) {
        pool.query('SELECT * FROM users WHERE username=$1', [username], (err, user) => {
           
            if(err) {return done(err);}
            if(user.rows.length === 0) { return done(null, false); }

            bcrypt.compare(password, user.rows[0].password, (err, verified) => {
                if(err) { return done(err); }
                
                if(verified){ return done(null, user.rows[0]); }

                return done(null, false);
            });

        })
    }
))

//routes
app.use('/api', apiRouter);

app.get('/', (req, res) => {
    res.send('hello home');
})

//error handling
app.use((err, req, res, next) => {{
    const status = err.status || 500;
    res.status(status).send(err.message);
}})

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
})