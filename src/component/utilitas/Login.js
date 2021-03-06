import React, { useContext, useState } from "react"
import {UserContext} from "./UserContext"
import axios from "axios"
import '../../style/utilitis.css'

const Login = () =>{
  const [, setUser] = useContext(UserContext)
  const [input, setInput] = useState({email: "" , password: ""})

  const handleSubmit = (event) =>{
    event.preventDefault()
    axios.post("https://backendexample.sanbersy.com/api/user-login", {
      email: input.email, 
      password: input.password
    }).then(
      (res)=>{
        var user = res.data.user
        var token = res.data.token
        var currentUser = {name: user.name, email: user.email, token }
        setUser(currentUser)
        localStorage.setItem("user", JSON.stringify(currentUser))
      }
    ).catch((err)=>{
      alert(JSON.stringify(err.response.data))
    })
  }

  const handleChange = (event) =>{
    let value = event.target.value
    let name = event.target.name
    switch (name){
      case "email":{
        setInput({...input, email: value})
        break;
      }
      case "password":{
        setInput({...input, password: value})
        break;
      }
      default:{break;}
    }
  }

  return(
    <>
        
      <div className='kotak3'>
        <h1>LOGIN</h1>  
        <form onSubmit={handleSubmit}>
          <label>Email: </label><br/>
          <input type="email" name="email" onChange={handleChange} value={input.email}/>
          <br/>
          <label>Password: </label><br/>
          <input type="password" name="password" onChange={handleChange} value={input.password}/>
          <br/><br/>
          <button>Login</button>
        </form>
      </div>
    </>
  )
}

export default Login
