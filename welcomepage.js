// import { default: axios }  from "axios"
// Example frontend fetch call
fetch(`${Backend_URI}`)
  .then(response => response.json())
  .then(data => {
    // Do something with the data
    console.log(data);
  })
  .catch(error => {
    console.error('There was an error!', error);
  });



async function latest5Post() {
    const posts = await axios.get('http://localhost:3000/post')
    // console.log(posts.data)
    const latestPost = posts.data.postList
    console.log(latestPost)

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



 