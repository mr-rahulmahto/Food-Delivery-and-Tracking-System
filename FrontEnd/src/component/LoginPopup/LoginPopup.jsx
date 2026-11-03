import React, { useState } from 'react'
import './login.css'
import { Comp } from '../../assets/Comp'
import { useContext } from 'react'
import { StoreContext } from '../../Context/StoreContext'
import axios from 'axios'

const LoginPopup = ({ setShowLogin }) => {

  const { url, setToken } = useContext(StoreContext)
  const [currState, setCurrState] = useState("Login")
  const [loading, setLoading] = useState(false)        // loading state added

  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  })

  const onChangeHandler = (Event) => {
    const name = Event.target.name;
    const value = Event.target.value;
    setData(data => ({ ...data, [name]: value }))
  }

  const onLogin = async (Event) => {
    Event.preventDefault()
    let newUrl = url;

    if (currState === "Login") {
      newUrl += "/api/user/login"
    } else {
      newUrl += "/api/user/register"
    }

    setLoading(true)   //  start loading

    try {
      const response = await axios.post(newUrl, data);

      if (response.data.success) {
        if (currState === "Login") {
          //  Login success → save token & close popup
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
          setShowLogin(false);
        } else {
          //  Register success → switch to Login automatically
          alert("Account created! Please log in.");
          setCurrState("Login");
          setData({ name: "", email: "", password: "" });
        }
      } else {
        alert(response.data.message || "Something went wrong.");
      }

    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Something went wrong while connecting to server.");
    } finally {
      setLoading(false)  //  always stop loading
    }
  };

  return (
    <div className='login-popup'>
      <form onSubmit={onLogin} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img onClick={() => setShowLogin(false)} src={Comp.cross_icon} alt="" />
        </div>
        <div className="login-popup-inputs">
          {currState === "Login"
            ? null
            : <input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Your Name' required />
          }
          <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Your E-mail' required />
          <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder='Password' required />
        </div>

        {/*  Loading button */}
        <button type='submit' disabled={loading}>
          {loading
            ? "Please wait..."
            : currState === "Sign Up" ? "Create Account" : "Login"
          }
        </button>

        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By Continuing, I agree to the terms of use & privacy policy.</p>
        </div>

        {currState === "Login"
          ? <p className='clickhere'>Create a New Account? <span onClick={() => setCurrState("Sign Up")}>Click Here</span></p>
          : <p className='clickhere'>Already Have an Account? <span onClick={() => setCurrState("Login")}>Login Here</span></p>
        }
      </form>
    </div>
  )
}

export default LoginPopup;
