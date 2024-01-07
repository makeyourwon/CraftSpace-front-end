//check status
// Get all the sections needed from header 
const token = localStorage.getItem('token')
const userStored = JSON.parse(localStorage.getItem('userInfo'))
const body = document.querySelector('body')

const main = document.querySelector('main')
const userInfo = document.querySelector('.user')
const userStatus = document.querySelector('.log-out')




if (!token){
    body.style.display = 'none'
    
}else{
    //show body and header
    body.style.display = 'block'
    userInfo.textContent = userStored.username

        // Define the header
    function toggleMenu() {
        const navMenu = document.querySelector('.navMenu');
        navMenu.classList.toggle('hidden');
        navMenu.classList.toggle('show');
    }


    //
    document.getElementById('postForm').addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Create FormData to send the file and text
        let formData = {
            postTitle:'',
            postContent:'',
            userId: userStored._id,
            images:[]
        };
        
        // formData.append('postTitle', document.getElementById('postTitle').value);
        // formData.append('postContent', document.getElementById('postText').value)
        formData.postTitle = document.getElementById('postTitle').value
        formData.postContent = document.getElementById('postText').value

        const imageUrlInput = document.getElementById('imageUrl').value;
        // Assuming URLs are comma-separated, split the string into an array
        const imageUrls = imageUrlInput.split(',').map(url => url.trim()); // Split and trim each URL
        // console.log(imageUrls)

        // Append each URL to the formData
        imageUrls.forEach((image) => {
            formData.images.push(image);
        });
        

        // Append images if there are any - local upload. need redefine
        const images = document.getElementById('imageUpload').files;
        // console.log(images)
        for (let i = 0; i < images.length; i++) {
            // formData.append('images', images[i]);
            formData.images.push(images[i])
        }
        console.log(formData)
        // Call function to handle the post request
        const onePost = await createPost(formData);

        window.location.href = '../userpages/userpostpage.html'


        // // console.log(onePost)

        // const form = document.querySelector('#postForm')
        // form.style.display = 'none'

        // //display the post created just now.
        // const postContainer = document.createElement('div')
        // const title = document.createElement('h2')
        // const content = document.createElement('p')
        // const editContainer = document.createElement('div')

        // const likeDiv = document.createElement('div')
        // const likeCount = document.createElement('p')
        // const likeBtn = document.createElement('div')

        // const editBtn = document.createElement('button')
        // const deleteBtn = document.createElement('button')

        // const commentDiv = document.createElement('div')
        // const commentCount = document.createElement('p')
        // const commentBtn = document.createElement('div')
        // const main = document.querySelector('main')
        
        // const iconBar = document.createElement('div')
        
        // // Set attributes to each section
        // postContainer.className = 'post-container'
        // title.className = 'title'
        // content.className = 'content'
        // likeBtn.classList.add('like','icon') 
        // likeDiv.classList.add('like-dive', 'icon','icon-div') 
        // likeCount.classList.add('like-count', 'icon') 

        // commentDiv.classList.add('comment-div', 'icon', 'icon-div') 
        // commentCount.classList.add('comment-count', 'icon') 
        // commentBtn.classList.add('comment', 'icon') 

        // editContainer.classList.add('edit-container')
        // editBtn.classList.add('edit')
        // deleteBtn.classList.add('delete')


        // iconBar.className = 'icon-bar'


        // likeBtn.innerHTML = '<i class="fa-regular fa-heart"></i>'
        // likeBtn.style.color = 'black'

        // commentBtn.innerHTML =  '<i class="fa-regular fa-comment"></i>'

        // editBtn.textContent = 'Edit'
        // deleteBtn.textContent = 'Delete'
        // //add post values
        // title.textContent = onePost.postTitle
        // content.textContent = onePost.postContent

        // //style icon bar
        // likeBtn.style.display = 'flex'
        // commentBtn.style.display = 'flex'
        // likeCount.style.display = 'flex'
        // commentCount.style.display = 'flex'
        // likeDiv.style.display = 'flex'
        // commentDiv.style.display = 'flex'

        // likeBtn.style.alignItems = 'center'
        // commentBtn.style.alignItems = 'center'
        // likeCount.style.alignItems = 'center'
        // commentCount.style.alignItems = 'center'

        // likeDiv.style.margin = '8px'
        // commentDiv.style.margin = '8px'

        // likeCount.textContent = onePost.likes.length
        // commentCount.textContent = onePost.commentId.length


        // iconBar.style.display = 'flex'
        
        // // Append new sections to postdiv
        // postContainer.appendChild(title)
        // postContainer.appendChild(content)

        // likeDiv.appendChild(likeBtn)
        // likeDiv.appendChild(likeCount)
        // iconBar.appendChild(likeDiv)

        // commentDiv.appendChild(commentBtn)
        // commentDiv.appendChild(commentCount)
        // iconBar.appendChild(commentDiv)

        // // editContainer.appendChild(editBtn)
        // // editContainer.appendChild(deleteBtn)

        // //add images
        // if (onePost.images.length > 0) {
        //     onePost.images.forEach(imageUrl => {
        //         if (imageUrl !== ''){
        //             const img = document.createElement('img');
        //             img.src = imageUrl; // Set the src of img element to the image URL
        //             img.alt = "User Post Image"; // Set the alt text for the image
        //             img.style.maxWidth = '100%'; // Optional: Ensure the image isn't too large
        //             postContainer.appendChild(img); // Append the image to the post container
        //         }

        //     });
        // }

        // // postContainer.appendChild(iconBar)
        // // postContainer.appendChild(editContainer)
        // main.prepend(postContainer)

        // const newLikes = {likes: userInfo.textContent}
        // console.log(newLikes)
        // const id = onePost._id


        //add comment btn
        // commentBtn.addEventListener('click', () =>{
        //     // add comment section
        //     const commentContainer = document.createElement('div')
        //     const commentText = document.createElement('input')
        //     const sendBtn = document.createElement('button')
        //     const cancelBtn = document.createElement('button')
    
        //     commentContainer.classList.add('comment-content')
        //     commentText.classList.add('comment-text')
        //     sendBtn.classList.add('send')
        //     cancelBtn.classList.add('cancel')
    
        //     sendBtn.textContent = 'Send'
        //     cancelBtn.textContent = 'Cancel'
        
        //     iconBar.style.display = 'none'
        //     commentContainer.style.display = 'inline'
    
        //     commentContainer.appendChild(commentText)
        //     commentContainer.appendChild(sendBtn)
        //     commentContainer.appendChild(cancelBtn)
        //     postContainer.appendChild(commentContainer)
    
        //     // Retrieve value
        //     const newComment = {
        //         comment: commentText.value
        //     }
            
        //     //save comment to database
        //     sendBtn.addEventListener('click', async ()=> {
        //         if (commentText.value !== ''){
        //             try{
        //                 const updateComment = await axios.post('http://localhost:3000/post/comment', { $push: newComment},{
        //                     headers: {
        //                         'Authorization': `Bearer ${token}` // token received from the login route
        //                     } 
        //                 })
        //                 //get commentId and store it to post schema
        //                 const commentId = updateComment.data.newComment[0]._id
        //                 console.log(commentId)
        //                 const updateCommentId = await axios.put(`http://localhost:3000/user/post/${post._id}`, {$push: {commentId:commentId}},{
        //                     headers: {
        //                     'Authorization': `Bearer ${token}` // token received from the login route
                            
        //                 }})
        //                 // console.log(updateCommentId)
        //                 //update comment quantity to front end
        //                 commentCount.textContent = updateCommentId.data.postUpdated.commentId.length
        //                 iconBar.style.display = 'flex'
        //                 commentContainer.style.display = 'none'
    
    
        //             }catch(error){
        //                 console.log( 'input invalid', `${error}`)
        //             }
        //         }
            
    
            
        //     })
    
        //     cancelBtn.addEventListener('click', () => {
                
        //         try{commentContainer.style.display = 'none'
        //             iconBar.style.display = 'flex'
        //         }catch(error){
        //             console.log('cancel button error', `${error}`)
        //         }
                
                
        //     })
        // })


    });





    //log out function
    userStatus.addEventListener('click', () => {
        localStorage.removeItem('token')
        localStorage.removeItem('userInfo')
        localStorage.removeItem('selectUser')
        window.location.href='../index.html'
    })

    //Go to user profile
    userInfo.addEventListener('click', () => {
        // When setting the user information;
        // localStorage.setItem('userInfo', userInfo.textContent)
        window.location.href = '../userprofile/profile.html'
    })
    
}


async function createPost(formData){

    // console.log(formData)
    //save the post data to database
    try{
        const response = await axios.post('http://localhost:3000/user/post', formData, {
            headers: {
                'Authorization': `Bearer ${token}` // token received from the login route
            }  
        })   
        return response.data.newPost[0]
    }catch(error){
        console.log('store error', error)
    }


}
// createPost()