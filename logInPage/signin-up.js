// import { default: axios }  from "axios"

function authorize(){
    const inputName = document.querySelector('.username')
    const inputPswd = document.querySelector('.password')
    const signIn = document.querySelector('.sign-in')
    

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
                console.log(logIn.data.token)
                localStorage.setItem("token", logIn.data.token)
                
                axios.get('http://localhost:3000/login',{
                    headers: {
                        'Authorization': `Bearer ${logIn.data.token}` // token received from the login route
                    }
                })
                // window.location.href = '../userpostpage/userpost.html'
                const main = document.querySelector('main')
                main.style.display = 'none'
                const status = document.querySelector("#status")
                const userInfo = document.createElement('div')
                const userStatus = document.createElement('div')

                userInfo.className = 'user'
                userStatus.className = 'user-status'

                userInfo.textContent = `${inputName.value}`
                userStatus.textContent = 'Log out'

                userInfo.style.display = 'flex'
                userStatus.style.display = 'flex'

                userInfo.style.justifyContent = 'center'
                userStatus.style.justifyContent = 'center'


                status.appendChild(userInfo)
                status.appendChild(userStatus)

                const posts = await axios.get('http://localhost:3000/user/post',{
                    headers: {
                        'Authorization': `Bearer ${logIn.data.token}` // token received from the login route
                    }
                })
                try{
                    // console.log(posts.data.postTitle)
                    const postList = posts.data.postList
                    console.log(postList)

                    postList.forEach(post => {
                        const postContainer = document.createElement('div')
                        const title = document.createElement('h2')
                        const content = document.createElement('p')

                        const likeDiv = document.createElement('div')
                        const likeCount = document.createElement('p')
                        const likeBtn = document.createElement('button')

                        const body = document.querySelector('body')
                        

                        postContainer.className = 'post-container'
                        title.className = 'title'
                        content.className = 'content'
                        likeBtn.className = 'like'
                        likeDiv.className = 'like-dive'
                        likeCount.className = 'like-count'

                        

                        likeBtn.innerHTML = '<i class="fa-regular fa-heart"></i>'
                        likeBtn.style.color = 'black'

                        title.textContent = post.postTitle
                        content.textContent = post.postContent

                        likeDiv.style.display = 'flex'

                        postContainer.appendChild(title)
                        postContainer.appendChild(content)

                        likeDiv.appendChild(likeBtn)
                        likeDiv.appendChild(likeCount)
                        postContainer.appendChild(likeDiv)

                        body.appendChild(postContainer)


                        const newLikes = {likes: userInfo.textContent}
                        // console.log(newLikes)
                        const id = post._id
                        likeCount.textContent = post.likes.length
                        const userContext = userInfo.textContent



                        if( post.likes.includes(userContext)){
                            // console.log(post.likes.includes(userInfo))

                            likeBtn.innerHTML = '<i class="fa-solid fa-heart"></i>'
                            likeBtn.style.color = 'red'
                        }
                        else{
                            likeBtn.innerHTML = '<i class="fa-regular fa-heart"></i>'
                                likeBtn.style.color = 'black'
                        }

                        likeBtn.addEventListener('click', async () => {
                            
                            //check if the user is in likes array.  If yes, change the color of heart and update post
                            //and then update the count quantity to the front end.
                            if (post.likes.includes(userContext)){
                                try{
                                    const removeUser = await axios.put(`http://localhost:3000/user/post/${id}`, {$pull: newLikes},{
                                    headers: {
                                    'Authorization': `Bearer ${logIn.data.token}` // token received from the login route
                                }} )
                                
                                    console.log("Success:", removeUser);
                                    likeBtn.innerHTML = '<i class="fa-regular fa-heart"></i>'
                                    likeBtn.style.color = 'black'
                                    
                                    likeCount.textContent = removeUser.data.postUpdated.likes.length

                                    
                                
                                }catch(error){
                                    console.error("Error updating likes:", `${error}`);
                                }
                            }else{
                                // if user is not in likes array, change the color of heart and update the post in back end;
                                // and update the like numbers to the front end.
                                try{
                                    console.log(newLikes)
                                    likeBtn.innerHTML = '<i class="fa-solid fa-heart"></i>'
                                    likeBtn.style.color = 'red'
                                    
                                    const addUser = await axios.put(`http://localhost:3000/user/post/${id}`, {$addToSet: newLikes},{
                                        headers: {
                                        'Authorization': `Bearer ${logIn.data.token}` // token received from the login route
                                        
                                    }})
                                    // console.log("Success:", addUser);
                                    //change the likes count
                                    likeCount.textContent = addUser.data.postUpdated.likes.length

                                    
                                    
                                }catch(error) {
                                    console.error("Error updating likes:", `${error}`);
                                }

                            }
                        })
 
                })
                }
                catch(error){
                    console.log(`post error: ${error}`)
                }

                

            }

        }
        catch(error){
            console.log(`log in error:${error}`)
            window.location.href = 'signup.html'
        }

    })
}



authorize()

 