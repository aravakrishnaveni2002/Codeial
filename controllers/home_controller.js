const Post = require('../models/post');
const User = require('../models/user');
const Friendship = require('../models/friendship');

module.exports.home = async function(request,response){

    //populating the user of each post as we also refernced the user
    // Post.find({})
    // .populate('user')
    // .populate({
    //     path: 'comments',
    //     populate: {
    //         path: 'user'
    //     }
        
    // })
    // .exec(function(err,post){

    //     if(err){
    //         console.log("Error in finding the post");
    //         return;
    //     }


    //     User.find({},function(err,user){
    //         if(err){
    //             console.log("Error in finding the user");
    //             return;
    //         }

    //         return response.render('home',{
    //             title: 'Home',
    //             posts: post,
    //             all_users: user
    //         });

    //     });
        
        
    // });

    //making code simple by using asyc await
    try{
        let posts = await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path: 'comments',
            options: {
                sort: {'createdAt': -1}
            },
            populate: {
                path: 'user likes'
            }
        })
        .populate('likes')

        let users = await User.find({})
        .populate({
            path: 'friends',
            populate: {
                path: 'from_user to_user'

            }
        });

        return response.render('home',{
            title: "Home",
            posts: posts,
            all_users: users
        });

    }catch(err){
        console.log("Error",err);
        return;
    }

    

    
}

