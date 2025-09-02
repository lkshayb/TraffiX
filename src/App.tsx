
import './App.css'
import { Link, Route, Routes, Navigate } from 'react-router-dom'
import { BellIcon, UserRound, ArrowLeftToLine } from 'lucide-react'
import Dashboard from './pages/Dashboard.tsx'
import Cctv from './pages/Cctv.tsx'
import PageNotFound from './pages/PageNotFound.tsx'
import { useState } from 'react'
function App() {
  const [collapse, setCollapse] = useState(true)
  return (
    <div>
      <div className='flex h-screen bg-background'>
        <div className={`flex  bg-slate-950 text-white border-r-3 border-white/50 ${collapse ? 'w-1/20' : 'w-1/6'} transition-all duration-300`}>
          <div>
            <div onClick={() => setCollapse(!collapse)} className='flex px-2 py-2 h-10 min-w-10 hover:bg-slate-800 rounded-md ml-4 mt-6 items-center justify-around cursor-pointer gap-5 items-center'>
              <ArrowLeftToLine className={`${collapse ? 'rotate-180' : ''} transition-all duration-300`} /> 
              <span className={`${collapse ? 'hidden' : ''} text-2xl font-bold`}>Menu</span>
            </div>
          </div>
          
          
        </div>
        <div className='flex-1 overflow-auto'>
          <nav className='flex items-center justify-between p-6 border-b border-border bg-blue-950/100 text-white border-b-3 border-white/50'>
            <div className='text-2xl font-semibold'>TrafficAI</div>
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
