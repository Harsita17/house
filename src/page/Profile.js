import React,{useState,useEffect}from 'react'
import {toast} from 'react-toastify';
import { useNavigate,Link} from 'react-router-dom'
import Layout from '../components/Layout/Layout'
import {getAuth,updateProfile} from 'firebase/auth'
import { db } from "../firebase";
import {FiEdit} from 'react-icons/fi'
import {MdDone} from 'react-icons/md'
import { doc, updateDoc, serverTimestamp,collection,getDoc,getDocs,query,where,orderBy,deleteDoc } from "firebase/firestore";
import {RiArrowRightCircleLine} from 'react-icons/ri'

import ListingItems from '../components/ListingItems'
import firebaseConfig from '../firebase.Config';
import "../style/profile.css"
import profile from '../images/profile.svg'

const Profile = () => {
    const auth=getAuth()
    const navigate=useNavigate()
    const [loading,setLoading]=useState(true)
    const [listings,setListings]=useState(null)
    //useEffect for getting data
    useEffect(()=>{
        const fetchUserListing=async()=>{
            const listingRef=collection(db,'listings')
            const q=query(listingRef,where('useRef','==',auth.currentUser.uid),orderBy('timestamp','desc'))
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
            console.log(listings)
        }
        fetchUserListing()
    },[auth.currentUser.uid])
    const [changeDetails,setchangeDetails]=useState(false)
 const [formData,setFormData]=useState(
     {
         name:auth.currentUser.displayName,
         email:auth.currentUser.email
     }
 )  
 const {name,email}=formData
const logOutHandle=()=>{
    auth.signOut()
    toast.success("Successfully Logout")
    navigate('/')
}
const onChange=(e)=>{
    setFormData(prevState=>({
        ...prevState,
        [e.target.id]:e.target.value,
    }))
}
const onSubmit=async ()=>{
    try{
        if(auth.currentUser.displayName!==name){
            await updateProfile(auth.currentUser,{
                displayName:name
            })
            const useRef = doc(db,'users',auth.currentUser.uid)
            await updateDoc(useRef,{name})
            toast.success("user updated");
        }
    }catch(error){
        console.log(error)
        toast("something went wrong")
    }
}
//delete handler
const onDelete =async (listingId) =>{
     console.log("=================")
        console.log(listingId)
    if(window.confirm('Are you sure want to delete?'))
    {
        
        const docRef=doc(db,'listings',listingId)
        await deleteDoc(docRef)
       
        // await  deleteDoc(doc,(db,'listings',listingId))
        
        const updatedListings=listings.filter(listing=>(listing.id !==listingId))
        setListings(updatedListings)
        toast.success("Listing has been deleted successfullyy!!!!")
        
    }
};
// db.collection('listings').doc(listingId).delete().then(()=>{
//     console.log("success").catch((error)=>{
//         console.log("error")
//     })
//    })

const onEdit=(listingId)=>{
    navigate(`/EditListing/${listingId}`)
}
  return (
    <Layout>
        <div className="profileHead    d-flex justify-content-center">
        <h4>Profile Details</h4>
        
        </div>
        <div className="profileDetails">
            <div className="profileImage">
                <img src={profile} alt=""  style={{height:"420px",marginTop:"60px"}}/>
            </div>
        <div className="user container mt-4 card" style={{width: '18rem'}}>
            {/* <img src="..." className="card-img-top" alt="..." /> */}
        <div className=" card-header">
            <div className="d-flex justify-content-center ">
                <h4 style={{fontWeight:"normal"}}>User Personal Details &nbsp; </h4>
                <span style={{cursor:'pointer'}}
                onClick={()=>{changeDetails && onSubmit(); setchangeDetails(prevState => !prevState);}}
                >
                    {changeDetails ? <MdDone color='green'/>:<FiEdit color='#61892f'/>}
                </span>
            </div>
        </div>
             <div className="profileForm card-body">
            <form>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1"          className="form-label">Name</label>
                <input type="Name" className="form-control"             id="name"
                value={name} 
                onChange={onChange}
                disabled={!changeDetails}/>
            </div>
          
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1"             className="form-label">Email address</label>
                <input type="email" 
                value={email}
                className="form-control"            id="email" aria-describedby="emailHelp" 
                onChange={onchange}
                disabled={!changeDetails}/>
                
            </div>
            <button className='logoutProfile btn ' onClick={logOutHandle}>Log Out</button>
            
            </form>
           

             </div>
        </div>
        </div>
       <div className="profileListing">
       <div className='link container  d-flex justify-content-center'>
        <Link to='/CreateListing'>
                <RiArrowRightCircleLine color='#86c232'/> &nbsp;
            Sell or Rent Home
            </Link>

        </div>
        <div className='container'>
            {listings && listings?.length >0 &&(
                <>
                    <h6>My Listing</h6>
                    <div>
                        {
                            listings.map(listing=>(
                                <ListingItems key={listing.id} listing={listing.data} id={listing.id}
                                onDelete={()=>onDelete(listing.id)}
                                onEdit={()=> onEdit(listing.id)}
                                />
                            ))
                        }
                    </div>
                </>
            )}

        </div>

       </div>
    </Layout>
  );
  
}

export default Profile