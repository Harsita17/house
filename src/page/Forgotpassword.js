import React,{useState} from 'react'
import Layout from '../components/Layout/Layout'
import {Link,useNavigate} from 'react-router-dom'
import { EmailAuthCredential, getAuth,sendPasswordResetEmail } from 'firebase/auth'
import {toast} from 'react-toastify';
import "../style/ForgotPassword.css"
import forget from '../images/forget.svg'
const Forgotpassword = () => {
  const [email,setEmail]=useState('');
  const navigate=useNavigate()
  const onSubmitHandler=async (e)=>
  {
    e.preventDefault();
    try{
      const auth=getAuth()
      await sendPasswordResetEmail(auth,email)
      toast.success('Email has been sent')
      navigate('/Signin');
    }catch(error)
    {
      toast.error('Something went wrong')
    }
  }

  return (
    <Layout>
     <div className="contain_forgot ">
       <div className="imgcontain">
        <img src={forget} alt=""style={{height:"320px",marginTop:"50px"}} />
       </div>
      
      
     <div className="passwordcontain">
       <h5>Reset Your Password</h5>
      <form onSubmit={onSubmitHandler}>
  <div className="container mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={email}
    onChange={(e) => setEmail(e.target.value)}/>
    <div id="emailHelp" className="nevershare form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className='d-flex justify-content-between'>
  <button type="submit" className="reset btn btn-primary">reset</button>
  <Link to='/Signin' className='sign'>Sign In</Link>
  
  </div>
  
 
    </form>
     </div>
     
    </div>

      </Layout>
  )
}

export default Forgotpassword