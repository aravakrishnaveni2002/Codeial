
const User = require('../models/user');


module.exports.profile = async function(request,response){

    //getting a cookie
    // console.log(request.cookies);

    //changing a cookie
    // response.cookie('user_id',24);

    // User.findById(request.params.id,function(err,user){
    //     if(err){
    //         console.log("Error in finding the user");
    //         return;
    //     }

    //     return response.render('profile',{
    //         title: 'User',
    //         profile_user: user
    //     })
    // });


    try{
        let user = await User.findById(request.params.id);

        return response.render('profile',{
            title: 'User',
            profile_user: user
        });

    }catch(err){
        request.flash('error',err);
        return response.redirect('back');
    }
}

module.exports.update = function(request,response){

    if(request.user.id == request.params.id){

        User.findByIdAndUpdate(request.params.id,{name: request.body.name,email: request.body.email},function(err,user){
            if(err){
                request.flash('error',err);
                return response.redirect('back');
            }

            request.flash('success','Your profile upadted successfully!');
            return response.redirect('back');
        });
    }

    else{

        request.flash('error','You cant not update this profile');
        return response.redirect('back');
        // return response.status(404).send("Unauthorised");
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

    request.flash('success','You have logged out!');
    return response.redirect('/');
}

module.exports.create = async function(request,response){

    if(request.body.password != request.body.confrim_password){
        request.flash('error','confrim password does not match!');
        return response.redirect('back');
    }

    // User.findOne({email: request.body.email},function(err,user){
    //     if(err){
    //         console.log("Error in finding the user sigging up");
    //         return;
    //     }

    //     if(!user){
    //         User.create(request.body,function(err,user){
    //             if(err){
    //                 console.log("Error in creating the user sigging up");
    //                 return;
    //             }

    //             return response.redirect('/users/sign-in');
    //         });
    //     }

    //     else{
    //         return response.redirect('back');
    //     }
    // });

    try{
        let user = await User.findOne({email: request.body.email});

        if(!user){
            await User.create(request.body);

            request.flash('success','User created successfully');            
            return response.redirect('/users/sign-in');
            
        }

        else{
            request.flash('error','A user with this email already exists');
            return response.redirect('back');
        }

    }catch(err){
        request.flash('error',err);
        return response.redirect('back');
    }

}

module.exports.createSession = function(request,response){

    request.flash('success','Logged in Sucessfully');
    
    return  response.redirect('/');

}

