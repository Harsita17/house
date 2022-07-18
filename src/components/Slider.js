import React,{useState,useEffect} from 'react'

import { db } from "../firebase";
import {collection,getDoc,query,orderBy,limit, getDocs} from 'firebase/firestore'
import { useNavigate } from 'react-router-dom';
import Spinner from '../components/Spinner';
import {ImLocation2} from 'react-icons/im';
import "../style/Slider.css"

import SwiperCore,{EffectCoverflow,Navigation,Pagination} from 'swiper'
// import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';



//config
SwiperCore.use([EffectCoverflow,Pagination,Navigation])


const Slider = () => {
    const[listings,setListings]=useState(null)
    const [loading,setLoading]=useState(true)
    const navigate=useNavigate();
    const userPic="http://openclipart.org/download/247319/abstract-user-flat-3.svg"
    
    useEffect(()=>{
        const fetchListings=async()=>{
            const listingRef=collection(db,'listings')
            const q=query(listingRef,orderBy('timestamp','desc'),limit(5))
            const querySnap=await getDocs(q)
            let listings=[]
            querySnap.forEach(doc=>{
                return listings.push({
                    id:doc.id,
                    data:doc.data()
                })
            })
            setListings(listings)
            setLoading(false)

        }
        fetchListings()
        console.log(listings===null? "loading" : listings)
        
    },[])
    if(loading)
    {
        return <Spinner/>
    }
  return (
    <>
    <div className='mySlide' style={{width:"50%"}}>
    {listings.imgUrl===null ? (<Spinner/>): 
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
            
            // onSlideChange={() => console.log('slide change')}
            >
                {listings.map(({data,id})=>(
                    <SwiperSlide key={id}
                        onClick={()=>{navigate(`/Category/${data.type}/${id}`)}}>
                        <h6 className='bg-info text-light p-2 m-0'>
                            {/* <img  alt="user pic" src={userPic} 
                            height={35} width={35}
                            /> */}
                            <ImLocation2 size={20} className="ms-2"/> Recently Added : {" "}
                            <br />
                            <span className='ms-4'>{data.Name}</span>
                            <span className='ms-2'>
                                | Price (${data.regularPrice})

                            </span>
                        </h6>
                        <img src={data.imgUrl[0]} 
                        // height={400}
                        // width={500}
                        alt={data.Name} 
                        className='Slider-img'
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        )}

    </div>
    </>
  )
}

export default Slider