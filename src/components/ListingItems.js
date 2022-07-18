import React from 'react'
import { Link } from 'react-router-dom';
import {RiHotelBedFill} from 'react-icons/ri'
import {FaBath} from 'react-icons/fa'
import "../style/listingItems.css"
const ListingItems = ({listing,id,onDelete,onEdit}) => {
  return (
   <>
   <div className='main d-flex align-items-center justify-content-center ' >
   <div className="head  category-link mb-7 " style={{width:'800px'}}>
   <Link to={`/Category/${listing.type}/${id}`}>
       <div className="card-container row container p-2">
           
           <div className="item-1 col-md-5">
               <img src={listing.imgUrl[0]} 
               className='img-thumnail'
               alt={listing.name} height={200} width={200}/>
           </div>
           <div className="item-2 col-md-5 ">
            <h2>{listing.Name}</h2>
            <p>{listing.location}</p>
            
            <p>rs: {listing.offer ? listing.offerPrice : listing.regularPrice}
            {listing.type==='rent' && '/Month'}</p>
            <p>
                <RiHotelBedFill/> &nbsp;
                {listing.bedrooms >1 ? `${listing.bedrooms} Bedrooms` : '1 Bedroom'}</p>
            <p>
                <FaBath/> &nbsp;
                {listing.bathrooms >1 ? `${listing.bathrooms} Bathrooms` : '1 bathrooms'}</p>
           
           </div>
          
           
       </div>
       
       </Link>

       
   </div>
   
   </div>
   <div className='deleteEdit  '>
           {
                onDelete && (
                    <button className='deleteList btn ' onClick={() => {onDelete(listing.id,listing.Name)}}>Delete Listing</button>
                )
            }
            {
                onEdit && (
                    <button className='editList btn ' onClick={() => {onEdit(listing.id)}}>Edit Listing</button>
                )
            }
           </div>
   
   </>
  )
}

export default ListingItems;