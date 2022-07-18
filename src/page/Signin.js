import React, { useState,useEffect } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { toast } from "react-toastify";
import Layout from "../components/Layout/Layout";
import { BsFillEyeFill } from "react-icons/bs";
import OAuth from "../components/OAuth";
import "../style/signIn.css";
import sign from '../images/sign.svg'


const Signin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    value:"",
  });
 
 

  const { email, password,value} = formData;
  const navigate = useNavigate()

 
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };
  

const[radio,setRadio]=useState("")
const fetch=async()=>{
      const auth=getAuth()
      const docRef = doc(db, "users", auth.currentUser.value);
      const docSnap = await getDoc(docRef);
      setRadio(docSnap)
      console.log(docSnap);
}
  const logInHandler = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
     
    
      if (userCredential.user) {
        toast.success("Login Success");
        navigate('/')
        
      
      }
      
    } catch (error) {
      console.log(error);
      toast.error("Invalid email or password");
    }
  };
  

  return (
    <Layout>
      <div className="signcontainer">
        <div className="cont1">
            <img src={sign} alt="not working" style={{height:"200px",marginTop:"50px"}}/>
        </div>
        <div className="cont2 d-flex  align-items-center justify-content-center w-300 ">
          <form className="bg-light p-4" onSubmit={logInHandler}>
            <h5 className="head bg-dark p-2 mt-2 text-light text-center">Hey Welcome!</h5>
            {/* <div className="value form-check">
            <input className='radio form-check-input' 
            type="radio"
            value="landlord"
            onChange={onChange}
            
            name='value'
            id='value'
            />
            <label className='form-check-label' htmlFor="rent">landlord</label>
          </div>
            <div className="value form-check">
            <input className='radio form-check-input' 
            type="radio"
            value="buyer"
            onChange={onChange}
            
            name='value'
            id='value'
            />
            <label className='form-check-label' htmlFor="rent">buyer</label>
          </div>
            <div className="value form-check">
            <input className='radio form-check-input' 
            type="radio"
            value="tenant"
            onChange={onChange}
            
            name='value'
            id='value'
            />
            <label className='form-check-label' htmlFor="rent">tenant</label>
          </div> */}
           {/* <div className="App container">
      
      <select name="" id="" onChange={handleSelect}>
          <option value={value}>landlord</option>
          <option value={value}>buyer</option>
          <option value={value}>tenant</option>

      </select>
      
    </div> */}


            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label  ">
                Email address
              </label>
              <input
                type="email"
                value={email}
                onChange={onChange}
                className="form-control"
                id="email"
                aria-describedby="emailHelp"
              />
              {/* <div id="emailHelp" className="form-text h6">We'll never share your email with anyone else.</div> */}
            </div>

            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label h6">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={onChange}
                className="form-control "
                id="password"
              />
              <span className="show">
                show Password{" "}
                <BsFillEyeFill
                  className=" ms-2"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setShowPassword((prevState) => !prevState);
                  }}
                />
              </span>
              <br />
              
            </div>

            <button type="submit" className="button btn btn-primary ">
              Sign In
            </button>
            <span className="forgot">
                <Link to="/Forgotpassword">Forgot Password?</Link>
              </span>
                <div className="or"><p>or</p></div>
            <OAuth />
            <div className="signup ">
              <span >New user?</span><Link to="/Signup"> SignUp </Link> </div>
               
             
             
              
           
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Signin;