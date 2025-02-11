'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import Link from 'next/link'


export default function VerifyemailPage() {
  const[token,setToken] = useState("")
  const[verify,setVerify] = useState(false)
  const[error,setError] = useState(false) 

  // const router = useRouter();

  const verifyEmail = async()=>{
     try {
       await axios.post('/api/users/verifyemail', {token})
       setVerify(true)
       setError(false)
     } catch (error:any) {
       setError(true)
       console.log(error.response.data);
       
     }
  }

  useEffect(()=>{
    setError(false)
    const urlToken = window.location.search.split("=")[1]
    console.log(urlToken);
    setToken(urlToken||"")
   
    //wether take it above or below

    // const{query} = router;
    // const urlTokenTwo =  query.token 
    
  },[])

  useEffect(()=>{
    setError(false)
    if (token.length>0) {
      verifyEmail()
    }
  },[token])

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2 ' >
     
     <h1  className='text-4xl ' >Verify Email</h1>
     <h2  className=' p-2 bg-orange-500 text-black  ' >{token?`${token}`: "no token"}</h2>

     { verify && (
      <div><h2>verified</h2>
      <Link href={"/login"} >login</Link>
      </div>
     ) }
     { error && (
      <div><h2>error</h2>
      </div>
     ) }

    </div>
  )
}
