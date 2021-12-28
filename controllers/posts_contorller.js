const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create = function(request,response){

    // console.log(request.body);
    // console.log(request.user);

    Post.create({
        content: request.body.content,
        user: request.user._id

    },function(err,post){
        if(err){
            request.flash('error',err);
            return response.redirect('back');
        }

        request.flash('success','Post Published');
        return response.redirect('back');
    });
    
}

module.exports.delete = async function(request,response){

    // Post.findById(request.params.id,function(err,post){
    //     if(err){
    //         console.log("Error in finding the post");
    //         return;
    //     }

    //     if(request.user.id == post.user){
    //         post.remove();

    //         Comment.deleteMany({post: request.params.id},function(err){
    //             if(err){
    //                 console.log("Error in deleting the comments");
    //                 return;
    //             }

    //             return response.redirect('back');
    //         });
    //     }

    //     else{
    //         return response.redirect('back');
    //     }
    // });

    try{
        let post = await Post.findById(request.params.id);

        if(request.user.id == post.user){
            post.remove();

            await Comment.deleteMany({post: request.params.id});

            request.flash('success','Post and its related comments deleted');

            return response.redirect('back');
        }

        else{
            request.flash('error','You can not delete this post');
            return response.redirect('back');
        }

    }catch(err){
        request.flash('error',err);
        return response.redirect('back');
    }

    

}