import { useNavigate } from 'react-router-dom'
import {TicketX} from 'lucide-react'
export default function PageNotFound() {
    const navigate = useNavigate()
    return (
      <div className="bg-gradient-to-tr from-slate-950 to-slate-800 min-h-screen pt-25 pb-25 flex justify-center items-center w-[100%] flex-col" >
        <TicketX color='red' className='scale-300 mb-8'/>
        <span className='text-5xl font-bold text-white'>Page Not Found</span>
        <p className='mt-3 text-xl text-[#6B7280]'>Looks like we couldn't find what you were looking for.</p>
        <button className='bg-[#3B82F6] p-3 text-white rounded-xl mt-10 cursor-pointer hover:bg-[#2563EB] duration-300' onClick={() => navigate('/')}>Return to Home</button>
      </div>
    )
  }
  
  
  