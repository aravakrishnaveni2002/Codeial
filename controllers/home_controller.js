module.exports.home = function(request,response){

    // return response.send('<h1>Express is up and running</h1>');

    return response.render('home',{
        title: 'Home'
    });
}

