import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

export default function CctvPage(){
    const { userId } = useParams();
    const [location,setlocation] = useState<string | undefined>("");
    const [url,seturl] = useState<string | undefined>("");
    const [lat,setlat] = useState<number>(0);
    const [long,setlong] = useState<number>(0);
    const mapRef = useRef<HTMLDivElement>(null)
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
            setlat(28.641555);
            setlong(77.107640);
          }
        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyB41DRUbKWJHPxaFjMAwdrzWzbVKartNGg&callback=initMap`;
        script.async = true;
        document.body.appendChild(script);

        (window as any).initMap = () => {
            if (!mapRef.current) return;
      
            const map = new google.maps.Map(mapRef.current, {
                zoom: 16,
                center: { lat: lat, lng:long}, // Example: Los Angeles
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
        };
        return () => {
            delete (window as any).initMap;
        };
        
    })
   
    return (
        <div className=" flex flex-col font-[work-sans] bg-gradient-to-tr from-slate-950 to-slate-800 min-h-screen pt-25 pb-25 flex justify-center items-start w-[100%] text-white pl-[100px]">
            <div className="text-4xl font-medium text-green-500 mb-20">{location}<span className=" font-medium text-white"> CCTV Camera</span></div> 
            <div className="flex gap-10">
                <div className="rounded-lg overflow-hidden">
                    {url ? <video className={`h-[390px] w-[550px] object-cover`} src={url} muted loop autoPlay /> : null}
                </div>
                <div className="bg-red-100  h-content w-content rounded-lg overflow-hidden">
                    <div
                        className="object-cover h-[100%] min-w-[20vw] hover:scale-170 scale-150  duration-300"
                        ref={mapRef}
                    />
                </div>
            </div>

        </div>

    )
}