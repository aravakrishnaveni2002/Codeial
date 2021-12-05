module.exports.profile = function(request,response){

    // return response.send('<h1>User Profile</h1>');

    return response.render('user',{
        title: 'User'
    })
}