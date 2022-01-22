const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');

passport.use(new googleStrategy({
        clientID: "470239071462-t9q596vd9hk1093l63hfvujolao4q4ml.apps.googleusercontent.com",
        clientSecret: "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",
        callbackURL: "http://localhost:8000/users/auth/google/callback"
    
    },

    function(accessToken, refreshToken, profile, done){
        User.findOne({email: profile.emails[0].value}).exec(function(err,user){
            if(err){
                console.log("Error in google strategy passport ",err);
                return;
            }

            console.log(profile);

            if(user){
                //if found set this user as request.user
                return done(null,user);
            }

            //if not found then create user and set it as request.user
            else{
                User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    //crypto used to create random password
                    password: crypto.randomBytes(20).toString('hex')
                },function(err,user){
                    if(err){
                        console.log("Error in creating user google strategy passport ",err);
                        return;
                    }

                    return done(null,user);
                });
            }
        });
    }

));
