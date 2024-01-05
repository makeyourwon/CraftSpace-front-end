function toggleMenu() {
    const navMenu = document.querySelector('.navMenu');
    navMenu.classList.toggle('hidden');
    navMenu.classList.toggle('show');
}


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

    const users = await axios.get('http://localhost:3000/user',{
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
            window.location.href='../landingPage/index.html'
        })
}

profile()