function toggleMenu() {
    const navMenu = document.querySelector('.navMenu');
    navMenu.classList.toggle('hidden');
    navMenu.classList.toggle('show');
}

const Backend_URI = 'https://craft-space-08b2210b921c.herokuapp.com'

async function profile(){
    // Get all the sections needed
    const main = document.querySelector('main')
    const userInfo = document.querySelector('.user')
    const userStatus = document.querySelector('.log-out')
    const userStored = JSON.parse(localStorage.getItem('userInfo'))
    const token = localStorage.getItem('token')
    userInfo.textContent = userStored.username
    const thisUserId = userStored._id

    const usernameContent = document.querySelector('.username')
    const emailContent = document.querySelector('.email')

    //set values to the divs/sections

    const users = await axios.get(`${Backend_URI}/user`,{
        headers: {
            'Authorization': `Bearer ${token}` // token received from the login route
        }
    })

    const findUser = users.data.userList
    for (let i in findUser){
        if (findUser[i].username === userStored.username){
            usernameContent.textContent = findUser[i].username
            emailContent.textContent = findUser[i].email
        }
    }
 

        //log out function

        userStatus.addEventListener('click', () => {
            localStorage.removeItem('token')
            localStorage.removeItem('userInfo')
            localStorage.removeItem('selectUser')
            localStorage.removeItem('postInfo')
            window.location.href='../index.html'
        })

        //Connect post button to createpost page
        const postButton = document.querySelector('.post-button')
        postButton.addEventListener('click', () => {
            window.location.href = '../createpost/createpost.html'
        })
    }

profile()