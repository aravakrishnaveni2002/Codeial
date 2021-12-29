const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create = async function(request,response){

    // console.log(request.body);
    // console.log(request.user);

    try{

        let post = await Post.create({
            content: request.body.content,
            user: request.user._id
        });


        if(request.xhr){

            post = await post.populate('user','name');

            return response.status(200).json({
                data: {
                    post: post
                },
                message: "Post created"
            });
        }

        request.flash('success','Post Published');
        return response.redirect('back');

    }catch(err){
        request.flash('error',err);
        return response.redirect('back');
    }

    // Post.create({
    //     content: request.body.content,
    //     user: request.user._id
    // },function(err,post){
    //     if(err){
    //         console.log(err);
    //         return;
    //     }

    //     if(request.xhr){

    //         // post.populate('user','name').exec(function(err,post){
    //             return response.status(200).json({
    //                 data: {
    //                     post: post
    //                 },
    //                 message: "Post created"
    //             });
    //         // });
            
    //     }

    //     return response.redirect('back');
    // });
    
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

            if(request.xhr){

                return response.status(200).json({
                    data:{
                        post_id: request.params.id
                    },
                    message: "Post deleted"
                });
            }

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