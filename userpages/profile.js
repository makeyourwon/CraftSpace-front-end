
async function profile(){
    const token = localStorage.getItem('token')
    // console.log(token)
    const userInfo = document.querySelector('.user')
    
    const users = await axios.get('http://localhost:3000/user',{
        headers: {
            'Authorization': `Bearer ${token}` // token received from the login route
        }
    })

    
    //
    // console.log(users.data.userList)
    const posts = await axios.get('http://localhost:3000/user/post',{
        headers: {
            'Authorization': `Bearer ${token}` // token received from the login route
        }
    })
    // console.log(posts)
    userInfo.textContent = localStorage.getItem('userInfo')
    // console.log(userInfo.textContent)
    
    const postList = posts.data.postList
    const thisUser = users.data.userList
    const userContext = userInfo.textContent
    // console.log(thisUser)

    // const thisUserId = 
    
    // console.log(postList)
    const usersPost = []
    postList.forEach(post => {
        for (let i in thisUser){
            if ( post.userId == thisUser[i]._id ){
                usersPost.push(post)   
            }
        } 
    })

    console.log(usersPost)
    postList.forEach(post => {
        try{
            
        const postContainer = document.createElement('div')
        const title = document.createElement('h2')
        const content = document.createElement('p')

        const likeDiv = document.createElement('div')
        const likeCount = document.createElement('p')
        const likeBtn = document.createElement('div')

        const commentDiv = document.createElement('div')
        const commentCount = document.createElement('p')
        const commentBtn = document.createElement('div')
        const main = document.querySelector('main')

        const iconBar = document.createElement('div')
        
        // Set attributes to each section
        postContainer.className = 'post-container'
        title.className = 'title'
        content.className = 'content'
        likeBtn.classList.add('like','icon') 
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

        
        iconBar.style.display = 'flex'
        
        // Append new sections to postdiv
        postContainer.appendChild(title)
        postContainer.appendChild(content)

        likeDiv.appendChild(likeBtn)
        likeDiv.appendChild(likeCount)
        iconBar.appendChild(likeDiv)

        commentDiv.appendChild(commentBtn)
        commentDiv.appendChild(commentCount)
        iconBar.appendChild(commentDiv)
        postContainer.appendChild(iconBar)
        main.prepend(postContainer)

        const newLikes = {likes: userInfo.textContent}
        // console.log(newLikes)
        const id = post._id
        
        
        // console.log(userContext)

        //check if the user is in likes array to decide heart color.
        if( post.likes.includes(userContext)){
            //set the like button style.
            likeBtn.innerHTML = '<i class="fa-solid fa-heart"></i>'
            likeBtn.style.color = 'red'
            
            //add event listener
            likeBtn.addEventListener('click', async () => {
                try{
                    const removeUser = await axios.put(`http://localhost:3000/user/post/${id}`, {$pull: newLikes},{
                        headers: {
                        'Authorization': `Bearer ${token}` // token received from the login route
                    }} )
                
                    console.log("Success:", removeUser);
                    likeBtn.innerHTML = '<i class="fa-regular fa-heart"></i>'
                    likeBtn.style.color = 'black'
                    
                    likeCount.textContent = removeUser.data.postUpdated.likes.length

                }catch(error){
                    console.error("Error updating likes:", `${error}`)
                }
            })
        }
        if( !post.likes.includes(userContext)){
            likeBtn.innerHTML = '<i class="fa-regular fa-heart"></i>'
            likeBtn.style.color = 'black'

            likeBtn.addEventListener('click', async () => {
                try{
                    console.log(newLikes)
                    likeBtn.innerHTML = '<i class="fa-solid fa-heart"></i>'
                    likeBtn.style.color = 'red'
                    
                    const addUser = await axios.put(`http://localhost:3000/user/post/${id}`, {$addToSet: newLikes},{
                        headers: {
                        'Authorization': `Bearer ${token}` // token received from the login route
                        
                    }})
                    // console.log("Success:", addUser);
                    //change the likes count
                    likeCount.textContent = addUser.data.postUpdated.likes.length
                }catch(error){
                    console.error("Error updating likes:", `${error}`);
                }
            })

        }



        // likeBtn.addEventListener('click', async () => {
            
        //     //check if the user is in likes array.  If yes, change the color of heart and update post
        //     //and then update the count quantity to the front end.
        //     if (post.likes.includes(userContext)){
        //         try{
        //             const removeUser = await axios.put(`http://localhost:3000/user/post/${id}`, {$pull: newLikes},{
        //                 headers: {
        //                 'Authorization': `Bearer ${token}` // token received from the login route
        //             }} )
                
        //             console.log("Success:", removeUser);
        //             likeBtn.innerHTML = '<i class="fa-regular fa-heart"></i>'
        //             likeBtn.style.color = 'black'
                    
        //             likeCount.textContent = removeUser.data.postUpdated.likes.length

                    
                
        //         }catch(error){
        //             console.error("Error updating likes:", `${error}`);
        //         }
        //     }else{
        //         // if user is not in likes array, change the color of heart and update the post in back end;
        //         // and update the like numbers to the front end.
        //         try{
        //             console.log(newLikes)
        //             likeBtn.innerHTML = '<i class="fa-solid fa-heart"></i>'
        //             likeBtn.style.color = 'red'
                    
        //             const addUser = await axios.put(`http://localhost:3000/user/post/${id}`, {$addToSet: newLikes},{
        //                 headers: {
        //                 'Authorization': `Bearer ${token}` // token received from the login route
                        
        //             }})
        //             // console.log("Success:", addUser);
        //             //change the likes count
        //             likeCount.textContent = addUser.data.postUpdated.likes.length

                    
                    
        //         }catch(error) {
        //             console.error("Error updating likes:", `${error}`);
        //         }

        //     }
        // })

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
            comment: commentText.value
        }
        
        //save comment to database
        sendBtn.addEventListener('click', async ()=> {
            if (commentText.value !== ''){
                try{
                    const updateComment = await axios.post('http://localhost:3000/post/comment', { $push: newComment},{
                        headers: {
                            'Authorization': `Bearer ${token}` // token received from the login route
                        } 
                    })
                    //get commentId and store it to post schema
                    const commentId = updateComment.data.newComment[0]._id
                    console.log(commentId)
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
        }catch(error){
            console.log(`insert post error : ${error}`)
        }
    })
        

                    




}

profile()