"use client";

import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { useEffect,useRef,useId} from "react";
import { ResponsiveContainer, Area,Tooltip, AreaChart } from "recharts";


function PreviewLocation(props:any){
  return (
    <div className="text-white bg-slate-800 flex rounded-lg w-[350px] h-[320px] py-5 px-4 flex flex-col">
      <span className="font-medium text-xl font-[work-sans] mb-4 ml-1">{props.location}</span>
      <div>
        <img className=" h-[230px] rounded-sm" src={props.cctv_preview} alt="Couldn't Load the Preview" />
      </div>
      
    </div>
  )
}

function TrafficDensityMap({ collapsed }: { collapsed: boolean }){
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstance = useRef<maplibregl.Map | null>(null);
  const gradientId = useId();

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
                 properties: { density: 1 },
               },
              {
                type: "Feature",
                geometry: { type: "Point", coordinates: [77.15, 28.65] },
                properties: { "density": 0 },
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
              0.2, "blue",
              0.4, "cyan",
              0.6, "lime",
              0.8, "yellow",
              1, "red"
            ],

            "heatmap-radius": [
              "interpolate",
              ["linear"],
              ["zoom"],   
              0, 50,                
              10, 220 
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
    console.log("val is : ",collapsed);
    setTimeout(() => {
      if (mapInstance.current) mapInstance.current.resize();
    }, 500);
  },[collapsed]);

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
    <div className="bg-slate-800 w-[450px] min-h-[300px] mr-10 rounded-lg text-white py-5 px-5">
        <div className="font-medium text-xl font-[work-sans] ">
          Traffic Density Heatmap
        </div>
        <div className="flex justify-center h-[210px]">
          <div ref={mapContainerRef} className="h-full w-full rounded-lg mt-4" />
        </div>
        <div className="font-medium text-xl mt-20 font-[work-sans] ">
          Traffic Analytics
        </div>
        <div className="flex justify-center h-24 border-t-1 border-white/10 mt-5 pt-2 ">
          <ResponsiveContainer width="90%" height={110}>
            <AreaChart width={730} height={250} data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#639ef7" stopOpacity={0.5}/>
                  <stop offset="95%" stopColor="#639ef7" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <Tooltip cursor={false}  />
              <Area type="monotone" dataKey="congestion" stroke="#0366fc" fillOpacity={1} fill="url(#colorUv)" />

            
              
            </AreaChart>
          </ResponsiveContainer>
        </div>
    </div>
  )
}

export default function Home({ collapsed }: { collapsed: boolean }) {

  return (
    <div  className="bg-gradient-to-tr from-slate-950 to-slate-800 min-h-screen pt-25 flex justify-center">
      <div className="flex gap-4 flex-wrap justify-center">
        <PreviewLocation location="M.G Road" cctv_preview="https://images.pexels.com/photos/210182/pexels-photo-210182.jpeg"/>
        <PreviewLocation location="CBD" cctv_preview="https://images.pexels.com/photos/210182/pexels-photo-210182.jpeg"/>
        <PreviewLocation location="JanakPuri" cctv_preview="https://images.pexels.com/photos/210182/pexels-photo-210182.jpeg"/>
        <PreviewLocation location="Seelampur" cctv_preview="https://images.pexels.com/photos/210182/pexels-photo-210182.jpeg"/>
      </div>
      <div>
        <TrafficDensityMap collapsed={collapsed}/>
      </div>
    </div>
  )
}


