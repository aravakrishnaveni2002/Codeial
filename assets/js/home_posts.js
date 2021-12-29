{

    //method to submit form data for new post using AJAX
    let createPost = function(){

        let postForm = $('#post-form');
        postForm.submit(function(e){
            e.preventDefault();

            $.ajax({
                
                type: 'post',
                url: '/posts/create',
                data: postForm.serialize(),
                success: function(data){
                    //console.log(data);
                    let newPost = newPostDom(data.data.post);
                    $('#users-posts').prepend(newPost);
                    deletePost($(' #delete-post',newPost));

                    new postComments(data.data.post._id);
                    notyNotification('Post Published','success');
                    
                },error: function(error){
                    notyNotification(error,'error');
                }
            });
        });
    }

    //method to show form data for new post using AJAX
    let newPostDom = function(post){

        return $(`<div id="each-post-${post._id}" class="each-post">
            
                    <div id="info">
                
                        <i class="fas fa-user"></i>
                        
                        <div id="post-info">
                            <span id="posted-by"> ${ post.user.name}</span>
                            <span id="posted-at">Posted on ${post.createdAt.toString().substring(0,15)}</span>
                        </div>
                
                        <a href="/posts/delete/${ post._id}" id="delete-post">delete-post</a>    
                
                    </div>
                
                    <div id="content">
                        <p>${ post.content }</p>
                    </div>
                
                    <span id="comm-heading">comments</span>
                
                    <section id="comments">
                    
                        
                        <form action="/comments/create" method="POST" class="comment-form" id="post-${post._id}-comment-form">
                            <textarea name="content" id="comment-content" cols="30" rows="2" placeholder="Type Here..."></textarea>
                            <input type="hidden" name="post_id" value="${ post._id}">
                            <button id="comment-btn">
                                comment
                            </button>
                        </form>
                       
                    
                        <div id="post-comments-${post._id}" class="post-comments">
                    
                                
                    
                        </div>
                    </section>
    
                </div>`);
    }

    //method to delete the post in DOM using AJAX
    let deletePost = function(deleteLink){

        $(deleteLink).click(function(e){
            e.preventDefault();

            $.ajax({

                type: 'GET',
                url: $(deleteLink).prop('href'),
                success: function(data){
                    
                    $(`#each-post-${data.data.post_id}`).remove();
                    notyNotification('Post and its related comments deleted','success');
                },error: function(error){
                    notyNotification(error,'error');
                }
            });
        });
    }

    //method to loop over all existing posts in DOM and call deletePost method on deleteLink of each post 
    let convertPostsToAjax = function(){

        $(`#users-posts>.each-post`).each(function(){
            let self = $(this);
            let deleteBtn = $(' #delete-post',self);
            deletePost(deleteBtn);

            let postId = self.prop('id').split('-')[2];
            new postComments(postId);
        });
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

    createPost();
    convertPostsToAjax();
}