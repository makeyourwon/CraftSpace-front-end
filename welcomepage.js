
const Backend_URI = 'https://craft-space-08b2210b921c.herokuapp.com'

async function latest5Post() {
    const posts = await axios.get(`${Backend_URI}/post`)
    // console.log(posts.data)
    const latestPost = posts.data.postList
    // console.log(latestPost)

    latestPost.forEach(post => {
        const main = document.querySelector('main')
        const postSection = document.createElement('div')
        const eachPost = document.createElement('div')
        const Title = document.createElement('h3')
        const Content = document.createElement('p')

        postSection.className = 'post-section'
        eachPost.className = 'each-post'
        Title.className = 'each-title'
        Content.className = 'each-content'

        Title.textContent = post.postTitle
        Content.textContent = post.postContent

        eachPost.appendChild(Title)
        eachPost.appendChild(Content)

         //add images
         if (post.images.length > 0) {
            post.images.forEach(imageUrl => {
                if (imageUrl !== ''){
                    const img = document.createElement('img')
                    img.className = 'img'
                    img.src = imageUrl; // Set the src of img element to the image URL
                    img.alt = "User Post Image"; // Set the alt text for the image
                    img.style.maxWidth = '100%'; // Optional: Ensure the image isn't too large
                    eachPost.appendChild(img); // Append the image to the post container
                }

            });
        }

        postSection.prepend(eachPost)
        main.appendChild(postSection)

    })
}


 function redirect(req, res){
    const signIn = document.querySelector('#status')
    
    signIn.addEventListener('click', async ()=>{
        window.location.href = '../logInPage/login.html'
        
    })
}

document.addEventListener('DOMContentLoaded', redirect)
latest5Post()
redirect()



 