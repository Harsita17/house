import React from 'react'
import "../../style/footer.css"
import {Link} from 'react-router-dom'
import {BsInstagram,BsGithub,BsLinkedin,BsTwitter} from 'react-icons/bs'


const footer = () => {
  return (
    <>
    <div className='footer d-flex align-items-center justify-content-center  text-light p-4'>
      <h6>All rights reserved &copy; Harsita--2022 </h6> 
      
      </div>
      <div className=" icons d-flex justify-content-center  flex-row p-2">
        <p className='icon instagram me-4' title='Instagram'>
        <Link to='https://www.instagram.com/'>
          <BsInstagram color='black' size={30}/>
        </Link>

        </p>
        <p className='icon github me-4' title='Github'>
        <Link to='/'>
          <BsGithub color='black' size={30}/>
        </Link>

        </p>
        <p className='icon linkedin me-4' title='Youtube'>
        <Link to='/'>
          <BsLinkedin color='black' size={30}/>
        </Link>

        </p>
        <p className='icon twitter me-4' title='Whatsapp'>
        <Link to='/'>
          <BsTwitter color='black' size={30}/>
        </Link>

        </p>
        </div>

     
    </>
    
  )
}

export default footer