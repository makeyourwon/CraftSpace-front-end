function toggleMenu() {
    const navMenu = document.querySelector('.navMenu');
    navMenu.classList.toggle('hidden');
    navMenu.classList.toggle('show');
}

async function userPostPage(){
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
    // console.log(thisUserId)
    

    const posts = await axios.get('http://localhost:3000/user/post',{
        headers: {
            'Authorization': `Bearer ${token}` // token received from the login route
        }
    })
    // console.log(posts)

    
    const postList = posts.data.postList
    const userContext = userStored.username
    // console.log(thisUser)


    
    const postUserId = [] // to check if current user is in the userId array of postList.
    postList.forEach(post => {
        if (post.userId === thisUserId){
            try{
            
                const postContainer = document.createElement('div')
                const postOriginal = document.createElement('div')
                const title = document.createElement('h2')
                const content = document.createElement('p')

                const imgContainer = document.createElement('div')
                const img = document.createElement('img')


                const editContainer = document.createElement('div')
                imgContainer.className = 'img-container'
                img.className = 'img'
        
                const likeDiv = document.createElement('div')
                const likeCount = document.createElement('p')
                const likeBtn = document.createElement('div')


                const editBtn = document.createElement('button')
                const deleteBtn = document.createElement('button')
        
                const commentDiv = document.createElement('div')
                const commentCount = document.createElement('p')
                const commentBtn = document.createElement('div')
                const main = document.querySelector('main')
                
                const iconBar = document.createElement('div')
                
                // Set attributes to each section
                postContainer.className = 'post-container'
                postContainer.setAttribute('id',post._id)
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
        
                editContainer.classList.add('edit-container')
                editBtn.classList.add('edit')
                deleteBtn.classList.add('delete')


                iconBar.className = 'icon-bar'
        
        
                likeBtn.innerHTML = '<i class="fa-regular fa-heart"></i>'
                likeBtn.style.color = 'black'
                

        
                commentBtn.innerHTML =  '<i class="fa-regular fa-comment"></i>'

                editBtn.textContent = 'Edit'
                deleteBtn.textContent = 'Delete'
                //add post values
                title.textContent = post.postTitle
                content.textContent = post.postContent
        
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
        
                likeCount.textContent = post.likes.length
                commentCount.textContent = post.commentId.length

                postUserId.push(post.userId)
                // console.log(postUserId)
                
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

                editContainer.appendChild(editBtn)
                editContainer.appendChild(deleteBtn)

                //add images
                if (post.images.length > 0) {
                    post.images.forEach(imageUrl => {
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
                postOriginal.appendChild(editContainer)
                postContainer.appendChild(postOriginal)
                
                
                main.prepend(postContainer)
        
                const newLikes = {likes: userInfo.textContent}
                // console.log(newLikes)
                const id = post._id
                
                
            
                //add likeBtn listener
                if( post.likes.includes(userContext)){
                    //set the like button style.
                    likeBtn.innerHTML = '<i class="fa-solid fa-heart"></i>'
                    likeBtn.style.color = 'red'
                }else if ( !post.likes.includes(userContext)){
                    likeBtn.innerHTML = '<i class="fa-regular fa-heart"></i>'
                    likeBtn.style.color = 'black'
                }


                likeBtn.addEventListener('click', async ()=> {
                    if( post.likes.includes(userContext)){

                        const removeUser = await axios.put(`http://localhost:3000/user/post/${id}`, {$pull: newLikes},{
                                headers: {
                                'Authorization': `Bearer ${token}` // token received from the login route
                            }} )
                        // console.log(likeBtn)    
                        likeCount.textContent = removeUser.data.postUpdated.likes.length
                        likeBtn.innerHTML = '<i class="fa-regular fa-heart"></i>'
                        likeBtn.style.color = 'black'

                        post.likes = removeUser.data.postUpdated.likes
                        // console.log(post.likes)
                                
                    }else if(!post.likes.includes(userContext)){

                        const addUser = await axios.put(`http://localhost:3000/user/post/${id}`, {$addToSet: newLikes},{
                                headers: {
                                'Authorization': `Bearer ${token}` // token received from the login route
                            }} )

                            likeCount.textContent = addUser.data.postUpdated.likes.length
                            likeBtn.innerHTML = '<i class="fa-solid fa-heart"></i>'
                            likeBtn.style.color = 'red'
                            post.likes = addUser.data.postUpdated.likes
                            // console.log(post.likes)
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
                        comment: ''
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
                                const updateCommentId = await axios.put(`http://localhost:3000/user/post/${post._id}`, {$push: {commentId:commentId}},{
                                    headers: {
                                    'Authorization': `Bearer ${token}` // token received from the login route
                                    
                                }})
                                // console.log(updateCommentId)
                                //update comment quantity to front end
                                commentCount.textContent = updateCommentId.data.postUpdated.commentId.length
                                iconBar.style.display = 'flex'
                                commentContainer.style.display = 'none'
            
            
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


                //editBtn action
                //hide post container and recreate a post container
                editBtn.addEventListener('click',  (e) => {

                    //get current post info
                    const clicked = e.currentTarget
                    const clickedPost = clicked.parentNode.parentNode

                    // console.log(clickedPost)

                    // structure the edit box
                    const editPostContainer = document.createElement('div')
                    const editImage = document.createElement('input')
                    const editTitle = document.createElement('input')
                    const editContent = document.createElement('textarea')
                    const saveBtn = document.createElement('button')
                    const editCancelBtn = document.createElement('button')

                    const clickedPostTitle = clickedPost.querySelector('.title')
                    const clickedPostContent = clickedPost.querySelector('.content')
                    const clickedPostImage = clickedPost.querySelectorAll('.img')


                    editTitle.className = "edit-title"
                    editContent.className = 'edit-content'
                    editImage.type = 'text'
                    editImage.className = 'img'
                    editImage.placeholder = "Separate link by ,"

                    editPostContainer.className = 'edit-post'
                    saveBtn.className = 'save'
                    editCancelBtn.className = 'edit-cancel'

                    saveBtn.textContent = 'Save'
                    editCancelBtn.textContent = 'Cancel'


                    editTitle.value = clickedPostTitle.textContent
                    editContent.value = clickedPostContent.textContent
                    
            
                    if (clickedPostImage){
                        
                        const imagesUrl = Array.from(clickedPostImage).map(img => img.src)
                        editImage.value = imagesUrl
                        // console.log(imagesUrl)
                        // console.log(joinImagesUrl)
                    }
                    
                    
                    

                    //add the title content and image choice to the edit container
                    editPostContainer.append(editTitle)
                    editPostContainer.append(editContent)
                    editPostContainer.append(editImage)
                    editPostContainer.append(saveBtn)
                    editPostContainer.append(editCancelBtn)

                    postContainer.appendChild(editPostContainer)


                    postOriginal.style.display = 'none'
                    editPostContainer.style.display = 'block'


                    saveBtn.addEventListener('click', async () => {
                        
                        //define the edited post to be saved to database
                        const editedPost = {
                            postTitle: editTitle.value,
                            postContent: editContent.value,
                            images: []

                        }
                        //Get the image array
                        const imageUrls = editImage.value.split(',').map(url => url.trim())
                        imageUrls.forEach(url => {
                            editedPost.images.push(url)
                        })


                        // console.log(editedPost)
                        // console.log(id)

                        const updateEditedPost = await axios.put(`http://localhost:3000/user/post/${id}`, editedPost, {
                            headers:{
                                'Authorization': `Bearer ${token}` // token received from the login route
                            }
                        })

                        // console.log(updateEditedPost)

                        // main.replaceChild(postContainer, editPostContainer)
                        editPostContainer.style.display = 'none'

                        const updatedPost = await axios.get(`http://localhost:3000/user/post/${id}`, {
                            headers:{
                                'Authorization': `Bearer ${token}` // token received from the login route
                            }
                        })
                        const updatedPostInfo = updatedPost.data.postList
                        // console.log(updatedPostInfo)
                        title.textContent = updatedPostInfo.postTitle
                        content.textContent = updatedPostInfo.postContent
                        const updatedImages = updatedPostInfo.images

                        //  console.log(updatedImages)

                        //remove all images in the image container first
                        while(imgContainer.firstChild){
                            imgContainer.removeChild(imgContainer.firstChild)
                        }
                        
                        //Then re-append images one by one
                        updatedImages.forEach(url => {
                            // console.log(url)
                            const img = document.createElement('img')
                            img.className = 'img'
                            img.src = url
                            img.alt = "User Post Image"
                            imgContainer.appendChild(img)
                            console.log(imgContainer)
                        })
                        postOriginal.style.display = 'block'

                    })


                    editCancelBtn.addEventListener('click', () => {

                        try{
                            editPostContainer.style.display = 'none'
                            postOriginal.style.display = 'block'

                        }catch(error){
                            console.log('edit cancel button error', `${error}`)
                        }
                        
                    
                    })

                })





                deleteBtn.addEventListener('click', async (e) =>{
                    const clickedBtn = e.currentTarget
                    const postDiv = clickedBtn.parentNode.parentNode.parentNode
                    const _id = postDiv.getAttribute('id')
                    const authorOfPost = post.userId

                    console.log(authorOfPost)
                    // console.log(_id)

                    const deletedPost = await axios.delete(`http://localhost:3000/user/post/${_id}`,{
                        headers:{
                            Authorization: `Bearer ${token}`
                        }
                    })
                    postDiv.remove()

                    //Remove all comments nested to the post.
                    const commentIdArray = deletedPost.data.postDeleted.commentId
                    // console.log(commentIdArray)
                    commentIdArray.forEach(async (id) => {
                        const deleteComment = await axios.delete(`http://localhost:3000/post/comment/${id}`,{
                            headers:{
                                Authorization: `Bearer ${token}`
                            }
                        })
                        // console.log(deleteComment)
                    })

                    const userUpdatePostId = await axios.put(`http://localhost:3000/user/${authorOfPost}`, { $pull: {postId:_id}}, {
                        headers:{
                            Authorization: `Bearer ${token}`
                        }
                    })

                    console.log(userUpdatePostId)
                        


                })

                

            }catch(error){
                    console.log(`insert post error : ${error}`)
            }
        }
    })
    if (!postUserId.includes(thisUserId)){

        main.textContent = `You don't have any post yet.....`
        main.style.color = 'lightgray'
        
    }



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

                    
    //Connect post button to createpost page
    const postButton = document.querySelector('.post-button')
    postButton.addEventListener('click', () => {
        window.location.href = '../createpost/createpost.html'
    })



}

userPostPage()
