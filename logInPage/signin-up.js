// import { default: axios }  from "axios"
Backend_URI = 'https://craft-space-08b2210b921c.herokuapp.com'

function authorize(){
    
    const inputName = document.querySelector('.username')
    const inputPswd = document.querySelector('.password')
    const signIn = document.querySelector('.sign-in')
    const signUp = document.querySelector('.sign-up')
    const form = document.querySelector('.form')
    

    signIn.addEventListener('click', async () => {
        const logInfo = {
            username: inputName.value,
            pswd: inputPswd.value 
        }

        try{
            const logIn = await axios.post(`${Backend_URI}/login`, logInfo)
            if (!logIn){

                window.location.href = 'signup.html'
            }

            else if (logIn.data.token){
                form.style.display = 'none'
                console.log(logIn.data.token)
                

                // find this logged in user


                const users = await axios.get(`${Backend_URI}/user`,{
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
            

   
            }
            

        }
        catch(error){
            console.log(`log in error:${error}`)
            window.location.href = 'signup.html'
        }

        


    })

    signUp.addEventListener('click', ()=> {
        window.location.href = './signup.html'
    })

}



authorize()

 