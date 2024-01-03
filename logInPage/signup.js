function SignUp(){
    
    // const form = document.querySelector('form')
    // const username = form.elements['username']
    // const email = form.elements['email']
    // const pswd = form.elements['pswd']
    const username = document.querySelector('.username')
    const email = document.querySelector('.email')
    const pswd = document.querySelector('.pswd')
    const signUpBtn = document.querySelector('.sign-up')
    console.log(signUpBtn)

    signUpBtn.addEventListener('click', async (e) => {

        try{
            console.log(signUpBtn)
            // e.preventDefault()
            const newUser = {
                username:username.value,
                email: email.value,
                pswd: pswd.value
            }
            console.log(newUser)
            const update = await axios.post('http://localhost:3000/signup', newUser)
            window.location.href = 'login.html'
        }
        catch(error){
            console.log('Sign up error:', error)
        }
        

        
    })
}
SignUp()