export default function Home() {

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

  function TrafficDensityMap(){
    return (
      <div className="bg-slate-800 w-100 text-white">
          as
      </div>
    )
  }

  return (
    <div className="bg-gradient-to-tr from-slate-950 to-slate-800 min-h-screen py-30 flex">
      <div className="flex gap-4 flex-wrap justify-center">
        <PreviewLocation location="M.G Road" cctv_preview="https://images.pexels.com/photos/210182/pexels-photo-210182.jpeg"/>
        <PreviewLocation location="CBD" cctv_preview="https://images.pexels.com/photos/210182/pexels-photo-210182.jpeg"/>
        <PreviewLocation location="JanakPuri" cctv_preview="https://images.pexels.com/photos/210182/pexels-photo-210182.jpeg"/>
        <PreviewLocation location="Seelampur" cctv_preview="https://images.pexels.com/photos/210182/pexels-photo-210182.jpeg"/>
      </div>
      <div>
        <TrafficDensityMap/>
      </div>
    </div>
  )
}


