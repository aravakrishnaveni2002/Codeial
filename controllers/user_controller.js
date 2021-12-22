
const User = require('../models/user');

module.exports.profile = function(request,response){

    // return response.send('<h1>User Profile</h1>');

    //getting a cookie
    console.log(request.cookies);

    //changing a cookie
    // response.cookie('user_id',24);

    if(request.cookies.user_id == '0'){
        return response.redirect('/user/sign-in');
    }

    else if(request.cookies.user_id){

        console.log(request.cookies.user_id);

        User.findOne({_id: request.cookies.user_id},function(err,user){
            if(err){
                console.log("Error in finding the user_id");
                return;
            }

            if(!user){
                return response.redirect('/user/sign-in');
            }

            
            return response.render('profile',{
                title: 'User',
                user: user
                        
            });

        });

    }

    else{
        return response.redirect('/user/sign-in');
    }

    
}

// module.exports.profile = function(request,response){

// }

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
    response.cookie('user_id','0');
    return response.redirect('/');
}

module.exports.create = function(request,response){

    if(request.body.password != request.body.confrim_password){
        return response.redirect('back');
    }

    User.findOne({email: request.body.email},function(err,user){
        if(err){
            console.log("Error in finding the user signing up");
            return;
        }

        if(!user){
            User.create(request.body,function(err,user){
                if(err){
                    console.log("Error in creating the user signing up");
                    return;
                }

                return response.redirect('/user/sign-in');
            });
        }

        else{
            return response.redirect('back');
        }
    });

}

module.exports.createSession = function(request,response){

    User.findOne({email: request.body.email},function(err,user){
        if(err){
            console.log("Error in finding the user signing in");
            return; 
        }

        if(!user){
            return response.redirect('back');
        }

        else{
            if(request.body.password != user.password){
                return response.redirect('back');
            }

            else{
                response.cookie('user_id',user._id);
                return response.redirect('/user/profile');
            }

        }
    });
}