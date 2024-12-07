'use client';

import React, {useState, useEffect} from 'react'
import PromptCard from './PromptCard';

const PromptCardList = ({ data, handleTagClick }) =>{
  return (  
    <div className='grid grid-cols-3 co mt-16 space-y-5 space-x-3'>
      {data.map((post)=>(
        <PromptCard 
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  )
}

const Feed = () => {
  const [searchText, setSearchText] = useState('');
  
  const [posts, setPosts] = useState([])
  
  const handleSearchChange = async(e)=>{
    e.target.textContext = e.target.value;
    setSearchText(e.target.value);
  }

  const handleTagClick = async(e)=>{
    const input = document.getElementsByClassName('search_input')[0];
    input.textContext = e;
    setSearchText(e);
  }

  const fetchPosts = async()=>{
    const response = await fetch(`api/prompt${searchText? "?query=" : ""}${searchText}`);
    const data = await response.json();
    setPosts(data);
  }

  useEffect(()=> {
    fetchPosts();
  }, [searchText]);

  return (
    <section className='w-full mt-14'>
      <form className="relative w-full flex justify-center">
        <input 
          type="text" 
          placeholder='Search for a tag or a username'
          value={searchText}
          onChange={handleSearchChange}
          required
          className='search_input w-full max-w-2xl p-3 px-5 rounded-lg shadow-lg shadow-neutral-300'
        />
      </form>
      <PromptCardList
        data={posts}
        handleTagClick={handleTagClick}
      />
    </section>
  )
}

export default Feed