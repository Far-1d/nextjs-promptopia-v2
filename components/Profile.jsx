'use client'
import React, { useEffect, useState } from 'react'
import PromptCard from './PromptCard'

const Profile = ({id, desc, data, handleEdit, handleDelete}) => {
    const [user, setUser] = useState({})
    const getUser = async ()=>{
      const response = await fetch(`/api/user/${id}`);
      setUser( await response.json());
    }
    
    useEffect(() => {
      if (id) getUser();
    }, [])
    
    return (
      <section className='w-full'>
        <h1 className='text-transparent bg-clip-text 
        bg-gradient-to-r from-cyan-600 to-sky-500 text-5xl font-bold'>
          <span className=''>{user.username}'s profile</span>
        </h1>
        <p className='text-left'>{desc}</p>

        <div className='mt-16 space-y-5'>
          {data.map((post)=>(
            <PromptCard 
              key={post._id}
              post={post}
              handleEdit={()=> handleEdit && handleEdit(post)}
              handleDelete={()=> handleDelete && handleDelete(post)}
            />
          ))}
        </div>

      </section>
    )
}

export default Profile