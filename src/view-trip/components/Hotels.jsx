import React from 'react'
import { Link } from 'react-router-dom'

function Hotels({trip}) {
  return (
    <div>
        <h2 className='font-bold text-xl mt-5 mb-3'>Hotel Recommendation</h2>
        
        <div className='grid grid-cols-2 md:grid-cols-4 lg:grig-cols-5 gap-5'>
            {trip?.tripData?.hotels?.map((hotel,index)=>(
                <Link key={index} to={'https://www.google.com/maps/search/?api=1&query='+hotel?.hotelName+","+hotel?.hotelAddress} target='_blank'>
                <div className='hover:scale-105 transition-all'>
                    <img src="/placeholder.jpg" className='rounded-lg' />
                    <div className='my-2 flex flex-col gap-2'>
                        <h2 className='font-medium text-black'>{hotel?.hotelName}</h2>
                        <h2 className='text-xs text-gray-500'>📍 {hotel?.hotelAddress}</h2>
                        <h2 className='text-sm text-black'>💰 {hotel?.price}</h2>
                        <h2 className='text-sm text-black'>⭐ {hotel?.rating}</h2>

                    </div>
                </div>
                </Link>

            ))}
        </div>
        
    
    </div>

    
  )
}

export default Hotels