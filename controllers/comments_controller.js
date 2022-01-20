const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = async function(request,response){
  
    // Post.findById(request.body.post_id,function(err,post){
       
    //     if(err){
    //         condole.log("Error in finding the post");
    //         return;
    //     }

    //     if(post){
    //         Comment.create({
    //             content: request.body.content,
    //             user: request.user._id,
    //             post: request.body.post_id
        
    //         },function(err,comment){
    //             if(err){
    //                 console.log("Error in creating the comment");
    //                 return;
    //             }
                
    //             post.comments.push(comment._id);
    //             post.save();
    //             return response.redirect('back');
    //         }
        
    //         );
    //     }
    // });

    try{

        let post = await Post.findById(request.body.post_id);

        if(post){
            let comment = await Comment.create({
                content: request.body.content,
                user: request.user._id,
                post: request.body.post_id

            });

            post.comments.push(comment);
            post.save();

            if(request.xhr){

                //only populating user name
                comment = await comment.populate('user',{name: 1});

                return response.status(200).json({
                    data: {
                        comment: comment
                    },
                    message: "Comment created"
                });
            }
 
            request.flash('success','Comment added');
            return response.redirect('back');
        }

        else{
            request.flash('error','This post does not exits');
            return response.redirect('back');
        }

    }catch(err){
        request.flash('error',err);
        return response.redirect('back');
    }

}

module.exports.delete = async function(request,response){

    // Comment.findById(request.params.id,function(err,comment){
    //     if(err){
    //         console.log("Error in finding the comment");
    //         return;
    //     }

    //     if(comment.user == request.user.id){
            
    //         let commentPost = comment.post;
    //         comment.remove();

    //         Post.findByIdAndUpdate(commentPost,{ $pull: {comments: request.params.id}},function(err,post){
    //             return response.redirect('back');
    //         });
    //     }

        

    //     else{
    //         return response.redirect('back');
    //     }

    // });

    try{

        let comment = await Comment.findById(request.params.id);

        if(comment.user == request.user.id){
            
            let commentPost = comment.post;
            comment.remove();

            await Post.findByIdAndUpdate(commentPost,{ $pull: {comments: request.params.id}});

            if(request.xhr){

                return response.status(200).json({
                    data: {
                        comment_id: request.params.id
                    }
                });
            }

            request.flash('success','Comment deleted');
            return response.redirect('back');
            
        }

        else{
            request.flash('error','You can not delete this comment');
            return response.redirect('back');
        }

    }catch(err){
        request.flash('error',err);
        return response.redirect('back');
    }
}