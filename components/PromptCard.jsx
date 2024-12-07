'use client';
import { useState } from "react";
import Image from 'next/image';
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";


const PromptCard = ({post, handleTagClick, handleEdit, handleDelete}) => {
  const {data:session} = useSession();
  const [copied, setCopied] = useState('');
  
  const pathName = usePathname();
  const router = useRouter();

  const handleCopy = ()=>{
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(()=>setCopied(""), 3000);
  }
  
  const handleProfileClick = ()=>{
    router.push(`/profile/${post.creator._id}`);
  }

  return (
    <div className="border border-neutral-200 rounded-md p-5">
      <div className="flex justify-between items-start gap-5">
        {/* creator data */}
        <div className="flex flex-1 justify-start items-center gap-3 cursor-pointer">
          <Image
            src={post.creator.image}
            alt="user image"
            width={40}
            height={40}
            className="rounded-full object-contain"
          />
          {/* name and email */}
          <div className="flex flex-col" onClick={handleProfileClick}>
            <h3 className="font-satoshi font-semibold text-gray-900">
              {post.creator.username}
            </h3>
            <p className="font-inter text-sm text-gray-500">
              {post.creator.email}
            </p>
          </div>
        </div>
        {/* copy button */}
        <div className="p-2 bg-gray-100 rounded-lg" onClick={handleCopy}>
          <Image
            src={copied === post.prompt ? '/assets/icons/tick.svg' : '/assets/icons/copy.svg'}
            alt="copy icon"
            width={12}
            height={12}
          />
        </div>
      </div>

      {/* prompt */}
      <p className="my-4 font-satoshi text-sm text-gray-700">{post.prompt}</p>
      <p className="font-inter text-sm cursor-pointer text-transparent bg-clip-text
       bg-gradient-to-b from-blue-500 to-sky-900" onClick={()=> handleTagClick && handleTagClick(post.tag)}>
        {post.tag}
      </p>

      {session?.user.id === post.creator._id && pathName === '/profile' && (
        <div className="flex justify-center w-full mt-5 gap-5 border-t border-gray-100 pt-3">
          <p className="font-inter text-sm cursor-pointer text-transparent bg-clip-text
          bg-gradient-to-r from-emerald-400 to-green-500" onClick={handleEdit}>
            Edit
          </p>
          <p className="font-inter text-sm cursor-pointer text-transparent bg-clip-text
          bg-gradient-to-r from-amber-400 to-orange-500" onClick={handleDelete}>
            Delete
          </p>
        </div>
      )}
    </div>
  )
}

export default PromptCard