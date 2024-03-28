import React, {useState} from 'react'
import { useNavigate } from "react-router-dom";
import {auth} from "../firebase"
import {signInWithEmailAndPassword} from "firebase/auth"
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css'
import logo from "../images/meisze.png";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate()

  const handleClick = (e) =>{
    e.preventDefault();
    
    signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
      //const user = userCredential.user;
      window.localStorage.setItem("User", email)
      navigate('/mainmeun/financial/invoice')
  })
  .catch((error) => {
      //const errorCode = error.code;
      //const errorMessage = error.message;
      setError(true);

  });
      
    
        
    }

return (
    <div className='d-flex vh-100 justify-content-center align-items-center bg-#181b3a loginPage'>
      <div className='p-3 rounded w-20 loginForm'>
        <img alt="logo" src={logo} />
        <form >
            <div className='mb-3'>
                <label htmlFor="email"><strong>Email</strong></label>
                <input 
                  type='email' 
                  placeholder='Enter Email' 
                  className='form-control rounded-0'
                  onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className='mb-3'>
                <label htmlFor='password'><strong>Password</strong></label>
                <input 
                  type='password' 
                  placeholder='Enter Password' 
                  className='form-control rounded-0'
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <button onClick={(e) => handleClick(e)} className='btn btn-success' >Login</button>
            
        </form>
        {error && <span>Wrong email or password!</span>}
      </div>
    </div>
  )
}

export default Login