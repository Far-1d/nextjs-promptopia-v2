"use client";
import { useState, useEffect} from 'react'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Profile from '@/components/Profile';

const MyProfile = ({params}) => {
    const { data:session } = useSession();
    const [posts, setPosts] = useState([]);
    const router = useRouter();
    const userId = params.id;

    useEffect(()=> {
        const fetchPosts = async()=>{
            // if (session?.user._id == userId) router.push('/profile');

            const response = await fetch(`/api/user/${userId}/posts`);
            const data = await response.json();
            setPosts(data);
        }

        if (userId) fetchPosts();

      }, []);

    return (
        <div className='px-6'>
            <Profile
                id={userId}
                desc="Welcome to profile"
                data={posts}
                handleEdit={()=>{}}
                handleDelete={()=>{}}
            />
        </div>
    )
}

export default MyProfile