

class postComments{

    constructor(postId){

        this.postId = postId;
        this.postContainer = $(`#each-post-${postId}`);
        this.commentForm = $(`#post-${postId}-comment-form`);

        this.createComment(postId);

        let self = this;
        $(' #delete-comment',this.postContainer).each(function(){
            self.deleteComment($(this));
        });

    }

    createComment(postId){

        let pSelf = this;
        this.commentForm.submit(function(e){
            e.preventDefault();
            let self = this; 

            $.ajax({

                type: 'POST',
                url: '/comments/create',
                data: $(self).serialize(),
                success: function(data){
                    // console.log(data);
                    let newComment = pSelf.newCommentDom(data.data.comment);
                    $(`#post-comments-${postId}`).prepend(newComment);
                    pSelf.deleteComment($(' #delete-comment',newComment));
                    new ToggleLike($(' .toggle-like-btn', newComment));
                    notyNotification('Comment added','success');
                },error: function(error){
                    notyNotification(error,'error');
                }
            });
        });
    }

    newCommentDom(comment){

        return $(`<div id="each-comment-${comment._id}" class="each-comment">
                    <div id="info">
                        <i class="fas fa-user"></i>
                
                        <div id="comment-info">
                            <span id="commented-by">${ comment.user.name}</span>
                            <span id="commented-at">On ${ comment.createdAt.toString().substring(0,15)}</span>
                        </div>
                
                        <a href="/comments/delete/${ comment._id}" id="delete-comment">delete</a>
                
                    </div>
                    <div id="content">
                        ${ comment.content }
                    </div>

                    <div id="likes">
                        <a class="toggle-like-btn" data-likes="0" href="/likes/toggle/?id=${ comment._id}&type=Comment">
                            <i class="fas fa-thumbs-up"></i>
                            <span>0 Likes</span>
                        </a>
                        
                    </div>

                </div>`);

    }

    deleteComment(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();

            $.ajax({

                type: 'GET',
                url: $(deleteLink).prop('href'),
                success: function(data){
                    //console.log(data);
                    $(`#each-comment-${data.data.comment_id}`).remove();
                    notyNotification('Comment deleted','success');
                },error: function(error){
                    notyNotification(error,'error');
                }
            });
        });
    }
}    


let notyNotification = function(nText,nType){

    new Noty({
        theme: 'relax',
        text: nText,
        type: nType,
        layout: "topRight",
        timeout: 1500
    }).show();
}