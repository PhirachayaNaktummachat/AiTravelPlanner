import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { GetPlaceDetails, PHOTO_REF_URL } from '../../service/GlobalApi';

function PlaceCardItem({place}) {
    const [photoUrl,setPhotoUrl]=useState();
          useEffect(()=>{
            place&&GetPlacePhoto();
          },[place])
        
        
          const GetPlacePhoto=async()=>{
            const data={
              textQuery:place.placeName
            }
            const result=await GetPlaceDetails(data).then(resp=>{
        
              const PhotoUrl=PHOTO_REF_URL.replace('{NAME}',resp.data.places[0].photos[3].name);
              setPhotoUrl(PhotoUrl);
            })
          }

  return (
    <Link to={'https://www.google.com/maps/search/?api=1&query='+place.placeName} target='_blank'>
   
    <div className='border rounded-xl p-3 border-gray-200 mt-2 flex gap-5 hover:scale-105 transition-all hover:shadow-md cursor-point'>
        <img src={photoUrl?photoUrl:'/placeholder.jpg'}
        className='w-[120px] h-[100px] rounded-xl object-cover'/>
        <div>
            <h2 className='text-md font-bold text-black'>{place.placeName}</h2>
            <p className='text-sm text-gray-400'>{place.placeDetails}</p>
            <h2 className='mt-2 text-black'>🕙{place.timeToTravel}</h2>
        </div>
    </div>
    </Link>
  )
}

export default PlaceCardItem