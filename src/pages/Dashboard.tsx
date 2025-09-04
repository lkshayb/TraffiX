"use client";
import { ChevronDown } from "lucide-react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { useEffect,useRef} from "react";
import { ResponsiveContainer, Area,Tooltip, AreaChart} from "recharts";


function PreviewLocation(props:any){
  return (
    <div className="text-white bg-slate-800 flex rounded-lg w-[390px] h-[270px] py-5 px-4 flex flex-col">
      <span className="font-medium text-xl font-[work-sans] mb-4 ml-1">{props.location}</span>
      <div className="flex justify-center items-center">
        <img className=" h-[190px] w-[350px] rounded-sm" src={props.cctv_preview} alt="Couldn't Load the Preview" />
      </div>
      
    </div>
  )
}

function TrafficDensityMap(){
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstance = useRef<maplibregl.Map | null>(null);

  useEffect(() => {
    if (mapContainerRef.current && !mapInstance.current) {
      const map = new maplibregl.Map({
        container: mapContainerRef.current,
        style: "https://api.maptiler.com/maps/streets/style.json?key=SjSnUEMaVUEmC0E8TN03",
        center: [77.2090, 28.6139], 
        zoom: 11,
        attributionControl: false,
      });
      mapInstance.current = map;

      map.on("load",() => {
        map.addSource("traffic",{
          type:"geojson",
          data:{
            type:"FeatureCollection",
            features:[
              {
                 type: "Feature",
                 geometry: { type: "Point", coordinates: [77.209, 28.6139] },
                 properties: { density: 0.1 },
               },
              {
                type: "Feature",
                geometry: { type: "Point", coordinates: [77.15, 28.65] },
                properties: { "density": 0.7},
              },
              {
                type: "Feature",
                geometry: { type: "Point", coordinates: [77.25, 28.60] },
                properties: { density: 0.5 },
              },
            ]
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
              1, "rgb(248, 43, 43)"
            ],

            "heatmap-radius": [
              "interpolate",
              ["linear"],
              ["zoom"],   
              0, 50,                
              10, 150 
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


  useEffect(() => {
    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, []);

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
  
  return (
    <div className="bg-slate-800 w-[400px] min-h-[300px] mr-[100px] rounded-lg text-white py-5 px-5">
        <div className="font-medium text-xl font-[work-sans] ">
          Traffic Density Heatmap
        </div>
        <div className="flex justify-center h-[210px]">
          <div ref={mapContainerRef} className="h-full w-full rounded-lg mt-4" />
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
        M.G. Road 
      </div>
      <div className="mt-10 flex justify-around">
          <div className="">
            <div className="text-sm text-white/60">EXTENSION</div>
            <div className="text-2xl text-align-left">Extend Green</div>
            
          </div>
          <div className="">
            <div className="text-sm text-white/60">AI PREDICTION</div>
            <div className="text-2xl text-align-left flex items-center gap-2"><ChevronDown color="#27f024"/>+15s</div>
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
          <div className="text-4xl font-semibold">00:45</div>
        </div>
      </div>

      
    </div>
  )
}

export default function Home() {

  return (
    <div  className="bg-gradient-to-tr from-slate-950 to-slate-800 min-h-screen pt-25 pb-100 flex justify-center items-center w-[100%]">
      <div className="ml-[85px] flex flex-col justify-center w-[100%]">
        <div className="flex gap-4 flex-wrap justify-center ">
          <PreviewLocation location="M.G Road" cctv_preview="https://images.pexels.com/photos/210182/pexels-photo-210182.jpeg"/>
          <PreviewLocation location="Rajendra Place" cctv_preview="https://images.pexels.com/photos/210182/pexels-photo-210182.jpeg"/>
          <PreviewLocation location="Yamuna Bank Crossing" cctv_preview="https://images.pexels.com/photos/210182/pexels-photo-210182.jpeg"/>
          <PreviewLocation location="NH44 Exit 3" cctv_preview="https://images.pexels.com/photos/210182/pexels-photo-210182.jpeg"/>
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


