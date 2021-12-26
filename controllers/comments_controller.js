const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = function(request,response){
  
    Post.findById(request.body.post_id,function(err,post){
       
        if(err){
            condole.log("Error in finding the post");
            return;
        }

        if(post){
            Comment.create({
                content: request.body.content,
                user: request.user._id,
                post: request.body.post_id
        
            },function(err,comment){
                if(err){
                    console.log("Error in creating the comment");
                    return;
                }
                
                post.comments.push(comment._id);
                post.save();
                return response.redirect('back');
            }
        
            );
        }
    });


    

    

}