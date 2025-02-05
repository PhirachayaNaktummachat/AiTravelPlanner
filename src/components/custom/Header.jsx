import React, { useEffect, useState } from 'react'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { googleLogout } from '@react-oauth/google';
import { useNavigate, useNavigation } from 'react-router-dom';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { X } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
function Header() {

  const user=JSON.parse(localStorage.getItem('user'));
  const [openDailog,setOpenDailog]=useState(false);

  useEffect(()=>{
    console.log(user)
  },[])

  const login=useGoogleLogin({
    onSuccess:(codeResp)=>GetUserProfile(codeResp),
    onError:(error)=>console.log(error)
  })

  const GetUserProfile = (tokenInfo) => {
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?acess_token=${tokenInfo?.access_token}`, {
      headers: {
        Authorization: `Bearer ${tokenInfo?.access_token}`,
        Accept: 'Application/json'
      }
    }).then((resp) => {
      console.log(resp);
      localStorage.setItem('user',JSON.stringify(resp.data));
      setOpenDailog(false);
      window.location.reload()
    })
  }

  return (
    <div className='p=2 shadow-sm flex justify-between items-center'>
      <img src='/logo.svg'/>
      
      <div>
        {user ?
        <div className='flex item-center gap-3 p-1'>
          <a href='/create-trip'>
          <button variant='outline' className='rounded-full border border-gray-200 p-2 hover:bg-gray-50 text-black cursor-pointer'>
            Create Trip
        </button>
        </a>
          <a href='/my-trips'>
          <button variant='outline' className='rounded-full border border-gray-200 p-2 hover:bg-gray-50 text-black cursor-pointer'>
            My Trips
        </button>
        </a>
        {/* <img src={user?.picture} className='h-[35px] w-[35px] rounded-full'/> */}
        
        <Menu as="div" className="relative inline-block text-left">
              <div>
              <MenuButton className="inline-flex justify-center items-center p-0 cursor-pointer">
  <img src={user?.picture} alt="Profile" className='h-[35px] w-[35px] rounded-full items-center mt-1' />
</MenuButton>
              </div>

              <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white ring-1 shadow-lg ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in">
                <div className="py-1">
                    <MenuItem>
                      <button
                        onClick={()=>{
                          googleLogout();
                          localStorage.clear();
                          window.location.reload();
                        }}
                        className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900">
                        Sign out
                      </button>
                    </MenuItem>
                </div>
              </MenuItems>
            </Menu>
        </div>
        :
        <button onClick={()=>setOpenDailog(true)}
        className="rounded-md  bg-black px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-gray-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black">
        sign in
        </button>
        
        }
      
      </div>
      <Dialog open={openDailog} onClose={setOpenDailog}>
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
          >
            {/* 🔹 ปุ่มกากบาท (X) ปิด Dialog */}
            <button
          onClick={() => setOpenDailog(false)}
          className="absolute top-2 right-0 text-gray-500 hover:text-black"
        >
          <X size={24} strokeWidth={2} /> {/* ไอคอน X แบบบาง */}
        </button>
        
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className=" text-center sm:mt-0 sm:ml-4 sm:text-left">
                  {/* <DialogTitle as="h3" className="text-base font-semibold text-gray-900">
                    Deactivate account
                  </DialogTitle> */}
                  <div>
                    <img src="/logo.svg"/>
                    <h2 className='font-bold text-lg mt-5'>Sign in with google</h2>
                    <p>Sign in to the App with Google authentication</p>
                    
                  </div>
                </div>
              </div>
            </div>
            <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                
                type="button"
                onClick={login}
                className="w-full flex items-center justify-center gap-4 rounded-md px-3 py-2 text-sm font-semibold text-white shadow-xs  sm:w-full bg-black" >
                <FcGoogle className='w-7 h-7'/>
                Sign in with Google
              </button>
              
            </div>
          </DialogPanel>
        </div>
      </div>
      </Dialog>
    </div>
  )
}

export default Header