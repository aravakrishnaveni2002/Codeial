const Like = require('../models/like');
const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.toggleLike = async function(request,response){

    try{
        let likeable;
        let deleted = false;

        //find that post on which the like is made
        if(request.query.type == 'Post'){
            likeable = await Post.findById(request.query.id).populate('likes');
        }
        //find that comment on which the like is made
        else{
            likeable = await Comment.findById(request.query.id).populate('likes');
        }

        //find that if there is any existing like
        let existingLike = await Like.findOne({
            likeable: request.query.id,
            user: request.user._id,
            onModel: request.query.type
        });
        
        //if that like already exists remove it from the related post or comment
        if(existingLike){
            likeable.likes.pull(existingLike._id);
            likeable.save();
            existingLike.remove();
            deleted = true;
        }

        else{
            let like = await Like.create({
                user: request.user._id,
                likeable: request.query.id,
                onModel: request.query.type
            });

            likeable.likes.push(like._id);
            likeable.save();
        }

        return response.json(200,{
            message: "Request successful",
            data:{
                deleted: deleted
            }
        });

    }
    catch(err){
        console.log(err);
        return response.json(500,{
            message: "Internal server error"
        });
    }


}