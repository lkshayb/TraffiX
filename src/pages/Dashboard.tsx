"use client";
import { ChevronDown, ExternalLink } from "lucide-react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { useEffect,useRef, useState} from "react";
import { ResponsiveContainer, Area,Tooltip, AreaChart} from "recharts";
import { useNavigate } from "react-router-dom";

function loadGoogleMaps(callback: () => void) {
  if (window.google && window.google.maps) {
    callback();
    return;
  }

  const existingScript = document.getElementById("googleMaps");
  if (existingScript) {
    existingScript.addEventListener("load", callback);
    return;
  }

  const script = document.createElement("script");
  script.id = "googleMaps";
  script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyB41DRUbKWJHPxaFjMAwdrzWzbVKartNGg&libraries=visualization`;
  script.async = true;
  script.defer = true;
  script.onload = callback;
  document.body.appendChild(script);
}



function PreviewLocation(props:any){
  
  return (
    <div  className="group cursor-pointer text-white bg-slate-800 flex rounded-lg w-[390px] h-[270px] py-5 px-4 flex flex-col">
      <span className="font-medium text-xl font-[work-sans] mb-4 ml-1">{props.location}</span>
      <div className="overflow-hidden rounded-md">
        <video className=" h-[200px] w-[360px] group-hover:opacity-70 duration-300 object-cover" src={props.cctv_preview} muted loop autoPlay />
      </div>
      
    </div>
  )
}

function TrafficDensityMap(){
  const heatMapRef = useRef<HTMLDivElement | null>(null);
  const lineMapRef = useRef<HTMLDivElement | null>(null);
  const mapInstance = useRef<maplibregl.Map | null>(null);
  const [activemap,setactivemap] = useState("maplibre");
  const data = [
      { time: "00:00", congestion: 80 },
      { time: "01:00", congestion: 60 },
      { time: "02:00", congestion: 70 },
      { time: "03:00", congestion: 40 },
      { time: "04:00", congestion: 10 },
      { time: "05:00", congestion: 99 },
      { time: "06:00", congestion: 75 },
      { time: "07:00", congestion: 81 },
      { time: "08:00", congestion: 50 },
      { time: "09:00", congestion: 35 },
      { time: "10:00", congestion: 20 },
      { time: "11:00", congestion: 65 },
      { time: "12:00", congestion: 90 },
      { time: "13:00", congestion: 55 },
      { time: "14:00", congestion: 72 },
      { time: "15:00", congestion: 30 },
      { time: "16:00", congestion: 85 },
      { time: "17:00", congestion: 60 },
      { time: "18:00", congestion: 95 },
      { time: "19:00", congestion: 40 },
    ];
  useEffect(() => {
    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, []);

  
  const navigate = useNavigate();

  

  useEffect(() => {
    loadGoogleMaps(() => {
      if (!heatMapRef.current) return;
  
      const map = new google.maps.Map(heatMapRef.current, {
        zoom: 12,
        center: { lat: 28.6139, lng: 77.209 },
      });
  
      const heatmap = new google.maps.visualization.HeatmapLayer({
        data: [
          new google.maps.LatLng(28.6139, 77.209),
          new google.maps.LatLng(28.65, 77.15),
          new google.maps.LatLng(28.6, 77.25),
        ],
        map,
      });
  
      heatMapRef.current = heatmap;
    });
  })
  useEffect(() => {
    loadGoogleMaps(() => {
      if (!lineMapRef.current) return;

      const map = new google.maps.Map(lineMapRef.current, {
        zoom: 12,
        center: { lat: 28.6139, lng:77.2090}, 
        mapTypeControl: false,
        zoomControl: false,
        streetViewControl: false,
        fullscreenControl: false,
        rotateControl: false, 
        styles: [
            {
              featureType: "poi",       // POI = Points of Interest (shops, restaurants, etc.)
              elementType: "labels",    // hide the labels only
              stylers: [{ visibility: "off" }]
            }
        ]
      });
      const trafficLayer = new google.maps.TrafficLayer();
      trafficLayer.setMap(map);
    })
  })
  
  
  return (
    <div className="bg-slate-800 w-[400px] min-h-[300px] mr-[100px] rounded-lg text-white py-5 px-5">
        <div className="font-medium text-xl font-[work-sans] flex items-center justify-between">
          Traffic Density Heatmap  <span className="text-red-800">TEST DEPLOYMENT</span>
          <ExternalLink onClick={() => navigate('/traffic-analysis')} className="cursor-pointer duration-300 hover:text-blue-400 text-blue-500"/>
        </div>
        <div className="flex space-x-2">
            <button onClick={() => setactivemap('maplibre')}>MapLibre</button>
            <button onClick={() => setactivemap('google')}>Google</button>
          </div>
        <div className="flex h-[210px] w-full gap-2 group transition-all duration-500">
          <div 
            ref={heatMapRef} 
            className={` rounded-lg transition-all duration-500  ${activemap == "maplibre" ? "flex-1" : "hidden"}`} 
            style={{ minWidth: "100px", height: "210px" }}  
          />
          <div 
            ref={lineMapRef} 
            className={`rounded-lg transition-all duration-500 ${activemap == "google" ? "flex-1":"hidden"}`} 
            style={{ minWidth: "100px", height: "210px" }}  
          />
          
          
         
        </div>
        
        <div className="font-medium text-xl mt-12 font-[work-sans] ">
          Traffic Analytics
        </div>
        <div className="flex justify-center h-24  border-white/10 mt-2 pt-2 ">
          <ResponsiveContainer width="90%" height={110}>
            <AreaChart width={730} height={250} data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#639ef7" stopOpacity={0.5}/>
                  <stop offset="95%" stopColor="#639ef7" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <Tooltip cursor={false} contentStyle={{
                backgroundColor: "#1e293b",
                border: "1px solid #334155",
                borderRadius: "8px",
                color: "#f8fafc", 
                fontSize: "12px",
              }} />
              <Area type="monotone" dataKey="congestion" stroke="#0366fc" fillOpacity={1} fill="url(#colorUv)" />  
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-10 flex justify-around">
          <div className="">
            <div className="text-2xl text-align-left">58km/h</div>
            <div className="text-sm text-white/60">Average Speed</div>
          </div>
          <div className="">
            <div className="text-2xl text-align-left">2300</div>
            <div className="text-sm text-white/60">Vehicle Count</div>
          </div>
          <div className="">
            <div className="text-2xl text-align-left">41%</div>
            <div className="text-sm text-white/60">Congestion</div>
          </div>
        </div>
    </div>
  )
}

function Signal_control(){
  return (
    <div className="bg-slate-800 w-[400px]   mr-10 mt-4 rounded-lg text-white py-5 px-5">
      <div className="font-medium text-xl font-[work-sans] ">
        Signal Control
      </div>
      <div className="pt-8 flex gap-2 items-center text-xl justify-start pl-2 font-[work-sans]">
        <div className="relative inline-flex">
          <div className="rounded-full bg-green-400 h-[12px] w-[12px] inline-block mr-2"></div>
          <div className="absolute animate-ping rounded-full bg-green-400 h-[12px] w-[12px] mr-2"></div>
        </div>
        Uttam Nagar 
      </div>
      <div className="mt-10 flex justify-around">
          <div className="">
            <div className="text-sm text-white/60">EXTENSION</div>
            <div className="text-2xl text-align-left">Extend Green</div>
            
          </div>
          <div className="">
            <div className="text-sm text-white/60">AI PREDICTION</div>
            <div className="text-2xl text-align-left flex items-center gap-2"><ChevronDown color="#27f024"/>+30s</div>
          </div>
        
        </div>
    </div>
  )
}


function Traffic_average(){
  const data = [
    { time: "00:00", congestion: 15 },
    { time: "01:00", congestion: 8 },
    { time: "02:00", congestion: 22 },
    { time: "03:00", congestion: 18 },
    { time: "04:00", congestion: 28 },
    { time: "05:00", congestion: 32 },
    { time: "06:00", congestion: 38 },
    { time: "07:00", congestion: 45 },
    { time: "08:00", congestion: 52 },
    { time: "09:00", congestion: 48 },
    { time: "10:00", congestion: 55 },
    { time: "11:00", congestion: 62 },
    { time: "12:00", congestion: 68 },
    { time: "13:00", congestion: 65 },
    { time: "14:00", congestion: 72 },
    { time: "15:00", congestion: 78 },
    { time: "16:00", congestion: 82 },
    { time: "17:00", congestion: 88 },
    { time: "18:00", congestion: 85 },
    { time: "19:00", congestion: 92 },
  ];
  
  return (
    <div className="bg-slate-800 w-[795px] ml-4 mt-4 rounded-lg text-white pt-4 pb-1 px-5">
      <div className="font-medium text-2xl font-[work-sans] ">
        Traffic Average
      </div>
      <div className="flex justify-around items-center mt-5 mb-6">
        <div className="text-left">
          <div className="text-sm text-white/60">Average Speed</div>
          <div className="text-4xl font-semibold">58km/h</div>
        </div>
        <div className="h-30 w-70">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorTraffic" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#639ef7" stopOpacity={0.5}/>
                  <stop offset="95%" stopColor="#639ef7" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <Tooltip 
                cursor={{ stroke: '#334155', strokeWidth: 1 }}
                contentStyle={{
                  backgroundColor: "#1e293b",
                  border: "1px solid #334155",
                  borderRadius: "8px",
                  color: "#f8fafc", 
                  fontSize: "12px",
                }} 
              />
              <Area 
                type="monotone" 
                dataKey="congestion" 
                stroke="#0366fc" 
                strokeWidth={2}
                fillOpacity={1} 
                fill="url(#colorTraffic)" 
              />  
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="text-left">
          <div className="text-sm text-white/60">Time Elapsed</div>
          <div className="text-4xl font-semibold">01:58</div>
        </div>
      </div>

      
    </div>
  )
}

export default function Home() {
  const navigate = useNavigate();
  return (
    <div  className="bg-gradient-to-tr from-slate-950 to-slate-800 min-h-screen pt-25 pb-25 flex justify-center items-center w-[100%]">
      <div className="ml-[85px] flex flex-col justify-center w-[100%]">
        <div className="flex gap-4 flex-wrap justify-center ">
          <div onClick={() => navigate('/cctv/1')} ><PreviewLocation location="Uttam Nagar" cctv_preview="./vids/v1.mp4"/></div>
          <div onClick={() => navigate('/cctv/2')}><PreviewLocation location="Rajendra Place" cctv_preview="./vids/v2.mp4"/></div>
          <div onClick={() => navigate('/cctv/3')}><PreviewLocation location="Yamuna Bank Crossing" cctv_preview="./vids/v3.mp4"/></div>
          <div onClick={() => navigate('/cctv/4')}><PreviewLocation location="Shivaji Marg" cctv_preview="./vids/v4.mp4"/></div>
          
        </div>
        <div className="flex justify-center mr-4">
          <Traffic_average/>
        </div>
      </div>
      
      <div>
        <TrafficDensityMap />
        <div>
          <Signal_control/>
        </div>
      </div>
    </div>
  )
}


