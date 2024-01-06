// import { default: axios }  from "axios"

function authorize(){
    
    const inputName = document.querySelector('.username')
    const inputPswd = document.querySelector('.password')
    const signIn = document.querySelector('.sign-in')
    const form = document.querySelector('.form')
    

    signIn.addEventListener('click', async () => {
        const logInfo = {
            username: inputName.value,
            pswd: inputPswd.value 
        }

        try{
            const logIn = await axios.post('http://localhost:3000/login', logInfo)
            if (!logIn){

                window.location.href = 'signup.html'
            }

            else if (logIn.data.token){
                form.style.display = 'none'
                console.log(logIn.data.token)
                

                // find this logged in user


                const users = await axios.get('http://localhost:3000/user',{
                    headers: {
                        'Authorization': `Bearer ${logIn.data.token}` // token received from the login route
                    }
                })
            
                const findUser = users.data.userList
                console.log(findUser)
                let thisUser = {
                    username:'',
                    _id:''
                }
                for (let i in findUser){
                    if (findUser[i].username === inputName.value){
                        
                        thisUser.username = findUser[i].username
                        thisUser._id = findUser[i]._id
                        
                    }
                }
                // console.log(thisUser)
                localStorage.setItem('userInfo', JSON.stringify(thisUser))



                // //
                
                // // console.log(logIn.data.token)
                localStorage.setItem("token", logIn.data.token)
                window.location.href = '../home/home.html'
            
                
                // const main = document.querySelector('main')
                // const status = document.querySelector("#status")
                // const userInfo = document.createElement('div')
                // const userStatus = document.createElement('div')

                // userInfo.className = 'user'
                // userStatus.className = 'user-status'

                // userInfo.textContent = `${inputName.value}`
                // userStatus.textContent = 'Log out'

                // userInfo.style.display = 'flex'
                // userStatus.style.display = 'flex'

                // userInfo.style.justifyContent = 'center'
                // userStatus.style.justifyContent = 'center'


                // status.appendChild(userInfo)
                // status.appendChild(userStatus)

                // const posts = await axios.get('http://localhost:3000/user/post',{
                //     headers: {
                //         'Authorization': `Bearer ${logIn.data.token}` // token received from the login route
                //     }
                // })
                // try{
                    
                //     const postList = posts.data.postList
                //     // console.log(postList)
                //     postList.forEach( async (post) => {

                //         try{
                //             const postContainer = document.createElement('div')
                //             const title = document.createElement('h2')
                //             const author = document.createElement('small')
                //             const content = document.createElement('p')

                //             const likeDiv = document.createElement('div')
                //             const likeCount = document.createElement('p')
                //             const likeBtn = document.createElement('div')

                //             const commentDiv = document.createElement('div')
                //             const commentCount = document.createElement('p')
                //             const commentBtn = document.createElement('div')
                //             const body = document.querySelector('body')

                //             const iconBar = document.createElement('div')
                            
                //             // Set value to each section
                //             postContainer.className = 'post-container'
                //             title.className = 'title'
                //             content.className = 'content'
                //             likeBtn.classList.add('like','icon') 
                //             likeDiv.classList.add('like-dive', 'icon','icon-div') 
                //             likeCount.classList.add('like-count', 'icon') 
                //             author.classList.add('author')

                //             commentDiv.classList.add('comment-div', 'icon', 'icon-div') 
                //             commentCount.classList.add('comment-count', 'icon') 
                //             commentBtn.classList.add('comment', 'icon') 

                //             iconBar.className = 'icon-bar'
                    
                //             likeBtn.innerHTML = '<i class="fa-regular fa-heart"></i>'
                //             likeBtn.style.color = 'black'

                //             commentBtn.innerHTML =  '<i class="fa-regular fa-comment"></i>'

                //             title.textContent = post.postTitle
                //             content.textContent = post.postContent

                //             // Get author info of each post
                //             // console.log(post.userId)
                //             const userData = await axios.get('http://localhost:3000/user',{
                //                 headers:{
                //                     'Authorization': `Bearer ${logIn.data.token}` // token received from the login route
                //                 }
                //             })
                //             console.log(userData)
                //             const users = userData.data.userList
                //             for (let i in users){
                //                 if (users[i]._id === post.userId){
                //                     console.log(users[i]._id, post.userId)
                //                     author.textContent = users[i].username

                //                 }
                //                 // else{
                //                 //     console.log(`author error`)
                //                 // }
                //             }

                //             likeCount.textContent = post.likes.length
                //             commentCount.textContent = post.commentId.length

                //             //style
                //             // const iconStyle = document.querySelectorAll('.icon')
                //             // console.log(iconStyle)
                //             // // console.log('length', iconStyle)
                //             // iconStyle.forEach(icon => {
                                
                //             //     icon.style.display = 'flex'
                //             //     icon.style.alignItems = 'center'
                //             //     // console.log(icon)
                //             // })
                //             // const iconDiv = document.querySelectorAll('.icon-div')
                //             // iconDiv.forEach( div => {
                //             //     console.log(div)
                //             //     div.style.margin = '5px'
                //             // })
                //             likeBtn.style.display = 'flex'
                //             commentBtn.style.display = 'flex'
                //             likeCount.style.display = 'flex'
                //             commentCount.style.display = 'flex'
                //             likeDiv.style.display = 'flex'
                //             commentDiv.style.display = 'flex'

                //             likeBtn.style.alignItems = 'center'
                //             commentBtn.style.alignItems = 'center'
                //             likeCount.style.alignItems = 'center'
                //             commentCount.style.alignItems = 'center'

                //             likeDiv.style.margin = '8px'
                //             commentDiv.style.margin = '8px'
                //             iconBar.style.display = 'flex'
                //             author.style.display = 'flex'
                //             author.style.justifyContent = 'flex-end'
                //             author.style.color =   'light gray'
                            

                            
                            
                            
                //             // Append new sections to postdiv
                //             postContainer.appendChild(title)
                //             // postContainer.appendChild(author)
                //             postContainer.appendChild(content)

                //             likeDiv.appendChild(likeBtn)
                //             likeDiv.appendChild(likeCount)
                //             iconBar.appendChild(likeDiv)

                //             commentDiv.appendChild(commentBtn)
                //             commentDiv.appendChild(commentCount)
                //             iconBar.appendChild(commentDiv)
                //             postContainer.appendChild(iconBar)
                //             main.prepend(postContainer)

                //             // like button functions
                //             const newLikes = {likes: userInfo.textContent}
                //             // console.log(newLikes)
                //             const id = post._id
                            
                //             const userContext = userInfo.textContent

                //             //check if the user is in likes array to decide heart color.
                //             if( post.likes.includes(userContext)){
                                

                //                 likeBtn.innerHTML = '<i class="fa-solid fa-heart"></i>'
                //                 likeBtn.style.color = 'red'
                //             }
                //             else{
                //                 likeBtn.innerHTML = '<i class="fa-regular fa-heart"></i>'
                //                     likeBtn.style.color = 'black'
                //             }
                             
                            
                //             likeBtn.addEventListener('click', async () => {
                                
                //                 //check if the user is in likes array.  If yes, change the color of heart and update post
                //                 //and then update the count quantity to the front end.
                //                 if (post.likes.includes(userContext)){
                                    
                //                     try{
                //                         const removeUser = await axios.put(`http://localhost:3000/user/post/${id}`, {$pull: newLikes},{
                //                             headers: {
                //                             'Authorization': `Bearer ${logIn.data.token}` // token received from the login route
                //                         }} )

                //                         console.log("Success:", removeUser);
                //                         likeBtn.innerHTML = '<i class="fa-regular fa-heart"></i>'
                //                         likeBtn.style.color = 'black'
                                        
                //                         likeCount.textContent = removeUser.data.postUpdated.likes.length
                                        
                                        
                                    
                //                     }catch(error){
                //                         console.error("Error updating likes:", `${error}`);
                //                     }
                //                 }else{
                                     
                //                     // if user is not in likes array, change the color of heart and update the post in back end;
                //                     // and update the like numbers to the front end.
                //                     try{
                //                         console.log(newLikes)
                //                         likeBtn.innerHTML = '<i class="fa-solid fa-heart"></i>'
                //                         likeBtn.style.color = 'red'
                                        
                //                         const addUser = await axios.put(`http://localhost:3000/user/post/${id}`, {$addToSet: newLikes},{
                //                             headers: {
                //                             'Authorization': `Bearer ${logIn.data.token}` // token received from the login route
                                            
                //                         }})
                //                         // console.log("Success:", addUser);
                //                         //change the likes count
                //                         likeCount.textContent = addUser.data.postUpdated.likes.length
                                        
                                        

                                        
                //                     }catch(error) {
                //                         console.error("Error updating likes:", `${error}`);
                //                     }

                //                 }
                                
                //             })

                //         // Add comment function

                //         commentBtn.addEventListener('click', () =>{
                //             // add comment section
                //             const commentContainer = document.createElement('div')
                //             const commentText = document.createElement('input')
                //             const sendBtn = document.createElement('button')
                //             const cancelBtn = document.createElement('button')

                //             commentContainer.classList.add('comment-content')
                //             commentText.classList.add('comment-text')
                //             sendBtn.classList.add('send')
                //             cancelBtn.classList.add('cancel')

                //             sendBtn.textContent = 'Send'
                //             cancelBtn.textContent = 'Cancel'
                        
                //             iconBar.style.display = 'none'
                //             commentContainer.style.display = 'inline'

                //             commentContainer.appendChild(commentText)
                //             commentContainer.appendChild(sendBtn)
                //             commentContainer.appendChild(cancelBtn)
                //             postContainer.appendChild(commentContainer)

                //             // Retrieve value
                //             const newComment = {
                //                 comment: commentText.value
                //             }
                            
                //             //save comment to database
                //             sendBtn.addEventListener('click', async ()=> {
                //                 if (commentText.value !== ''){
                //                     try{
                //                         const updateComment = await axios.post('http://localhost:3000/post/comment', { $push: newComment},{
                //                             headers: {
                //                                 'Authorization': `Bearer ${logIn.data.token}` // token received from the login route
                //                             } 
                //                         })
                //                         //get commentId and store it to post schema
                //                         const commentId = updateComment.data.newComment[0]._id
                //                         console.log(commentId)
                //                         const updateCommentId = await axios.put(`http://localhost:3000/user/post/${post._id}`, {$push: {commentId:commentId}},{
                //                             headers: {
                //                             'Authorization': `Bearer ${logIn.data.token}` // token received from the login route
                                            
                //                         }})
                //                         // console.log(updateCommentId)
                //                         //update comment quantity to front end
                //                         commentCount.textContent = updateCommentId.data.postUpdated.commentId.length
                //                         iconBar.style.display = 'flex'
                //                         commentContainer.style.display = 'none'


                //                     }catch(error){
                //                         console.log( 'input invalid', `${error}`)
                //                     }
                //                 }
                            

                            
                //             })

                //             cancelBtn.addEventListener('click', () => {
                                
                //                 try{commentContainer.style.display = 'none'
                //                     iconBar.style.display = 'flex'
                //                 }catch(error){
                //                     console.log('cancel button error', `${error}`)
                //                 }
                                
                                
                //             })
                //         })


                //         }
                //         catch(error){
                //             console.log('print each error', error)
                //         }
                        
                //         postList.sort((a, b) => new Date(b.createAt) - new Date(a.createAt))    
 
                // })
                // }
                // catch(error){
                //     console.log(`post error: ${error}`)
                // }

                // //Go to profile by clicking the username

                // userInfo.addEventListener('click', () => {
                //     // When setting the user information;
                //     // localStorage.setItem('userInfo', userInfo.textContent)
                //     window.location.href = '../userpages/userpostpage.html'
                // })

                // //log out function

                // userStatus.addEventListener('click', () => {
                //     localStorage.removeItem('token')
                //     localStorage.removeItem('userInfo')
                //     window.location.href='../landingPage/index.html'
                // })
            }

        }
        catch(error){
            console.log(`log in error:${error}`)
            window.location.href = 'signup.html'
        }

        


    })
}



authorize()

 