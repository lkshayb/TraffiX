import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { MoonLoader } from "react-spinners";

export default function CctvPage(){
    const { userId } = useParams();
    const [location,setlocation] = useState<string | undefined>("");
    const [url,seturl] = useState<string | undefined>("");
    const [lat,setlat] = useState<number>(0);
    const [long,setlong] = useState<number>(0);
    const heatMapRef = useRef<HTMLDivElement>(null)
    const mapInstance = useRef<maplibregl.Map | null>(null);

    useEffect(() => {
        
    })
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
    useEffect(() => {
        if (userId === "1") {
            seturl("/vids/v1.mp4");
            setlocation("Uttam Nagar");
            setlat(28.625534);
            setlong(77.067073);
          } else if (userId === "2") {
            seturl("/vids/v2.mp4");
            setlocation("Rajendra Place");
            setlat(28.632455);
            setlong(77.148709);
          } else if(userId === "3") {
            seturl("/vids/v3.mp4");
            setlocation("Yamuna Bank Crossing");
            setlat(28.618377);
            setlong(77.279826);
          } else if(userId === "4") {
            seturl("/vids/v4.mp4");
            setlocation("Shivaji Marg");
          }
      if (heatMapRef.current && !mapInstance.current) {
        const map = new maplibregl.Map({
          container: heatMapRef.current,
          style: "https://api.maptiler.com/maps/streets/style.json?key=SjSnUEMaVUEmC0E8TN03",
          center: [77.2090, 28.6139], 
          zoom: 10.5,
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
    const [videoLoaded, setVideoLoaded] = useState(false);
    return (
        <div className=" flex flex-col font-[work-sans] bg-gradient-to-tr from-slate-950 to-slate-800 min-h-screen pt-25 pb-25 flex justify-center items-start w-[100%] text-white pl-[100px]">
            <div className="text-4xl font-medium text-green-500 mb-20">{location}<span className=" font-medium text-white"> CCTV Camera</span></div> 
            <div className="flex gap-10">
                <div className="rounded-lg overflow-hidden relative">
                    {!videoLoaded && (
                      <div className="absolute inset-0 bg-slate-700/60 animate-pulse flex items-center justify-center text-slate-300 text-sm h-[390px] w-[550px]">
                        <MoonLoader size={30} color="#ffffff"/>
                      </div>
                    )}
                    {url ? (
                      <video 
                        className={`h-[390px] w-[550px] object-cover ${videoLoaded ? 'opacity-100' : 'opacity-0'}`}
                        src={url} 
                        muted 
                        loop 
                        autoPlay 
                        preload="metadata"
                        onLoadedData={() => setVideoLoaded(true)}
                        onError={() => setVideoLoaded(true)}
                      />
                    ) : null}
                </div>
                <div className="bg-red-100  h-content w-content rounded-lg overflow-hidden">
                    <div
                        className="object-cover h-[100%] min-w-[20vw] hover:scale-170 scale-150  duration-300"
                        ref={heatMapRef}
                    />
                </div>
            </div>

        </div>

    )
}