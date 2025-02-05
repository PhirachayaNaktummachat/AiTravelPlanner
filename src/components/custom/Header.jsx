import React, { useEffect } from 'react'

function Header() {

  const user=JSON.parse(localStorage.getItem('user'));

  useEffect(()=>{
    console.log(user);
  },[])

  return (
    <div className='p=2 shadow-sm flex justify-between items-center'>
      <img src='/logo.svg'/>
      <div>
      <a className="rounded-md  bg-black px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-gray-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black">
        Sign in
      </a>
      </div>
    </div>
  )
}

export default Header