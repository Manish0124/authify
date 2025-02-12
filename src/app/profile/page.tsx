"use client"
import React, { useState } from 'react'
import axios from 'axios'
import {toast} from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function ProfilePage() {
    const router = useRouter();
    const [data,setData] = useState("nothing")

    const getUserDetails = async()=>{
      const res = await axios.post('/api/users/me')
      console.log(res.data.data._id);
      setData(res.data.data._id)
    }

    const logOut = async ()=>{
       try {
         const res = await axios.get('/api/users/logout')
         console.log(res);
         toast.success("logout successfully");
         router.push("/login")
         
       } catch (error:any) {
         console.log(error.message);
         toast.error(error.message)
       }
        
    }

  return (
    <div className='flex items-center flex-col justify-center min-h-screen p-2' >
      <h1>Profile page</h1>
      <hr />
      <h2>{data==="nothing"? "Nothing": <Link href={`/profile/${data}`} >{data}</Link> }</h2>
      <hr />
      <button onClick={logOut} className='bg-blue-500 hover:bg-blue-700 mt-4 px-4 py-2 rounded-md font-bold ' >logout</button>
      <button onClick={getUserDetails} className='bg-green-500 hover:bg-green-700 mt-4 px-4 py-2 rounded-md font-bold ' >Details</button>

      </div>
  )
}
