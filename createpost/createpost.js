function toggleMenu() {
    const navMenu = document.querySelector('.navMenu');
    navMenu.classList.toggle('hidden');
    navMenu.classList.toggle('show');
}

async function createPost(){
    // Get all the sections needed from header 
    const main = document.querySelector('main')
    const userInfo = document.querySelector('.user')
    const userStatus = document.querySelector('.log-out')
    const userStored = JSON.parse(localStorage.getItem('userInfo'))
    const token = localStorage.getItem('token')
    userInfo.textContent = userStored.username
    const thisUserId = userStored._id

    //


}

createPost()