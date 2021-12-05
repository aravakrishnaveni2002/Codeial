module.exports.home = function(request,response){

    return response.send('<h1>Express is up and running</h1>');
}

module.exports.profile = function(request,response){

    return response.send('<h1>Iron Man Profile</h1>');
} 