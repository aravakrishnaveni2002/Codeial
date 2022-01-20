const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
const db = require('./config/mongoose');

const expressLayouts = require('express-ejs-layouts');

//used for seesion cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-stratagy');
const passportJWT = require('./config/passport-jwt-stratagy');
const MongoStore = require('connect-mongo')(session);

const sassMiddleware = require('node-sass-middleware');

const flash = require('connect-flash');
const customMware = require('./config/middleware');

app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'extended',
    prefix: '/css'



}));



app.use(express.urlencoded());

app.use(cookieParser());




app.use(express.static('./assets'));

app.use('/uploads',express.static(__dirname + '/uploads' ));

app.use(expressLayouts);
//extract styles and scripts from sub pages into the layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

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

app.use(flash());
app.use(customMware.setFlash);

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