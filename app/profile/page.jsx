"use client";
import { useState, useEffect} from 'react'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Profile from '@/components/Profile';

const MyProfile = () => {
    const { data:session } = useSession();
    const [posts, setPosts] = useState([]);
    const router = useRouter();

    const handleEdit = (post)=>{
        router.push(`/update-prompt?id=${post._id}`)
    }

    const handleDelete = async (post)=>{
        const hasConfirmed = confirm("Are you sure you want to delete this prompt?");
        if (hasConfirmed){
            try {
                const response = await fetch(`/api/prompt/${post._id.toString()}`,
                {
                    method: 'DELETE',
                })

                const filteredPosts = posts.filter((p)=>
                    p._id !== post._id
                );
                setPosts(filteredPosts);
            } catch (error) {
                console.log(error);
            }
        }
    }

    useEffect(()=> {
        const fetchPosts = async()=>{
          const response = await fetch(`api/user/${session?.user.id}/posts`);
          const data = await response.json();
          setPosts(data);
        }

        if (session?.user.id) fetchPosts();

      }, []);

    return (
        <div className='px-6'>
            <Profile
                name={session?.user.id}
                desc="Welcome to profile"
                data={posts}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
            />
        </div>
    )
}

export default MyProfile