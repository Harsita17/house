import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {toast} from 'react-toastify';
import Layout from "./../components/Layout/Layout";
import { BsFillEyeFill } from "react-icons/bs";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { db } from "../firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import OAuth from "../components/OAuth";
import signup from '../images/signup.svg'
import "../style/signup.css";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
    value:"",
  });
  const { name, email, password,value } = formData;
  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmitHndler = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(userCredential);
      const user = userCredential.user;
      await updateProfile(auth.currentUser, { displayName: name });
      const formDataCopy = { ...formData ,value};
      delete formDataCopy.password;
      formDataCopy.timestamp = serverTimestamp();
      // console.log(formDataCopy,db,user.uid);
      await setDoc(doc(db, "users", user.uid), formDataCopy);
      toast.success("Sign up successful")
      navigate("/");
        
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong")
    }
  };
  return (
    <Layout>
      <div className="signcontainer">
        <div className="cont1Sign">
        <img src={signup} alt="" />
        </div>
      <div className="cont2sign d-flex  align-items-center justify-content-center w-100 ">
        <form className="bg-light p-4" onSubmit={onSubmitHndler}>
          <h4 className="head bg-dark p-2 mt-2 text-light text-center">Sign Up </h4>
          <div className="radioContain">
          <div className="form-check">
            <input className='radio form-check-input' 
            type="radio"
            value="landlord"
            onChange={onChange}
            
            name='value'
            id='value'
            />
            <label className='form-check-label' htmlFor="rent">landlord</label>
          </div>
            <div className="form-check">
            <input className='radio form-check-input' 
            type="radio"
            value="buyer"
            onChange={onChange}
            
            name='value'
            id='value'
            />
            <label className='form-check-label' htmlFor="rent">buyer</label>
          </div>
            <div className="form-check">
            <input className='radio form-check-input' 
            type="radio"
            value="tenant"
            onChange={onChange}
            
            name='value'
            id='value'
            />
            <label className='form-check-label' htmlFor="rent">tenant</label>
          </div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Enter Name
            </label>
            <input
              type="text"
              value={name}
              className="form-control"
              id="name"
              onChange={onChange}
              aria-describedby="nameHelp"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
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
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={onChange}
              className="form-control"
              id="password"
            />
            <span className="show">
              show password
              <BsFillEyeFill
                className=" ms-2"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setShowPassword((prevState) => !prevState);
                }}
              />
            </span>
          </div>
          <button type="submit" className="button1 btn btn-primary">
            Sign up
          </button>
          <div>
            <h6>Login with Google</h6>
            <OAuth/>
            <div className="signup"><span>Already a User?</span> <Link to="/signin">Login</Link></div>
            
          </div>
        </form>
      </div>
      </div>
    </Layout>
  );
};

export default Signup;