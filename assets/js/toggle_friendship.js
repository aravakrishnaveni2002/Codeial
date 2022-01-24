class ToggleFriendship {
    constructor(toggleElement){
        this.toggler = toggleElement;
        this.toggleFriendship();
    }

    toggleFriendship(){

        let pSelf = this;

        $(this.toggler).click(function(e){

            e.preventDefault();
            let self = this;
            $.ajax({
                type: 'GET',
                url: $(self).attr('href')
            })
            .done(function(data){
                
                if(data.data.removed == false){
                    $(self).html(`Remove Friend`);
                    pSelf.notyNotification('Added to Your Friends','success');
                }

                else{
                    $(self).html(`Add Friend`);
                    pSelf.notyNotification('Removed from Your Friends','success');
                }
            })
            .fail(function(errData){
                console.log("Error in completing the request");
            });
        });

    }

    notyNotification(nText,nType){

        new Noty({
            theme: 'relax',
            text: nText,
            type: nType,
            layout: "topRight",
            timeout: 1500
        }).show();
    }
}

class Friendship{

    constructor(element){
        this.element = element;
        this.removeElement();
    }

    removeElement(){

        $(this.element).click(function(e){
            e.preventDefault();
            let self = this;

            $.ajax({
                type: 'GET',
                url: $(self).attr('href')
            })
            .done(function(data){
                $(`#each-user-${data.data.user_id}`).remove();
                notyNotification('Removed from Your Friends','success');
            })
            .fail(function(errData){
                console.log("Error in completeing the request");
            })

            
        });
    }
}


