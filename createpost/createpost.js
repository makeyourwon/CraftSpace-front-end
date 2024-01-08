//check status
// Get all the sections needed from header 
const token = localStorage.getItem('token')
const userStored = JSON.parse(localStorage.getItem('userInfo'))
const body = document.querySelector('body')

const main = document.querySelector('main')
const userInfo = document.querySelector('.user')
const userStatus = document.querySelector('.log-out')

const Backend_URI = 'https://craft-space-08b2210b921c.herokuapp.com'


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



    });





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


async function createPost(formData){

    // console.log(formData)
    //save the post data to database
    try{
        const response = await axios.post(`${Backend_URI}/user/post`, formData, {
            headers: {
                'Authorization': `Bearer ${token}` // token received from the login route
            }  
        })   
        console.log(response.data.newPost)
        return response.data.newPost[0]
    }catch(error){
        console.log('store error', error)
    }


}
