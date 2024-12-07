'use client';
import React, {useState, useEffect} from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {signIn, signOut, useSession, getProviders} from 'next-auth/react';


const Nav = () => {
  const { data:session } = useSession();
  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);

  useEffect(() => {
    const setUpProviders = async()=>{
      const response = await getProviders(); 
      setProviders(response);
    }
    setUpProviders();
  }, [])
  

  return (
    <nav className='flex justify-between w-full mb-14 pt-3 px-6'>
      <Link href='/' className='flex gap-2 flex-center'>
        <Image 
          src={'/assets/logo.svg'}
          height={45}
          width={45}
          alt='promptopia logo'
          className='text-orange-500 object-contain'
          style={{color: '#f97316'}}
        />
        <p className='text-orange-500 hidden sm:block font-semibold text-center py-3 text-lg'>
          Promptopia
        </p>
      </Link>

      {/* Desktop Navigation */}
      <div className='sm:flex hidden items-center justify-center gap-1'>
        {session ? (
          <div className='flex gap-3 md:gap-5'>
            <Link href="/create-prompt" 
            className='px-6 py-[5px] h-[36px] text-base text-center text-neutral-300 bg-black rounded-full'>
              Create Post
            </Link>
            <button type="button" onClick={signOut} 
            className='px-6 py-[5px] h-[36px] border border-neutral-600 rounded-full text-center '>
              Sign out
            </button>
            
            <Link href="/profile">
              <Image 
                src={session?.user.image}
                height={37}
                width={37}
                className='rounded-full'
                alt='profile image'
              />
            </Link>
          </div>
        ) : (
          <>
            {providers && 
              Object.values(providers).map((provider)=>(
                <button
                  type='button'
                  key={provider.name}
                  onClick={()=> signIn(provider.id)}
                  className='bg-black rounded-full py-2 px-8 border border-black 
                  text-neutral-400 hover:bg-white hover:text-neutral-900 duration-200'
                >
                  Sign In with {provider.name}
                </button>
              ))
            }
          </>
        )}
      </div>

        {/* Mobile Navigation */}
      <div className='sm:hidden flex relative'>
        {session ? (
          <div className='flex'>
            <Image 
                src={session?.user.image}
                height={37}
                width={37}
                className='rounded-full'
                alt='profile image'
                onClick={()=> setToggleDropdown((prev)=> !prev)}
              />
              {toggleDropdown && (
                <div className='absolute w-[32vw] h-[19vh] top-8 -left-28 bg-white rounded-lg
                 px-5 py-2 text-sm text-right'>
                  <Link href="/profile" 
                  className='block mt-1'
                  onClick={()=> setToggleDropdown((false))}>
                    My Profile
                  </Link>
                  <Link href="/create-prompt" 
                  className='block mt-1'
                  onClick={()=> setToggleDropdown((false))}>
                    Create Prompt
                  </Link>
                  <button 
                    type='button'
                    onClick={()=> {
                      setToggleDropdown(false);
                      signOut();
                    }}
                    className="mt-6 w-full h-8 text-base text-centertext-neutral-300 bg-black text-white
                     rounded-full hover:bg-white hover:text-black duration-200 border border-neutral-950"
                    >
                  Sign Out
                  </button>
                </div>
              )}
          </div>
        ) : (
          <>
            {providers && 
              Object.values(providers).map((provider)=>(
                <button
                  type='button'
                  key={provider.name}
                  onClick={()=> signIn(provider.id)}
                  className='bg-black rounded-full py-2 px-8 border border-black 
                  text-neutral-400 hover:bg-white hover:text-neutral-900 duration-200'
                >
                  <Image
                  src= {`/${provider.name}.png`}
                  alt= {`${provider.name}'s logo`}
                  width={35}
                  height={35}
                  />
                </button>
              ))
            }
          </>
        )}
      </div>
    </nav>
  )
}

export default Nav