const Post = require('../../../models/post');
const Comment = require('../../../models/comment');

module.exports.index = async function(request,response){

    let posts = await Post.find({})
        .sort('-createdAt')
        //only populating user name
        .populate('user',{name: 1})
        .populate({
            path: 'comments',
            options: {
                sort: {'createdAt': -1}
            },
            populate: {
                path: 'user',
                //only populating user name
                select: {name: 1}
                
            }
        });

    return response.json(200,{
        message: "List of posts",
        posts: posts
    });

}

module.exports.delete = async function(request,response){

    try{
        let post = await Post.findById(request.params.id);

        if(request.user.id == post.user){
            post.remove();

            await Comment.deleteMany({post: request.params.id});

            return response.json(200,{
                message: "Posts and its related comments got deleted"
            });
            
        }

        else{
            return response.json(401,{
                message: "You can not delete this post!"
            });
        }

    }catch(err){
       console.log("********",err);
       return response.json(500,{
           message: "Internal Server Error"
       });
    }

    

}