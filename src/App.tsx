
import './App.css'
import { Link, Route, Routes,  useNavigate,useLocation  } from 'react-router-dom'
import { BellIcon, UserRound ,LayoutDashboard,ScanEye,CarFront,MessageSquareWarning,OctagonMinus,PanelRightClose,PanelRightOpen} from 'lucide-react'
import Dashboard from './pages/Dashboard.tsx'
import Reports from './pages/reports.tsx'
import Signal_Controls from './pages/signal-control.tsx'
import Traffic_Analysis from './pages/traffic-analysis.tsx'
import Cctv from './pages/Cctv.tsx'
import PageNotFound from './pages/PageNotFound.tsx'
import {  } from 'react'
function App() {
  
  const navigate = useNavigate();
  const location = useLocation();
  const currentPathname = location.pathname;
  console.log(currentPathname)
  return (
    <div className='font-[work-sans]'>
      <div className='md:flex hidden h-screen bg-background'>
        <div className={` group flex  bg-slate-950 text-white border-r-2 border-slate-600/50   hover:w-1/6 w-1/20 transition-all duration-300`}>
          <div className='w-full flex flex-col overflow-auto'>
            <div className='flex px-2 py-2 min-w-60 mx-[8px] hover:bg-slate-800 duration-300  rounded-md  mt-4 cursor-pointer gap-5 items-center h-14 pl-4'>
              <PanelRightClose  className={`group-hover:hidden flex transition-all duration-300`} />
              <PanelRightOpen  className={`group-hover:flex hidden transition-all duration-300`} />
              <span className={`group-hover:block hidden text-2xl font-bold`}>Menu</span>
            </div>

            <Link to="/">
              <div className={`flex px-2 py-2 hover:bg-slate-800 ${currentPathname == "/" ? "bg-slate-900" : ""} duration-300 rounded-md min-w-60 mx-[8px] pl-4 mt-30 cursor-pointer gap-5 items-center h-14`}>
                <LayoutDashboard  /> 
                <span className={`group-hover:block hidden text-xl font-medium`}>Dashboard</span>
              </div>
            </Link>
            

            <Link to="/cctv">
              <div className={`${currentPathname == "/cctv" ? "bg-slate-900" : ""} flex px-2 py-2 hover:bg-slate-800 duration-300 rounded-md min-w-60 mx-[8px] mt-3 pl-4 cursor-pointer gap-5 items-center h-14`}>
                <ScanEye  /> 
                <span className={`group-hover:block hidden text-xl font-medium`}>CCTV Streams</span>
              </div>
            </Link>
            

            <Link to="/traffic-analysis">
              <div className={`${currentPathname == "/traffic-analysis" ? "bg-slate-900" : ""} flex px-2 py-2 hover:bg-slate-800 duration-300  rounded-md min-w-60 mx-[8px] mt-3 pl-4 cursor-pointer gap-5 items-center h-14`}>
                <CarFront  /> 
                <span className={`group-hover:block hidden text-xl font-medium`}>Traffic Analysis</span>
              </div>
            </Link>
            

            <Link to="/signal-control">
              <div className={`${currentPathname == "/signal-control" ? "bg-slate-900" : ""} flex px-2 py-2 hover:bg-slate-800 duration-300  rounded-md  min-w-60 mx-[8px] mt-3 pl-4 cursor-pointer gap-5 items-center h-14`}>
                <OctagonMinus  /> 
                <span className={`group-hover:block hidden text-xl font-medium`}>Signal Controls</span>
              </div>
            </Link>

            <Link to="/reports">
              <div className={`${currentPathname == "/reports" ? "bg-slate-900" : ""} flex px-2 py-2 hover:bg-slate-800 duration-300  rounded-md min-w-60 mx-[8px] mt-3 pl-4 cursor-pointer gap-5 items-center h-14`}>
                <MessageSquareWarning  /> 
                <span className={`group-hover:block hidden text-xl font-medium`}>Reports</span>
              </div>
            </Link>

          </div>
          
          
        </div>
        <div className='flex-1 overflow-auto position-relative'>
          <nav className={`flex items-center justify-between sticky mb-[-70px] top-0 w-full z-20 pl-6 pr-6 py-4 bg-slate-800/50 backdrop-blur-2xl text-white border-b-1 border-slate-600/50`}>
            <div className='text-3xl font-semibold cursor-pointer' onClick={() => navigate('/')} ><img src="./logo.png" alt="TraffiX" className='h-10' /></div>
              <div className={`flex gap-8 transition-all duration-300`}>
                <BellIcon/>
                <UserRound/>
                
              </div>
          </nav>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/cctv" element={<Cctv />} />
            <Route path="/traffic-analysis" element={<Traffic_Analysis />} />
            <Route path="/signal-control" element={<Signal_Controls />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </div>
        
      </div>
      <div className='h-screen flex flex-col text-xl justify-center items-center md:hidden'>
        PLEASE VIEW ON PC
        <span className='text-gray-600 text-sm'>Mobile Screens Currently not Supported</span>
      </div>
    </div>
  )
}

export default App
