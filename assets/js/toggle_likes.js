
class ToggleLike{
    constructor(toggleElement){
        this.toggler = toggleElement;
        this.toggleLike();
    }   

    toggleLike(){

        $(this.toggler).click(function(e){
            
            e.preventDefault();
            let self = this;

            $.ajax({
                type: 'GET',
                url: $(self).attr('href'),
            })
            .done(function(data){
                let likesCount = parseInt($(self).attr('data-likes'));
                console.log(likesCount);
                if(data.data.deleted == true){
                    likesCount -= 1;
                }
                else{
                    likesCount += 1;
                }

                $(self).attr('data-likes', likesCount);
                
                $(self).html(`<i class="fas fa-thumbs-up"></i> <span>${likesCount} Likes</span>`);
            })
            .fail(function(errData){
                console.log("Error in completeing the request");
            });
        });
    }
}