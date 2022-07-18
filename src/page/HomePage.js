import React from 'react'
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout/Layout'
import Slider from '../components/Slider';
import "../style/Homepage.css"
import rent from '../images/rent.svg'
import sale from '../images/sale.svg'


const Homepage = () => {
  const navigate=useNavigate();
  const img1='https://images.unsplash.com/photo-1600585154526-990dced4db0d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80'
  const img2='https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'

  return (
    <Layout>
      
      <div className="home-cat row d-flex align-items-center justify-content-center">
        <Slider/>
        <dic className="imagec">
        <div className="row">
          <h1>Categories</h1>
          <div className="col">
         <div className="imagecontainer">
           <img src={rent} alt="rent" style={{width: '100%' ,height:'300px'}} />
          <button className="btn"
          onClick={()=> navigate('/Category/rent')}
          >To Rent</button>
          </div>
        

          </div>
          <div className="col">
          <div className=" imagecontainer">
           <img src={sale} alt="rent" style={{width: '100%' ,height:'300px'}} />
          <button className="btn"
          onClick={()=> navigate('/Category/sale')}
          >To Sale</button>
          </div>
        
          </div>
        </div>
        </dic>
      </div>
    </Layout>
  );
};

export default Homepage