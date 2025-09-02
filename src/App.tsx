
import './App.css'
import { Link, Route, Routes,  useNavigate } from 'react-router-dom'
import { BellIcon, UserRound, ArrowLeftToLine } from 'lucide-react'
import Dashboard from './pages/Dashboard.tsx'
import Cctv from './pages/Cctv.tsx'
import PageNotFound from './pages/PageNotFound.tsx'
import { useState } from 'react'
function App() {
  const [collapse, setCollapse] = useState(true);
  const navigate = useNavigate();
  return (
    <div className='font-[work-sans]'>
      <div className='flex h-screen bg-background'>
        <div className={`flex  bg-slate-950 text-white border-r-3 border-white/50 ${collapse ? 'w-1/20' : 'w-1/6'} transition-all duration-300`}>
          <div className='w-full'>
            <div onClick={() => setCollapse(!collapse)} className='flex px-2 py-2 hover:bg-slate-800 duration-300 bg-slate-900 rounded-md mx-4 mt-4 cursor-pointer gap-5 items-center'>
              <ArrowLeftToLine className={`${collapse ? 'rotate-180' : ''} transition-all duration-300`} /> 
              <span className={`${collapse ? 'hidden' : ''} text-2xl font-bold`}>Menu</span>
            </div>
          </div>
          
          
        </div>
        <div className='flex-1 overflow-auto'>
          <nav className='flex items-center justify-between px-6 py-4 border-b border-border bg-[#1E293B] text-white border-b-3 border-white/50'>
            <div className='text-3xl font-semibold cursor-pointer' onClick={() => navigate('/')} >Traffi<span className='text-4xl font-bold text-[#EF4444]'>X</span></div>
              <div className='flex gap-8'>
                <BellIcon/>
                <UserRound/>
                
              </div>
          </nav>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/  cctv" element={<Cctv />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </div>
        
      </div>
      
    </div>
  )
}

export default App
