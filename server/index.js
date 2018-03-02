require('dotenv').config();
const express = require('express');
const session = require('express-session');
const massive = require('massive');
const passport = require('passport');
const Auth0Strategy = require('passport-auth0');
const bodyParser = require('body-parser');

const {
    SERVER_PORT,
    SESSION_SECRET,
    DOMAIN,
    CLIENT_ID,
    CLIENT_SECRET,
    CALLBACK_URL,
    CONNECTION_STRING
} = process.env



const app = express();
app.use(bodyParser.json());

massive(CONNECTION_STRING).then(db => {
    app.set('db', db);
})


app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))

app.use(passport.initialize());
app.use(passport.session());

passport.use(new Auth0Strategy({
    domain: DOMAIN,
    clientID: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    callbackURL: CALLBACK_URL,
    scope: 'openid profile'

}, function(accesToken, refreshToken, extraParams, profile, done) {
    const db = app.get('db')
    db.find_user([profile.id]).then(users => {
       if(!users[0]) {
           db.create_user([ profile.id, profile.name.givenName, profile.name.familyName]).then(userCreated => {
                done(null, userCreated[0].id)
           })
       } else {
           done(null, users[0].id)
       }
    })
    

}))
passport.serializeUser( (id, done) => {
    done(null, id)
})
passport.deserializeUser( (id, done) => {
    app.get('db').find_session_user([id]).then(user => {
        done(null, user[0])
    })
})

app.get('/auth', passport.authenticate('auth0'));
app.get('/auth/callback', passport.authenticate('auth0', {
    successRedirect: 'http://localhost:3000/#/dashboard',
    failureRedirect: 'http://localhost:3000'
}))
app.get('/auth/me', (req, res) => {
    if(req.user) {
        res.status(200).send(req.user)
    } else {
        res.status(401).send('nice try')
    }
})
app.get('/auth/logout', (req, res) => {
    req.logOut();
    res.redirect('http://localhost:3000/')
})
app.put('/updateProfile/:id&:body', (req, res) => {

    const{params} = req;
    app.get('db').update_user([params.body, parseInt(params.id)]).then(() => res.status(200).send());
})

app.get('/getFriends/:hobby', (req, res) => {

    const{params} = req;
    app.get('db').getFriends([params.hobby]).then(friends => res.status(200).send(friends));
})

app.get('/getAllFriends', (req, res) => {

    app.get('db').getAllFriends().then(friends => res.status(200).send(friends))
})

app.get('/searchFriends/:filter&:search', (req, res) => {

    const{params} = req;
    app.get('db').searchFriends([params.search]).then(friends => res.status(200).send(friends))
})
app.listen(SERVER_PORT, () => console.log(`listening on port ${SERVER_PORT}`))