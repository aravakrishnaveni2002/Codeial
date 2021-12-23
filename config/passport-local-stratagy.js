const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');


//authentication using passport
passport.use(new LocalStrategy({
        usernameField: 'email'
    },
    function(email,password,done){

        User.findOne({email: email},function(err,user){
            if(err){
                console.log("Error in finding the user ----> passport");
                return done(err);
            }

            if(!user || user.password != password){
                console.log("Invalid username/password");
                return done(null,false);
            }

            return done(null,user);
        });
    }
));


//seralizing the user to decide which key is to be kept in the cookie
passport.serializeUser(function(user,done){
   return done(null,user.id);
});


//desearlizing the user from the key in the cookies
passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if(err){
            console.log("Error in finding the user ----> passport");
            return done(err);
        }

        return done(null,user); 
    });
});


//check if user is authenticated
passport.checkAuthentication = function(request,response,next){
    
    //if user is signed in then pass on the request to the next function(controller action)
    if(request.isAuthenticated()){
        return next();
    }

    //if uesr is not signed in
    return response.redirect('/user/sign-in');
} 

passport.setAuthenticatedUser = function(request,response,next){
    
    //request.user contains the current user from the session cookie an we are just sending thi sto the locals for the views 
    if(request.isAuthenticated()){
        response.locals.user = request.user;
    }

    return next();
}

passport.checkUserNotSignedIn = function(request,response,next){

    if(!request.isAuthenticated()){
        return next();
        
    }

    return response.redirect('/user/profile');
}

module.exports = passport;