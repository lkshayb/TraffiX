import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MoonLoader } from "react-spinners";

export default function Cctv() {
  function PreviewLocation(props:any){
    const [videoLoaded, setVideoLoaded] = useState(false);
    return (
      <div onClick={() => navigate('/cctv')} className="group cursor-pointer text-white bg-slate-800 flex rounded-lg w-[390px] h-[270px] py-5 px-4 flex flex-col">
        <span className="font-medium text-xl font-[work-sans] mb-4 ml-1">{props.location}</span>
        <div className="overflow-hidden rounded-md relative h-[200px] w-[360px]">
        {!videoLoaded && (
          <div className="absolute inset-0 bg-slate-700/60 animate-pulse flex items-center justify-center text-slate-300 text-sm">
            <MoonLoader size={30} color="#ffffff"/>
          </div>
        )}
        <video 
          className={`h-[200px] w-[360px] group-hover:opacity-70 duration-300 object-cover ${videoLoaded ? 'opacity-100' : 'opacity-0'}`}
          src={props.cctv_preview} 
          muted 
          loop 
          autoPlay 
          preload="metadata"
          onLoadedData={() => setVideoLoaded(true)}
          onError={() => setVideoLoaded(true)}
        />
      </div>
        
      </div>
    )
  }
  const navigate = useNavigate();
  return (
    <div className="bg-gradient-to-tr from-slate-950 to-slate-800 min-h-screen pl-15 pt-25 pb-25 flex justify-start items-center w-[100%]">
      <div className="text-white flex flex-col text-3xl font-semibold font-[work-sans]">
        CCTV Streams
        <span className="text-white/70 font-medium text-lg pt-1">Here you’ll find the live CCTV footage for monitoring traffic and signal status.</span>
      </div>
      <div className="flex gap-4 flex-wrap justify-center ">
        <div onClick={() => navigate('/cctv/1')} ><PreviewLocation location="Uttam Nagar" cctv_preview="./vids/v1.mp4"/></div>
          <div onClick={() => navigate('/cctv/2')}><PreviewLocation location="Rajendra Place" cctv_preview="./vids/v2.mp4"/></div>
          <div onClick={() => navigate('/cctv/3')}><PreviewLocation location="Yamuna Bank Crossing" cctv_preview="./vids/v3.mp4"/></div>
          <div onClick={() => navigate('/cctv/4')}><PreviewLocation location="Shivaji Marg" cctv_preview="./vids/v4.mp4"/></div>
        </div>
    </div>
  )
}


