import Link from 'next/link';

const Form = ({
  type,
  post,
  setPost,
  submitting,
  handleSubmit

}) => {
  return (
    <section className='w-full max-w-full flex-start flex-col'>
      
      <h1 className='text-left text-3xl'>
        <span className='text-transparent bg-clip-text 
        bg-gradient-to-r from-cyan-600 to-sky-500 text-5xl font-bold'>
          {type} Post
        </span>
      </h1>

      <p className='text-left max-w-md py-2'>
        {type} and share amazing prompts with the world, and let your imagination run wild with any AI-powered platform.
      </p>

      <form 
        onSubmit={handleSubmit}
        className='mt-10 w-full max-w-2xl p-4 px-6 flex flex-col gap-7 bg-slate-500 
        bg-clip-padding backdrop-filter  backdrop-blur bg-opacity-10 backdrop-saturate-100 backdrop-contrast-100'
      >
        <label htmlFor="prompt-area" className='flex flex-col'>
          <span className='font-satoshi font-semibold text-base text-gray-700'>
            Your AI Prompt
          </span>

          <textarea
            id='prompt-area'
            value={post.prompt}
            onChange={(e)=>setPost({...post, prompt:e.target.value})}
            placeholder='Write your prompt here...'
            className='rounded-lg mt-2 p-2 min-h-32'
            cols={6}
          />
        </label>

        <label htmlFor="input-tag" className='flex flex-col'>
          <span className='font-satoshi font-semibold text-base text-gray-700'>
            Tag  {` `}
            <span className='font-normal'>(productive, idea, dev)</span>
          </span>

          <input
            id='input-tag'
            value={post.tag}
            onChange={(e)=>setPost({...post, tag:e.target.value})}
            placeholder='#tag'
            className='rounded-lg mt-2 p-2 py-3'
          />
        </label>

        <div className='flex justify-end items-center mx-3 mb-5 gap-4'>
          <Link href={'/'} className='text-gray-500 text-sm'>
            Cancel
          </Link>
          <button 
            type="submit"
            disabled={submitting}
            className='px-5 py-1.5 text-sm bg-orange-500 rounded-full text-white'
          >
            {submitting? `${type}...`: type}
          </button>
        </div>
      </form>
    </section>
  )
}

export default Form