import React,{useState,useEffect} from 'react'
import Layout from '../components/Layout/Layout'
import {getDoc,doc } from 'firebase/firestore'
import { db } from "../firebase";
import {getAuth} from 'firebase/auth'
import {useNavigate,Link,useParams} from 'react-router-dom'
import Spinner from '../components/Spinner';
import SwiperCore,{EffectCoverflow,Navigation,Pagination} from 'swiper' 

import {Swiper,SwiperSlide} from 'swiper/react'
// import 'swiper/swiper-bundle.min.css';

// import 'swiper/swiper.min.css';
import 'swiper/css/pagination';
import "../style/listing.css";



//config
SwiperCore.use([EffectCoverflow,Pagination])


const Listing = () => {
    const [listing,setListing]=useState('')
    const [loading,setLoading]=useState(false)
    const navigate=useNavigate()
    const params=useParams()
   


    useEffect(()=>{
        const fetchListing=async()=>{
            
            const docRef=doc(db,'listings',params.listingId)
            const docSnap=await getDoc(docRef)
            if(docSnap.exists()){
                console.log(docSnap.data())
                setListing(docSnap.data())
                setLoading(false)

            }
        };
        fetchListing();
        //eslint-disable-next-line
    },[params.listingId])
    if(loading){return <Spinner/>};
  return (
    <Layout><div className="listing  d-flex align-items-center justify-content-center ">
        <div className="" style={{width: '600px'}}>
    <div className="card-header">
        {listing.imgUrl===undefined ? (<Spinner/>): 
        (
            <Swiper
            
           spaceBetween={0}
           speed={500}
           loop={true}
           navigation={true}
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={1}

            coverflowEffect={{
                
            
                
                
                freeMode:true,
                rotate:5,
                stretch:0,
                depth:100,
                
                slideShadows:true
            }}
            pagination={{
                
                dynamicBullets: true}}
                
            className='mySwipe'
            style={{backgroundColor:"#474b4f"}}
            // onSlideChange={() => console.log('slide change')}
            >
                {listing.imgUrl.map((url,index)=>(
                    <SwiperSlide key={index}>
                        <img src={listing.imgUrl[index]} 
                        height={400}
                        width={600}
                        alt={listing.Name} />
                    </SwiperSlide>
                ))}
            </Swiper>
        )}
    </div>
  <div className="textListing card-body">
    <h1 className='text-center'>About the house</h1>
    
    <h3>
        {listing.Name}
       
    </h3>
     <h6>
            price: {listing.offer ? listing.discountedPrice : listing.regularPrice} / rs
        </h6>
    <p>Property for : 
        {listing.type==="rent" ? " rent" : "sale"}
    </p>
    <p>
        {
            listing.offer && (
                <span>
                    {listing.regularPrice-listing.discountedPrice} discount
                </span>
            )
        }
    </p>
        <p>
            {listing.bedrooms >1 ? `${listing.bedrooms}       Bedrooms`  : `1 Bedroom`}
        </p>
        <p>
            {listing.parking ? `parking spot` : 'no spot for parking'}
        </p>
        <p>
            {
                listing.furnished ? `furnished house` : "Not furnished house"
            }
        </p>
        <div className='Landlord'>
        <Link className='contactLandlord btn ' to={`/Contact/${listing.useRef} ? listingName=${listing.Name}`}>
            Contact LandLord
        </Link>
        </div>
        
  </div>
</div>

        </div></Layout>
  )
}

export default Listing