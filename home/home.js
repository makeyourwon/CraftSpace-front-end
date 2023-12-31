



function toggleMenu() {
    const navMenu = document.querySelector('.navMenu');
    navMenu.classList.toggle('hidden');
    navMenu.classList.toggle('show');
}
const Backend_URI = 'https://craft-space-08b2210b921c.herokuapp.com'

async function home(){
    //find this logged in user
    const thisUser = JSON.parse(localStorage.getItem('userInfo'))
    const token = localStorage.getItem('token')
    // console.log(token)

    if (token){
    
    const main = document.querySelector('main')
    const status = document.querySelector("#status")
    const userInfo = document.createElement('div')
    const userStatus = document.createElement('div')

    userInfo.className = 'user'
    userStatus.className = 'user-status'

    userInfo.textContent = `${thisUser.username}`
    userStatus.textContent = 'Log out'

    userInfo.style.display = 'flex'
    userStatus.style.display = 'flex'

    userInfo.style.justifyContent = 'center'
    userStatus.style.justifyContent = 'center'


    status.appendChild(userInfo)
    status.appendChild(userStatus)

    const posts = await axios.get(`${Backend_URI}/user/post`,{
        headers: {
            'Authorization': `Bearer ${token}` // token received from the login route
        }
    })
    // console.log(posts)
    try{
        
        const postList = posts.data.postList
        // console.log(postList)
        postList.forEach( async (post) => {

            try{
                const postContainer = document.createElement('div')
                const title = document.createElement('h2')
                const author = document.createElement('small')
                const content = document.createElement('p')

                const imgContainer = document.createElement('img-container')
                imgContainer.className = 'img-container'


                const likeDiv = document.createElement('div')
                const likeCount = document.createElement('p')
                const likeBtn = document.createElement('div')

                const commentDiv = document.createElement('div')
                const commentCount = document.createElement('p')
                const commentBtn = document.createElement('div')
                const body = document.querySelector('body')

                const iconBar = document.createElement('div')
                
                // Set value to each section
                postContainer.className = 'post-container'
                title.className = 'title'
                content.className = 'content'

                likeBtn.classList.add('like','icon') 
                likeDiv.classList.add('like-dive', 'icon','icon-div') 
                likeCount.classList.add('like-count', 'icon') 
                author.classList.add('author')

                commentDiv.classList.add('comment-div', 'icon', 'icon-div') 
                commentCount.classList.add('comment-count', 'icon') 
                commentBtn.classList.add('comment', 'icon') 

                iconBar.className = 'icon-bar'
        
                likeBtn.innerHTML = '<i class="fa-regular fa-heart"></i>'
                likeBtn.style.color = 'black'

                commentBtn.innerHTML =  '<i class="fa-regular fa-comment"></i>'

                title.textContent = post.postTitle
                content.textContent = post.postContent

                // Get author info of each post
                // console.log(post.userId)
                const userData = await axios.get(`${Backend_URI}/user`,{
                    headers:{
                        'Authorization': `Bearer ${token}` // token received from the login route
                    }
                })
                // console.log(userData)
                const users = userData.data.userList
                for (let i in users){
                    if (users[i]._id === post.userId){
                        // console.log(users[i]._id, post.userId)
                        author.textContent = '@' + users[i].username

                    }
                    // else{
                    //     console.log(`author error`)
                    // }
                }

                likeCount.textContent = post.likes.length
                commentCount.textContent = post.commentId.length

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
                iconBar.style.display = 'flex'
                author.style.display = 'flex'
                author.style.justifyContent = 'flex-start'
                author.style.color =   'light gray'
                


                
                
                
                // Append new sections to postdiv
                postContainer.appendChild(title)
                postContainer.appendChild(author)
                postContainer.appendChild(content)
                postContainer.appendChild(imgContainer)

                likeDiv.appendChild(likeBtn)
                likeDiv.appendChild(likeCount)
                iconBar.appendChild(likeDiv)

                commentDiv.appendChild(commentBtn)
                commentDiv.appendChild(commentCount)
                iconBar.appendChild(commentDiv)

                //add images
                if (post.images.length > 0) {
                    post.images.forEach(imageUrl => {
                        if (imageUrl !== ''){
                            const img = document.createElement('img')
                            img.className = 'img'
                            img.src = imageUrl; // Set the src of img element to the image URL
                            img.alt = "User Post Image"; // Set the alt text for the image
                            img.style.maxWidth = '100%'; // Optional: Ensure the image isn't too large
                            imgContainer.appendChild(img); // Append the image to the post container
                        }

                    });
                }

                postContainer.appendChild(iconBar)
                main.prepend(postContainer)

                // like button functions
                const newLikes = {likes: userInfo.textContent}
                // console.log(newLikes)
                const id = post._id
                
                const userContext = userInfo.textContent

                // Add likeBtn listener
                //check if the user is in likes array to decide heart color.

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

                        const removeUser = await axios.put(`${Backend_URI}/user/post/${id}`, {$pull: newLikes},{
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

                        const addUser = await axios.put(`${Backend_URI}/user/post/${id}`, {$addToSet: newLikes},{
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
                        comment: '',
                        username: thisUser.username
                    }
                    // console.log(newComment)
                    
                    //save comment to database
                    sendBtn.addEventListener('click', async ()=> {
                        if (commentText.value !== ''){
                            newComment.comment = commentText.value
                            // console.log(newComment)
                            try{
                                const updateComment = await axios.post(`${Backend_URI}/post/comment`, newComment,{
                                    headers: {
                                        'Authorization': `Bearer ${token}` // token received from the login route
                                    } 
                                })
                                //get commentId and store it to post schema
                                const commentId = updateComment.data.newComment[0]._id
                                // console.log(commentId)
                                const updateCommentId = await axios.put(`${Backend_URI}/user/post/${post._id}`, {$push: {commentId:commentId}},{
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

                // Go to author's home page
                author.addEventListener('click', () => {
                    console.log(author)
                    const selectusername = author.textContent.replace('@','')
                    const selectUserId = post.userId
                    const selectUser = {
                        selectusername: selectusername,
                        selectUserId: selectUserId

                    }
                    // console.log(post._id)
                    
                    // console.log(selectUserId)
                    localStorage.setItem('selectUser', JSON.stringify(selectUser))
                    window.location.href = '../otheruserhomepage/otheruserhomepage.html'
                })


                //Go to each post's page.
                title.addEventListener('click', ()=>{
                    const postInfo = {
                        postId:post._id,
                        username: author.textContent.replace('@','')
                    }
                    localStorage.setItem('postInfo',JSON.stringify(postInfo))
                    window.location.href = '../singlepost/singlepost.html'
                })

            }
            catch(error){
                console.log('print each error', error)
            }
            
            postList.sort((a, b) => new Date(b.createAt) - new Date(a.createAt))    

    })

    }
    catch(error){
        console.log(`post error: ${error}`)
    }

    //Go to profile by clicking the username
    userInfo.addEventListener('click', () => {

        window.location.href = '../userprofile/profile.html'
    })

    //log out function
    userStatus.addEventListener('click', () => {
        localStorage.removeItem('token')
        localStorage.removeItem('userInfo')
        localStorage.removeItem('selectUser')
        localStorage.removeItem('postInfo')
        window.location.href='../index.html'
    })
    }

    //Connect post button to createpost page
    const postButton = document.querySelector('.post-button')
    postButton.addEventListener('click', () => {
        window.location.href = '../createpost/createpost.html'
    })
}

home()
