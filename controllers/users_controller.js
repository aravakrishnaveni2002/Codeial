
const User = require('../models/user');


module.exports.profile = function(request,response){

    // return response.send('<h1>User Profile</h1>');

    //getting a cookie
    // console.log(request.cookies);

    //changing a cookie
    // response.cookie('user_id',24);

    User.findById(request.params.id,function(err,user){
        if(err){
            console.log("Error in finding the user");
            return;
        }

        return response.render('profile',{
            title: 'User',
            profile_user: user
        })
    });

    
}

module.exports.update = function(request,response){

    if(request.user.id == request.params.id){

        User.findByIdAndUpdate(request.params.id,{name: request.body.name,email: request.body.email},function(err,user){
            if(err){
                console.log("Error in finding the user");
                return;
            }

            return response.redirect('back');
        });
    }

    else{

        return response.status(404).send("Unauthorised");
    }
}

module.exports.signup = function(request,response){
    return response.render('signup',{
        title: "Codeial | Sing Up"
    });   
}

module.exports.signin = function(request,response){
    return response.render('signin',{
        title: "Codeial | Sing In"
    });   
}

module.exports.signout = function(request,response){
    request.logout();
    return response.redirect('/');
}

module.exports.create = function(request,response){

    if(request.body.password != request.body.confrim_password){
        return response.redirect('back');
    }

    User.findOne({email: request.body.email},function(err,user){
        if(err){
            console.log("Error in finding the user sigging up");
            return;
        }

        if(!user){
            User.create(request.body,function(err,user){
                if(err){
                    console.log("Error in creating the user sigging up");
                    return;
                }

                return response.redirect('/users/sign-in');
            });
        }

        else{
            return response.redirect('back');
        }
    });

}

module.exports.createSession = function(request,response){
    
    return  response.redirect('/');

}

