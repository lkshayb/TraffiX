import { useNavigate } from 'react-router-dom'

export default function PageNotFound() {
    const navigate = useNavigate()
    return (
      <div className='flex flex-col justify-center items-center h-full bg-[#F9FAFB]'>
        <span className='text-5xl font-bold text-[#111827]  '>Page Not Found</span>
        <p className='mt-3 text-xl text-[#6B7280]'>Looks like we couldn't find that.</p>
        <button className='bg-[#3B82F6] p-3 text-white rounded-xl mt-10 cursor-pointer hover:bg-[#2563EB] duration-300' onClick={() => navigate('/')}>Return to Home</button>
      </div>
    )
  }
  
  
  