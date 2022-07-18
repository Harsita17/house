import React,{useEffect,useState} from 'react'
import Layout from '../components/Layout/Layout'
import {useParams} from 'react-router-dom'
import { db } from "../firebase";
import { toast } from 'react-toastify';
import {collection,getDoc,query,where,orderBy,limit,startAfter, getDocs} from 'firebase/firestore'
import Spinner from '../components/Spinner';
import ListingItems from '../components/ListingItems';
import "../style/offers.css"


const Offers = () => {
  const [listing,SetListing]=useState(" ");
    const [loading,SetLoading]=useState(true);
    const [lastFetchListing,setLastFetchListing]=useState(null)
    const params=useParams();
    const fetch=async()=>{
        try{
            SetLoading(true)
            const listingRef=collection(db,'listings');
            const qu=query(listingRef, where("offer", "==", true),
            limit(1)
            );
            //execute querry
            const querrySnap=await getDocs(qu);
            // console.log("-------------------")
            // console.log(querrySnap)
            const lastVisible= querrySnap.docs[querrySnap.docs.length-1]
            setLastFetchListing(lastVisible)
            
            const listings=[];
            querrySnap.forEach((doc)=>{
               return  listings.push({
                   id:doc.id,
                   data:doc.data()
               })
            });
            SetListing(listings);
            SetLoading(false);
        }catch(error){
            console.log(error);
            toast.error("Enable to fetch data")
            SetLoading(false)
            
        }
    };
    useEffect(()=>{
       
        fetch();
    },[]);
     const fetchLoadMoreListing=async()=>{
        try{
            const listingRef=collection(db,'listings');
            const qu=query(listingRef, where("offer", "==", true),
            startAfter(lastFetchListing),
            limit(10)
            );
            //execute querry
            const querrySnap=await getDocs(qu);
            // console.log("-------------------")
            // console.log(querrySnap)
            const lastVisible= querrySnap.docs[querrySnap.docs.length-1]
            setLastFetchListing(lastVisible)
            
            const listings=[];
            querrySnap.forEach((doc)=>{
               return  listings.push({
                   id:doc.id,
                   data:doc.data()
               })
            });
            SetListing(prevstate => [...prevstate,...listings]);
            SetLoading(false);
        }catch(error){
            console.log(error);
            toast.error("Enable to fetch data")
            SetLoading(false)
            
        }
    };
    return (
      <Layout><div className="offer pt-3 container-fluid">
          <h1>Best Offers</h1>
      
      {
          
          loading ? (<Spinner/> ) :
         listing && listing.length > 0 ? (<>
         <div>
             {listing.map(list=>(
                 <ListingItems listing={list.data} id={list.id} key={list.id}/>
             ))}
         </div>
         </>)
          :(<p>There are no Current offer !</p>)
      } 
      <div className='d-flex align-items-center justify-content-center mt-3'>
        {
            lastFetchListing && (
                <button className=' load-btn'
                onClick={fetchLoadMoreListing}
                >load more</button>
            )
        }
    </div>
      </div>
     
         
      </Layout>
    )
}


export default Offers