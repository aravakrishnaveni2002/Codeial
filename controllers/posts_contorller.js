const Post = require('../models/post');

module.exports.create = function(request,response){

    // console.log(request.body);
    // console.log(request.user);

    Post.create({
        content: request.body.content,
        user: request.user._id

    },function(err,post){
        if(err){
            console.log("Error in creating the post");
            return;
        }

        return response.redirect('back');
    });
    
}