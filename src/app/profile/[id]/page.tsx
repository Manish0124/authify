import React from 'react'

export default function page({params}:any) {
  console.log(params.id)
  return (
    <div className=' flex flex-col items-center justify-center min-h-screen py-3' >
      <h1>Profile page</h1>
      
      <h1 className='bg-green-500' > {params.id} </h1>
      </div>
  )
}
