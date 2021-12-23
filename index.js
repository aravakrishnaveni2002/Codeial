const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
const db = require('./config/mongoose');


//used for seesion cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-stratagy');
const MongoStore = require('connect-mongo')(session);



app.use(express.urlencoded());

app.use(cookieParser());




app.use(express.static('assets'));

app.set('view engine','ejs');
app.set('views','./views');


// mongo store is used to store the session cookie int the db
app.use(session({
    name: 'codeial',
    //ToDo change the secret before deployment in production mode
    secret: 'any random',
    saveUninitialized: false,
    resave: false,
    cookie: {
        //should be in milli seconds
        maxAge: (10 * 60 * 1000)
    },
    store: new MongoStore(
        {
    
            mongooseConnection: db,
            autoRemove: 'disabled'
    
        },

        function(err){
            console.log(err || 'connect-mongodb set up ok');
        }
    )

}));

app.use(passport.initialize());

app.use(passport.session());

app.use(passport.setAuthenticatedUser);

// use express router 
app.use('/',require('./routes/index'));




app.listen(port,function(err){

    if(err){
        // console.log('Error in running the server: ',err);

        // interpolation we can write like this also  anything written in this first evaluated and then printed ${}
        console.log(`Error in running the server ${err}`); 
        return;
    }

    // console.log('Server is running on the port: ',port);
    console.log(`Server is running on the port ${port}`);
});