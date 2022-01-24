const Friendship = require('../models/friendship');
const User = require('../models/user');

module.exports.toggleFriendship = async function(request,response){

    try{

        let removed = false;

        //find if that friendship already exists or not
        let userExists1 = await Friendship.findOne({
            from_user: request.user._id,
            to_user: request.query.id
        });
        //if friendship already exists then remove it
        if(userExists1){
            let from_user = await User.findById(request.user._id);
            let to_user = await User.findById(request.query.id);
            from_user.friends.pull(userExists1._id);
            from_user.save();
            to_user.friends.pull(userExists1._id);
            to_user.save();
            userExists1.remove();
            removed = true;
        }

        else{
            let userExists2 = await Friendship.findOne({
                from_user: request.query.id,
                to_user: request.user._id
            });

            if(userExists2){
                let to_user = await User.findById(request.user._id);
                let from_user = await User.findById(request.query.id);
                from_user.friends.pull(userExists2._id);
                from_user.save();
                to_user.friends.pull(userExists2._id);
                to_user.save();
                userExists2.remove();
                removed = true;
            }

            //if friendship does not exists then create that friendship 
            else{
                let from_user = await User.findById(request.user._id);
                let to_user = await User.findById(request.query.id);

                let newfriendship = await Friendship.create({
                    from_user: request.user._id,
                    to_user: request.query.id
                });

                from_user.friends.push(newfriendship._id);
                from_user.save();
                to_user.friends.push(newfriendship._id);
                to_user.save();
            }
        
        }

        return response.json(200,{
            message: "Request successful",
            data: {
                removed: removed
            }
        })
    }
    catch(err){
        return response.json(500,{
            message: "Internal Server error"
        });
    }
}

module.exports.removeFriendship = async function(request,response){

    try{
        //find if that friendship already exists or not
        let userExists1 = await Friendship.findOne({
            from_user: request.user._id,
            to_user: request.query.id
        });
        //if friendship already exists then remove it
        if(userExists1){
            let from_user = await User.findById(request.user._id);
            let to_user = await User.findById(request.query.id);
            from_user.friends.pull(userExists1._id);
            from_user.save();
            to_user.friends.pull(userExists1._id);
            to_user.save();
            userExists1.remove();
            
        }

        else{
            let userExists2 = await Friendship.findOne({
                from_user: request.query.id,
                to_user: request.user._id
            });

            if(userExists2){
                let to_user = await User.findById(request.user._id);
                let from_user = await User.findById(request.query.id);
                from_user.friends.pull(userExists2._id);
                from_user.save();
                to_user.friends.pull(userExists2._id);
                to_user.save();
                userExists2.remove();
            }
        } 
        
        return response.json(200,{
            message: 'Request successful',
            data: {
                user_id: request.query.id
            }
        })

    }
    catch(err){
        return response.json(500,{
            message: "Internal Server error"
        });
    }
}