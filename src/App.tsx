
import './App.css'
import { Link, Route, Routes,  useNavigate } from 'react-router-dom'
import { BellIcon, UserRound, ArrowLeftToLine ,LayoutDashboard,ScanEye,CarFront,MessageSquareWarning,OctagonMinus} from 'lucide-react'
import Dashboard from './pages/Dashboard.tsx'
import Reports from './pages/reports.tsx'
import Signal_Controls from './pages/signal-control.tsx'
import Traffic_Analysis from './pages/traffic-analysis.tsx'
import Cctv from './pages/Cctv.tsx'
import PageNotFound from './pages/PageNotFound.tsx'
import {  useState } from 'react'
function App() {
  const [collapse, setCollapse] = useState(false);

  
  const navigate = useNavigate();
  return (
    <div className='font-[work-sans]'>
      <div className='flex h-screen bg-background'>
        <div className={`flex  bg-slate-950 text-white border-r-2 border-slate-600/50 ${collapse ? 'w-1/20' : 'w-1/6'} transition-all duration-300`}>
          <div className='w-full flex flex-col overflow-auto'>
            <div onClick={() => setCollapse(!collapse)} className='flex px-2 py-2 min-w-60 mx-[8px] hover:bg-slate-800 duration-300  rounded-md  mt-4 cursor-pointer gap-5 items-center h-14 pl-4'>
              <ArrowLeftToLine  className={`${collapse ? 'rotate-180' : ''} transition-all duration-300`} /> 
              <span className={`${collapse ? 'hidden' : ''} text-2xl font-bold`}>Menu</span>
            </div>

            <Link to="/">
              <div className={'flex px-2 py-2 hover:bg-slate-800 duration-300 rounded-md min-w-60 mx-[8px] pl-4 mt-30 cursor-pointer gap-5 items-center h-14'}>
                <LayoutDashboard  /> 
                <span className={`${collapse ? 'hidden' : ''} text-xl font-medium`}>Dashboard</span>
              </div>
            </Link>
            

            <Link to="/cctv">
              <div className={'flex px-2 py-2 hover:bg-slate-800 duration-300 rounded-md min-w-60 mx-[8px] mt-3 pl-4 cursor-pointer gap-5 items-center h-14'}>
                <ScanEye  /> 
                <span className={`${collapse ? 'hidden' : ''} text-xl font-medium`}>CCTV Streams</span>
              </div>
            </Link>
            

            <Link to="/traffic-analysis">
              <div className={'flex px-2 py-2 hover:bg-slate-800 duration-300  rounded-md min-w-60 mx-[8px] mt-3 pl-4 cursor-pointer gap-5 items-center h-14'}>
                <CarFront  /> 
                <span className={`${collapse ? 'hidden' : ''} text-xl font-medium`}>Traffic Analysis</span>
              </div>
            </Link>
            

            <Link to="/signal-control">
              <div className={'flex px-2 py-2 hover:bg-slate-800 duration-300  rounded-md  min-w-60 mx-[8px] mt-3 pl-4 cursor-pointer gap-5 items-center h-14'}>
                <OctagonMinus  /> 
                <span className={`${collapse ? 'hidden' : ''} text-xl font-medium`}>Signal Controls</span>
              </div>
            </Link>

            <Link to="/reports">
              <div className={'flex px-2 py-2 hover:bg-slate-800 duration-300  rounded-md min-w-60 mx-[8px] mt-3 pl-4 cursor-pointer gap-5 items-center h-14'}>
                <MessageSquareWarning  /> 
                <span className={`${collapse ? 'hidden' : ''} text-xl font-medium`}>Reports</span>
              </div>
            </Link>

          </div>
          
          
        </div>
        <div className='flex-1 overflow-auto position-relative'>
          <nav className={` flex items-center justify-between position-absolute z-2 fixed top-0 w-full  px-6 py-4 bg-slate-800/50 backdrop-blur-2xl  text-white border-b-1 border-slate-600/50`}>
            <div className='text-3xl font-semibold cursor-pointer' onClick={() => navigate('/')} >Traffi<span className='text-4xl font-bold text-[#EF4444]'>X</span></div>
              <div className='flex gap-8'>
                <BellIcon/>
                <UserRound/>
                
              </div>
          </nav>
          <Routes>
            <Route path="/" element={<Dashboard collapsed={collapse}/>} />
            <Route path="/cctv" element={<Cctv />} />
            <Route path="/traffic-analysis" element={<Traffic_Analysis />} />
            <Route path="/signal-control" element={<Signal_Controls />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </div>
        
      </div>
      
    </div>
  )
}

export default App
