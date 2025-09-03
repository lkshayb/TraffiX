"use client";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { useEffect,useRef } from "react";

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

  return (
    <div className="bg-slate-800 w-[450px] min-h-[300px] mr-10 rounded-lg text-white py-5 px-5">
        <div className="font-medium text-xl font-[work-sans] ">
          Traffic Density Heatmap
        </div>
        <div className="flex justify-center h-[210px]">
          <div ref={mapContainerRef} className="h-full w-full rounded-lg mt-4" />
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


