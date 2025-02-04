import React from 'react'
import { Link } from 'react-router-dom'

function PlaceCardItem({place}) {
  return (
    <Link to={'https://www.google.com/maps/search/?api=1&query='+place.placeName} target='_blank'>
   
    <div className='border rounded-xl p-3 border-gray-200 mt-2 flex gap-5 hover:scale-105 transition-all hover:shadow-md cursor-point'>
        <img src='/placeholder.jpg'
        className='w-[120px] h-[100px] rounded-xl'/>
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