"use client";
import { ChevronDown, ExternalLink } from "lucide-react";
import { useEffect,useRef, useState} from "react";
import { ResponsiveContainer, Area,Tooltip, AreaChart} from "recharts";
import { useNavigate } from "react-router-dom";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { MoonLoader } from "react-spinners";



function PreviewLocation(props:any){
  const [videoLoaded, setVideoLoaded] = useState(false);
  return (
    <div  className="group cursor-pointer text-white bg-slate-800 flex rounded-lg w-[390px] h-[270px] py-5 px-4 flex flex-col">
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

function TrafficDensityMap(){
  const heatMapRef = useRef<HTMLDivElement | null>(null);
  const mapInstance = useRef<maplibregl.Map | null>(null);

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


    const congestionCoords = [
      [77.240471,28.564603],
      [77.234360, 28.579620],
      [77.207088, 28.559821],
      [77.202313, 28.544363],
      [77.197476, 28.536333],
      [77.245453, 28.511993],
      [77.233002, 28.514252],
      [77.178704, 28.502982],
      [77.258406, 28.572377],
      [77.265759, 28.577305],
      [77.253491, 28.561863],
      [77.240358, 28.572789],
      [77.299337, 28.553387],
      [77.306923, 28.515770],
      [77.180626, 28.601972],
      [77.082665, 28.539900],
      [77.247245, 28.612169],
      [77.171161, 28.559478],
      [77.172565, 28.658886],
      [77.276804, 28.630031],
      [77.245105, 28.650641],
      [77.223564, 28.645213],
      [77.081293, 28.638292],
      [77.212323, 28.667610],
      [80.937075, 26.858519],
      [77.228464, 28.669337],
      [77.094683, 28.679566],
      [77.078143, 28.681465],
      [76.994957, 28.593444],
      [77.146210, 28.683051],
      [77.133890, 28.683438],
      [77.156113, 28.735066],
      [77.131023, 28.704149],
      [77.178253, 28.707641],
      [77.177864, 28.708245],
      [77.176172, 28.710136],
      [77.180564, 28.714757],
      [77.199530, 28.700579],
      [77.209670, 28.702377],
      [77.151556, 28.746112],
      [77.093212, 28.858038],
      [77.201320, 28.558727],
      [77.035458, 28.800102],
      [77.114124, 28.735046],
      [77.024620, 28.733406],
      [77.107765, 28.720090],
      [77.115856, 28.714496],
      [77.286914, 28.674312],
      [77.311497, 28.682392],
      [77.295980, 28.647153],
      [77.318305, 28.648498],
      [77.275921, 28.666245],
      [77.256250, 28.704578],
      [77.291633, 28.701932],
      [77.067134, 28.625544],
      [77.178914, 28.642718]
    ] 
    
  const navigate = useNavigate();
  useEffect(() => {
    if (heatMapRef.current && !mapInstance.current) {
      const map = new maplibregl.Map({
        container: heatMapRef.current,
        style: "https://api.maptiler.com/maps/streets/style.json?key=SjSnUEMaVUEmC0E8TN03",
        center: [77.2090, 28.6139], 
        zoom: 10,
        attributionControl: false,
      });
      mapInstance.current = map;

      map.on("load",() => {
        map.addSource("traffic",{
          type:"geojson",
          data:{
            type:"FeatureCollection",
            features:congestionCoords.map(coord => ({
              type: "Feature",
              geometry: { type: "Point", coordinates: coord },
              properties: { density: 0.1 } // you can adjust this value per point
            }))
          }
        });

        map.addLayer({
          id: "traffic-heat",
          type: "heatmap",
          source: "traffic",
          maxzoom: 15,
          paint:{
            "heatmap-intensity": [
              "interpolate",
              ["linear"],
              ["zoom"],
              0, 1,
              15, 3,
            ],

            "heatmap-color": [
              "interpolate",
              ["linear"],
              ["heatmap-density"],
              0, "rgba(0,0,255,0)",   // blue transparent
              0.6, "lime",
              0.8, "yellow",
              1, "rgb(227, 68, 68)"
            ],

            "heatmap-radius": [
              "interpolate",
              ["linear"],
              ["zoom"],     
              0, 15,                
              10, 30 
            ],

            "heatmap-opacity": [
              "interpolate",
              ["linear"],
              ["zoom"],
              10, 1,
              15, 0,
            ],
          }
        })
      })
    }
  }, []);

  



  
  return (
    <div className="bg-slate-800 w-[400px] min-h-[300px] mr-[100px] rounded-lg text-white py-5 px-5">
        <div className="font-medium text-xl font-[work-sans] flex items-center justify-between">
          Traffic Density Heatmap  
          <ExternalLink onClick={() => navigate('/traffic-analysis')} className="cursor-pointer duration-300 hover:text-blue-400 text-blue-500"/>
        </div>
      
        <div className="flex justify-center h-[210px]">
          <div ref={heatMapRef} className="h-full w-full rounded-lg mt-4" />
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


