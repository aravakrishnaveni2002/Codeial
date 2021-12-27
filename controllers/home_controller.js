const Post = require('../models/post');

module.exports.home = function(request,response){

    // Post.find({},function(err,post){
    //     if(err){
    //         console.log("Error in finding the post");
    //         return;
    //     }

    //     return response.render('home',{
    //         title: 'Home',
    //         posts: post
    //     });

        
    // });

    //populating the user of each post as we also refernced the user
    Post.find({})
    .populate('user')
    .populate({
        path: 'comments',
        populate: {
            path: 'user'
        }
        
    })
    // .populate({
    //     path: 'comments',
    //     populate: {
    //         path: 'post',
            
    //     }
    // })
    // .populate({
    //     path: 'comments',
    //     populate: {
    //         path: 'post',
    //         populate: {
    //             path: 'user',
    //         }
    //     }
        
    // })
    .exec(function(err,post){
        if(err){
            console.log("Error in finding the post");
            return;
        }

        return response.render('home',{
            title: 'Home',
            posts: post
        });
    });

    
}

