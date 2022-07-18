import React,{useEffect,useState} from 'react'
import Layout from '../components/Layout/Layout'
import {useParams} from 'react-router-dom'
import { db } from "../firebase";
import { toast } from 'react-toastify';
import {collection,getDoc,query,where,orderBy,limit,startAfter, getDocs} from 'firebase/firestore'
import Spinner from '../components/Spinner';
import ListingItems from '../components/ListingItems';
import "../style/category.css";

const Category = () => {
    const [listing,SetListing]=useState(" ");
    const [lastFetchListing,setLastFetchListing]=useState(null)
    const [loading,SetLoading]=useState(true);
    const params=useParams();
    const fetch=async()=>{
        try{
            const listingRef=collection(db,'listings');
            const qu=query(listingRef, where("type", "==", params.CategoryName),
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
            toast.error("Unable to fetch data")
            SetLoading(false)
            
        }
    };
    useEffect(()=>{
       
        fetch();

    },[params.CategoryName]);
    //loadmore pagination
    const fetchLoadMoreListing=async()=>{
        try{
            const listingRef=collection(db,'listings');
            const qu=query(listingRef, where("type", "==", params.CategoryName),
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
            toast.error("Unable to fetch data")
            SetLoading(false)
            
        }
    };
  return (
    <Layout>
        <div className="category">
        <div className=" para container-fluid">
         <h1>{params.CategoryName === 'rent' ?
    'PLACES FOR RENT' : 'PLACES FOR SALE'    
    }</h1>
    
    {
        
        loading ? (<Spinner/> ) :
       listing && listing.length > 0 ? (<>
       <div className='rentsale'>
           {listing.map(list=>(
               <ListingItems listing={list.data} id={list.id} key={list.id}/>
           ))}
       </div>
       </>)
        :(<p>No listing for {params.CategoryName}</p>)
    }
    </div>
    <div className='d-flex align-items-center justify-content-center mt-3'>
        {
            lastFetchListing && (
                <button className=' load-btn btn  text-center'
                onClick={fetchLoadMoreListing}
                >load more</button>
            )
        }
    </div>
       
        </div>
    </Layout>
  )
}

export default Category