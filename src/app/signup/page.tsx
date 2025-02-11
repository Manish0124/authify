"use client"
import React, { useEffect, useState } from 'react'

import axios from 'axios'

import {toast} from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function SignupPage() {
   
  const router = useRouter()
  
  const[user,setUser] = useState({
    email : "",
    password : "",
    username : ""
  })

  const[buttonDisabled,setButtonDisabled] = useState(false)

  const[loading,setLoading] = useState(false)

  const onSignup = async ()=>{
    try {

      setLoading(true)
      const response =await axios.post("/api/users/signup/",user)

      console.log("Signup success" ,response.data)

       router.push('/login')
      
    } catch (error:any) {
      console.log("signup failed")
      toast.error(error.message)
    }
  }

  useEffect(()=>{
  if (user.email.length>0&&user.password.length>0&&user.username.length>0) {
    setButtonDisabled(false)
  }
  else{
    setButtonDisabled(true)
  }
  },[user])

  return (

    <div className='flex flex-col items-center justify-center min-h-screen bg-red-300 py-3'  >
           <h1>{loading? "proccessing" : "Signup"}</h1>
           <hr />
           <label htmlFor="username">username</label>
           <input 
            className='p-2 border-gray-200 rounded-lg mb-4 focus:outline-none focus:border-gray-500 text-black '
            id='username'
            value={user.username}
            onChange={(e)=>setUser({...user,username:e.target.value})}
            placeholder='username'
           type="text" />
           <label htmlFor="email">email</label>
           <input
           className='p-2 border-gray-300 rounded-lg mb-4 focus: outline-none focus:border-gray-500 text-black '
           id='email'
           value={user.email}
           onChange={(e)=>setUser({...user,email:e.target.value})}
           placeholder='email'
           type='text'
           />
           <label htmlFor="password">password</label>
           <input
           className='p-2 border-gray-300 rounded-lg mb-4 focus: outline-none focus:border-gray-500 text-black '
           id='password'
           value={user.password}
           onChange={(e)=>setUser({...user,password:e.target.value})}
           placeholder='password'
           />
           <button
            onClick={onSignup}
            className='p-2 border border-gray-300 rounded-lg mb-4 focus:border-none focus:border-gray-600 '
           >{buttonDisabled? "no Signup": "Signup "}</button>
           <Link href={'/login'} >visit login page</Link>
    </div> 

    
  )
}
