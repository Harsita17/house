
import Layout from '../components/Layout/Layout'
import React ,{useState,useEffect,useRef}from 'react'

import { getAuth,onAuthStateChanged } from 'firebase/auth'
import { useNavigate,useParams } from 'react-router-dom'
import Spinner from '../components/Spinner';
import {AiOutlineFileAdd} from 'react-icons/ai'
import { toast } from 'react-toastify';
import {getStorage,ref,uploadBytesResumable,getDownloadURL} from 'firebase/storage'
import { db } from "../firebase";
import { v4 as uuidv4 } from 'uuid';
import {addDoc,collection,serverTimestamp ,doc,updateDoc,getDoc} from 'firebase/firestore'
import Listing from './Listing';
const EditListing = () => {
    const [listing,setListing]=useState(null)
    const params=useParams()
    const [loading,setLoading]=useState(false)
    const[geoLocationEnable,setGeoLocationEnable]=useState(false)
    const[formData,setFormdata]=useState({
        type:'rent',
        Name:' ',
        bathrooms:1,
        bedrooms:1,
        parking:false,
        location:"",
        furnished:false,
        offer:true,
        regularPrice:0,
        discountedPrice:0,
        images:{},
        latitude:0,
        longitude:0,
        });
    const {type,Name,bathrooms,bedrooms,parking,location,furnished,offer,regularPrice,discountedPrice,images,latitude,longitude}=formData
    const auth=getAuth()
    const navigate=useNavigate()
    const isMounted=useRef(true)
    useEffect(()=>{
        if(isMounted){
          onAuthStateChanged(auth,(user)=>{
            setFormdata({
               ...formData,
              useRef: user.uid
            }
             
            )
          })
        }
        else{
          navigate('/Signin')
        }
        //eslint-disable-next-line
    },[])
    //useEffect to check log in user
    useEffect(()=>{
        if(listing && listing.useRef !== auth.currentUser.uid){
            toast.error('can not edit this listing')
            navigate('/')
        }
        //eslint-disable-next-line
    },[])
    useEffect(()=>{
        setLoading(true)
        const fetchListing=async()=>{
            const docRef=doc(db,'listings',params.listingId)
            const docSnap=await getDoc(docRef)
            if(docSnap.exists()){
                setListing(docSnap.data())
                setFormdata({...docSnap.data()})
                setLoading(false)
            }
            else{
                navigate('/')
                toast.error("listing does not exist")
            }
        }
        fetchListing()
    },[])


    if(loading){
      return <Spinner/>
    }
    const onChangeHandler=(e)=>{
      let boolean=null;
      if (e.target.value==='true'){
        boolean=true;
      }
      if(e.target.value==='false'){
        boolean=false
      }
      if(e.target.files) {
        setFormdata((prevState)=>({
          ...prevState,
          images:e.target.files,
        }));
      }
      if(!e.target.files){
        setFormdata((prevState)=>({
          ...prevState,
          [e.target.id]:boolean ?? e.target.value,
        }))
      }
    }
    const onSubmitHandler=async(e)=>{
        setLoading(true)
      e.preventDefault();
      // console.log(formData);
      if(discountedPrice>=regularPrice){
        setLoading(false)
        toast.error('Discount price should be lesser than regular price'
        )
        return
      }
      if(images>6)
      {
        setLoading(false)
        toast.error(' Max 6 images can be selected'
        )
      }
      let geoLocation={}
      let address;
      if(geoLocationEnable){
        const response=await fetch(`http://maps.googleapis.com/maps/apis/geocode/json?address=${address}&key=AIzaSyD44bHrb2NmFq_osu82FRjXzmJ9fZnGhn8`)
        const data=await response.json()
        console.log(data)
      }else{
        geoLocation.lat=latitude;
        geoLocation.lng=longitude;
        address=location;
      }
      //store images in firebase
      const storeImage=async(image)=>{
        return new Promise((resolve,reject)=>
          {
            const store=getStorage();
            const filename=`${auth.currentUser.uid}-${image.name}-${uuidv4()}`
            const storeRef=ref(store,'images/'+filename)
            const uploadTask=uploadBytesResumable(storeRef,image)
            uploadTask.on('state_changed',(snapshot)=>{
              const progress=(snapshot.bytesTransferred/snapshot.totalBytes*100)
              console.log('upload is '+progress+' %done')
              switch(snapshot.state){
                case 'paused': console.log('Upload is paused')
                break
                case 'running':console.log('upload is running')
                break
                default:return snapshot.state
              }
            },
            (error)=>{reject(error)},
            //success
            ()=>{
              getDownloadURL(uploadTask.snapshot.ref)
              .then((downloadURL)=>{resolve(downloadURL)})
            }
            )
          }

        )
      }
      const imgUrl = await Promise.all([...images].map(image => storeImage(image))      )

      .catch(()=>{
        setLoading(false)
        toast.error('images not uploades')
        return
      })
      
      console.log(imgUrl)
      //save from data

      const formDataCopy={...formData,imgUrl,geoLocation,timestamp:serverTimestamp()}
      
      formData.location=location
      delete formDataCopy.images
      // delete formDataCopy.location
      !formDataCopy.offer && delete formDataCopy.discountedPrice
      const docRef=doc(db,'listings',params.listingId)
      await updateDoc(docRef,formDataCopy)
      setLoading(false)
      toast.success('Listing updated successfully')
      navigate(`/Category/${formDataCopy.type}/${docRef.id}`)
    }
  return (
    <Layout>
      <div className="listingForm  d-flex flex-column align-items-center justify-cintent-center 
      "
      style={{height:"150vh"}}
      >
      <h3 className='mt-3 w-50 bg-dark text-light p-2 text-center '>
        Update listing &nbsp;
        <AiOutlineFileAdd/>
      </h3>
      <form className='w=50 bg-light p-4' onSubmit={onSubmitHandler}>
        <div className="d-flex flex-row mt-4">
          <div className="form-check">
            <input className='form-check-input' 
            type="radio"
            value="rent"

            defaultChecked
            name='type'
            id='type'
            />
            <label className='form-check-label' htmlFor="rent">rent</label>
          </div>
          <div className="form-check ms-3">
            <input className='form-check-input' 
            type="radio"
            value="sale"
            onChange={onChangeHandler}
            defaultChecked
            name='type'
            id='type'
            />
            <label className='form-check-label' htmlFor="sale">sale</label>
          </div>
        </div>
        <div className="mb-3 mt-4">
          <label htmlFor="Name" className='form-label'>Name</label>
          <input type="text"
          className='form-control'
          id='Name'
          value={Name}
          onChange={onChangeHandler}
          required
          />
        </div>
        <div className="mb-3 mt-4">
          <label htmlFor="bedrooms" className='form-label'>Bedrooms</label>
          <input type="number" className='form-control' id='bedrooms'
          value={bedrooms}
          onChange={onChangeHandler}
          required
           />

        </div>
        <div className="mb-3 mt-4">
          <label htmlFor="bathrooms" className='form-label'>Babath rooms</label>
          <input type="number" className='form-control' id='bathrooms'
          value={bathrooms}
          onChange={onChangeHandler}
          required
           />

        </div>
        <div className="mb-3">
          <label htmlFor="parking" className='form-label'>
            parking:
          </label>
          <div className="d-flex flex-row">
            <div className="form-check">
              <input
              className='form-check-input'
              type="radio"
              value={true}
              onChange={onChangeHandler}
              name="parking"
              id='parking'
              />
              <label className='form-check-label' htmlFor="yes">
                Yes
              </label>
            </div>
            <div className="form-check ms-3">
            <input 
            className='form-check-input'
            type="radio" 
            value={false}
            name="parking"
            onChange={onChangeHandler}
            id='parking'/>
            <label className='form-check-label' htmlFor="no">
                no
              </label>

            </div>
          </div>
        </div>
        
        <div className="mb-3">
          <label htmlFor="furnished" className='form-label'>
            furnished:
          </label>
          <div className="d-flex flex-row">
            <div className="form-check">
              <input
              className='form-check-input'
              type="radio"
              value={true}
              onChange={onChangeHandler}
              name="furnished"
              id='furnished'
              />
              <label className='form-check-label' htmlFor="yes">
                Yes
              </label>
            </div>
            <div className="form-check ms-3">
            <input 
            className='form-check-input'
            type="radio" 
            value={false}
            name="furnished"
            id='furnished'
            onChange={onChangeHandler}/>
            <label className='form-check-label' htmlFor="no">
                no
              </label>

            </div>
          </div>
        </div>
        <div className='Mb-3'>
          <label htmlFor="location">Address :</label>
          <textarea className='form-control' placeholder='Enter your Address' name="location" id="location" value={location} required
          onChange={onChangeHandler}></textarea>
        </div>
        {!geoLocationEnable && (
          <div className="mb-3">
            <div className="d-flex flex-row">
              <div className="form-check">
                <label className='form-check-label' htmlFor="yes">
                  Latitude
                </label>
                <input type="number"
                className='form-control'
                value={latitude}
                name="latitude"
                id='latitude'
                onChange={onChangeHandler}
                />
              </div>
              <div className="form-check ms-3">
                <label className='form-check-label' htmlFor="yes">
                  Longitude
                </label>
                <input type="number"
                className='form-control'
                value={longitude}
                name="longitude"
                id='longitude'
                onChange={onChangeHandler}
                />
              </div>
            </div>
          </div>
        )}
        <div className="mb-3">
          <label htmlFor="offer" className='form-label'>
            Offers:
          </label>
          <div className="d-flex flex-row" >
            <div className="form-check">
              <input type="radio"
              className='form-check-input'
              value={true}
              onChange={onChangeHandler}
              name="offer"
              id="offer"
              />
              <label htmlFor="yes" className='form-check-label'>yes</label>
            </div>
            <div className="ms-3">
            <input type="radio"
              className='form-check-input'
              value={false}
              onChange={onChangeHandler}
              defaultChecked
              name="offer"
              id="offer"
              />
              <label htmlFor="no" className='form-check-label'>no</label>
            </div>
          </div>
        </div>
        <div className="mb-3 mt-4">
          <label htmlFor="name" className='form-label'>Regular Price: </label>
          <div className="d-flex flex-row">
            <input type="number"
            className='form-control w-50'
            id='regularPrice'
            name='regularPrice'
            value={regularPrice}
            onChange={onChangeHandler}
            required
            />
            {type==="rent" && <p className='ms-4 mt-2'>$ / Month</p>}
          </div>
        </div>
        {offer && (
          <div className="mb-3 mt-4">
            <label htmlFor="discountedPrice" className='form-label'>Discounted Price : </label>
            <input type="number"
            className='form-control w-50'
            id='discountedPrice'
            name='discountedPrice'
            value={discountedPrice}
            
            required />
            
          </div>
        )}
        <div className="mb-3">
          <label htmlFor="formFile" className='form-label'>
            select images:
          </label>
          <input type="file"
          id='images'
          name='images'
          max='6'
          accept='.jpg,.png,.jpeg'
          multiple
          required   
          onChange={onChangeHandler}       
          />
        </div>
        <div className="mb-3">
          <input type="submit"
           classname="create"
          value="Update Listing"
          disabled={!Name || !location || !regularPrice || !images}
        
          />
        </div>
      </form>
      </div>
    </Layout>
  )
}


export default EditListing