function toggleMenu() {
    const navMenu = document.querySelector('.navMenu');
    navMenu.classList.toggle('hidden');
    navMenu.classList.toggle('show');
}

async function singlePost() {
    const token = localStorage.getItem('token')
    // console.log(token)

    //get logged in user info
    const main = document.querySelector('main')
    const userInfo = document.querySelector('.user')
    const userStatus = document.querySelector('.log-out')
    const userStored = JSON.parse(localStorage.getItem('userInfo'))
    userInfo.textContent = userStored.username
    userStatus.textContent = 'Log out'
    const thisUserId = userStored._id

    //Get the clicked post info from local storage
    const clickedpostInfo = JSON.parse(localStorage.getItem('postInfo'))
    // console.log(clickedpostInfo.postId)

    // Use the info got from the local storage to retrieve the post details
    const clickedPost =  await axios.get(`http://localhost:3000/user/post/${clickedpostInfo.postId}`,{
        headers:{
            'Authorization': `Bearer ${token}`
        }
    })
    const thisPost = clickedPost.data.postList
    // console.log(thisPost)

    //Build the post structure.
    const postContainer = document.createElement('div')
    const postOriginal = document.createElement('div')
    const title = document.createElement('h2')
    const content = document.createElement('p')

    const imgContainer = document.createElement('div')
    const img = document.createElement('img')



    imgContainer.className = 'img-container'
    img.className = 'img'

    const likeDiv = document.createElement('div')
    const likeCount = document.createElement('p')
    const likeBtn = document.createElement('div')

    const commentDiv = document.createElement('div')
    const commentCount = document.createElement('p')
    const commentBtn = document.createElement('div')

    
    const iconBar = document.createElement('div')
    
    // Set attributes to each section
    postContainer.className = 'post-container'
    postOriginal.className = 'original-container'
    title.className = 'title'
    content.className = 'content'

    likeBtn.classList.add('like','icon','regular') 
    likeBtn.classList.add('like','icon','solid')
    likeDiv.classList.add('like-dive', 'icon','icon-div') 
    likeCount.classList.add('like-count', 'icon') 

    commentDiv.classList.add('comment-div', 'icon', 'icon-div') 
    commentCount.classList.add('comment-count', 'icon') 
    commentBtn.classList.add('comment', 'icon') 

    iconBar.className = 'icon-bar'


    likeBtn.innerHTML = '<i class="fa-regular fa-heart"></i>'
    likeBtn.style.color = 'black'
    


    commentBtn.innerHTML =  '<i class="fa-regular fa-comment"></i>'


    //add post values
    title.textContent = thisPost.postTitle
    content.textContent = thisPost.postContent

    //style icon bar
    likeBtn.style.display = 'flex'

    commentBtn.style.display = 'flex'
    likeCount.style.display = 'flex'
    commentCount.style.display = 'flex'
    likeDiv.style.display = 'flex'
    commentDiv.style.display = 'flex'

    likeBtn.style.alignItems = 'center'

    commentBtn.style.alignItems = 'center'
    likeCount.style.alignItems = 'center'
    commentCount.style.alignItems = 'center'

    likeDiv.style.margin = '8px'
    commentDiv.style.margin = '8px'

    likeCount.textContent = thisPost.likes.length
    commentCount.textContent = thisPost.commentId.length
    
    iconBar.style.display = 'flex'
    
    // Append new sections to postdiv
    postOriginal.appendChild(title)
    postOriginal.appendChild(content)
    postOriginal.appendChild(imgContainer)
    

    likeDiv.appendChild(likeBtn)
    likeDiv.appendChild(likeCount)
    iconBar.appendChild(likeDiv)

    commentDiv.appendChild(commentBtn)
    commentDiv.appendChild(commentCount)
    iconBar.appendChild(commentDiv)



    //add images
    if (thisPost.images.length > 0) {
        thisPost.images.forEach(imageUrl => {
            if (imageUrl !==''){
                const img = document.createElement('img')
                img.className = 'img'
                img.src = imageUrl; // Set the src of img element to the image URL
                img.alt = "User Post Image"; // Set the alt text for the image
                img.style.maxWidth = '100%'; // Optional: Ensure the image isn't too large
                imgContainer.appendChild(img)
                ; // Append the image to the post container
            }
            // console.log(img)
        });
    }

    postOriginal.appendChild(iconBar)
    postContainer.appendChild(postOriginal)
    
    
    main.prepend(postContainer)

    const newLikes = {likes: userInfo.textContent}
    // console.log(newLikes)
    
    

    //add likeBtn listener
    if( thisPost.likes.includes(userStored.username)){
        //set the like button style.
        likeBtn.innerHTML = '<i class="fa-solid fa-heart"></i>'
        likeBtn.style.color = 'red'
    }else if ( !thisPost.likes.includes(userStored.username)){
        likeBtn.innerHTML = '<i class="fa-regular fa-heart"></i>'
        likeBtn.style.color = 'black'
    }


    likeBtn.addEventListener('click', async ()=> {
        if( thisPost.likes.includes(userStored.username)){

            const removeUser = await axios.put(`http://localhost:3000/user/post/${thisPost._id}`, {$pull: newLikes},{
                    headers: {
                    'Authorization': `Bearer ${token}` // token received from the login route
                }} )
            // console.log(likeBtn)    
            likeCount.textContent = removeUser.data.postUpdated.likes.length
            likeBtn.innerHTML = '<i class="fa-regular fa-heart"></i>'
            likeBtn.style.color = 'black'

            thisPost.likes = removeUser.data.postUpdated.likes
            // console.log(thisPost.likes)
                    
        }else if(!thisPost.likes.includes(userStored.username)){

            const addUser = await axios.put(`http://localhost:3000/user/post/${thisPost._id}`, {$addToSet: newLikes},{
                    headers: {
                    'Authorization': `Bearer ${token}` // token received from the login route
                }} )

                likeCount.textContent = addUser.data.postUpdated.likes.length
                likeBtn.innerHTML = '<i class="fa-solid fa-heart"></i>'
                likeBtn.style.color = 'red'
                thisPost.likes = addUser.data.postUpdated.likes
                // console.log(thisPost.likes)
        }

    })



    // Add comment function
    commentBtn.addEventListener('click', () =>{
        // add comment section
        const commentContainer = document.createElement('div')
        const commentText = document.createElement('input')
        const sendBtn = document.createElement('button')
        const cancelBtn = document.createElement('button')

        commentContainer.classList.add('comment-content')
        commentText.classList.add('comment-text')
        sendBtn.classList.add('send')
        cancelBtn.classList.add('cancel')

        sendBtn.textContent = 'Send'
        cancelBtn.textContent = 'Cancel'
    
        iconBar.style.display = 'none'
        commentContainer.style.display = 'inline'

        commentContainer.appendChild(commentText)
        commentContainer.appendChild(sendBtn)
        commentContainer.appendChild(cancelBtn)
        postContainer.appendChild(commentContainer)

        // Retrieve value
        const newComment = {
            comment: '',
            username: userStored.username
        }
        // console.log(commentText.value)
        
        //save comment to database
        sendBtn.addEventListener('click', async ()=> {
            if (commentText.value !== ''){
                newComment.comment = commentText.value
                console.log(newComment)
                try{
                    const updateComment = await axios.post('http://localhost:3000/post/comment', newComment,{
                        headers: {
                            'Authorization': `Bearer ${token}` // token received from the login route
                        } 
                    })
                    //get commentId and store it to post schema
                    const commentId = updateComment.data.newComment[0]._id
                    console.log(commentId)
                    
                    // console.log(commentId)
                    const updateCommentId = await axios.put(`http://localhost:3000/user/post/${thisPost._id}`, {$push: {commentId:commentId}},{
                        headers: {
                        'Authorization': `Bearer ${token}` // token received from the login route
                        
                    }})
                    // console.log(updateCommentId)
                    //update comment quantity to front end
                    console.log(thisPost.commentId)
                    commentCount.textContent = updateCommentId.data.postUpdated.commentId.length
                    iconBar.style.display = 'flex'
                    commentContainer.style.display = 'none'
                    location.reload()


                }catch(error){
                    console.log( 'input invalid', `${error}`)
                }
            }
        

        
        })

        cancelBtn.addEventListener('click', () => {
            
            try{commentContainer.style.display = 'none'
                iconBar.style.display = 'flex'
            }catch(error){
                console.log('cancel button error', `${error}`)
            }
            
            
        })
    })

    // Retrieve all the comments belong to this post and diplay in ascending order
    const allComments = await axios.get(`http://localhost:3000/post/comment`,{
        headers: {
        'Authorization': `Bearer ${token}` // token received from the login route
        
    }})
    const comments = allComments.data.commentList
    // console.log(comments)
    // console.log(thisPost.commentId)

    //make the commentsBox a big container
    const commentsBox = document.createElement('div')
    commentsBox.className = 'comments-box'

    const commentArray = thisPost.commentId
    commentArray.forEach(comment => {
        for (let index in comments) {
            if (comments[index]._id === comment){
                // console.log(comments[index]._id)
                // console.log(comment)

                // Add comments detail box and enable the user to delete the comment if 
                // the comment belongs to the user logged in.


                const eachComment = document.createElement('div')
                eachComment.className = 'each-comment'

                const commentuser = document.createElement('div')
                commentuser.className = 'comment-user'

                const commentBox = document.createElement('div')
                commentBox.className = 'comment-box'

                const commentContent = document.createElement('p')
                commentContent.className = 'comment-content'

                const deleteBtn = document.createElement('button')
                deleteBtn.className = 'delete'
                deleteBtn.textContent = 'Delete'

                commentContent.textContent = comments[index].comment
                commentuser.textContent = comments[index].username

                //add new section to <main>
                commentBox.appendChild(commentContent)
                commentBox.appendChild(deleteBtn)
                if (userStored.userId === thisPost.userId){
                    commentBox.appendChild(deleteBtn)
                    deleteBtn.style.display = 'flex'
            
                }
                else if (commentuser.textContent === userStored.username){
                    commentBox.appendChild(deleteBtn)
                    deleteBtn.style.display = 'flex'
                }else{
                    deleteBtn.style.display = 'none'
                }

                eachComment.appendChild(commentuser)
                eachComment.appendChild(commentBox)

                commentsBox.appendChild(eachComment)
                main.appendChild(commentsBox)



                deleteBtn.addEventListener('click', async (e) => {
                    const clickedDeleteBtn = e.currentTarget
                    const clickedCommentBox = clickedDeleteBtn.parentNode.parentNode
                    console.log(clickedCommentBox)
                    // Get this comment as the id and delete it.
                    const deleteComment = await axios.delete(`http://localhost:3000/post/comment/${comment}`,{
                        headers: {
                        'Authorization': `Bearer ${token}` // token received from the login route
                        
                    }})
                    console.log(deleteComment.data)
                    clickedCommentBox.remove()
                    
                    const commentToDelete = {
                        commentId:comment
                    }
                    console.log(commentToDelete)
                    const deleteInPost = await axios.put(`http://localhost:3000/user/post/${clickedpostInfo.postId}`, { $pull: commentToDelete}, {
                        headers: {
                        'Authorization': `Bearer ${token}` // token received from the login route
                        
                    }})
                    location.reload()
                    console.log(deleteInPost.data)
                })

            }


            }
        
    })












    //log out function
    userStatus.addEventListener('click', () => {
        localStorage.removeItem('token')
        localStorage.removeItem('userInfo')
        localStorage.removeItem('selectUser')
        localStorage.removeItem('postInfo')
        window.location.href='../index.html'
    })

    //Go to user profile
    userInfo.addEventListener('click', () => {
        // When setting the user information;
        // localStorage.setItem('userInfo', userInfo.textContent)
        window.location.href = '../userprofile/profile.html'
    })


}

singlePost()