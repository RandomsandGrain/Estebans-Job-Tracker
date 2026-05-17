import { Outlet, Link, useParams } from "react-router-dom"
import { Job, UserJob } from "./types"

 interface Props {
    jobs: Job[],
     userJob: UserJob[],
     ResetStatus: (StatusID : number) => void
 }


function Home({jobs, userJob, ResetStatus} : Props) {

    const paramID = Number(useParams().id)

    if(!jobs || !userJob) return
    return <div className="flex ">

        <div className="w-1/3 h-screen overflow-y-auto">


{userJob.map((q) => 
<Link to={"/" + q.id } key={q.id}><div  className={`rounded-xl m-4 p-2 hover:underline ${q.id === paramID ? "border border-5 border-green-700" : "border border-2"}`}>
    <h1 className="font-bold text-2xl text-decoration text-decoration">{q.title}</h1> 

<div className="text-left ">
   <p className="bg-green-100 inline-block p-1 rounded-xl m-4">${q.minSalary} - ${q.maxSalary}</p>
    </div>

    </div>
    </Link>)}


{jobs.map((q) => {
    const status = q.status
    const salary = q.salary

return <Link to={"/" + q.id } key={q.id}><div  className={`rounded-xl m-4 p-2 hover:underline ${q.id === paramID ? "border border-5 border-green-700" : "border border-2"}`}>
  <h1 className="font-bold text-2xl text-decoration">{q.title} </h1> 

<div className="text-left ">
    <p className={`text-xl inline-block rounded-xl p-1 m-4 ${salary.trim() === "" ? "bg-gray-200" : "bg-green-100"} ` }>
        {salary.trim() === "" ? "Pay information not provided" : salary }
        </p>
     
        {status.trim() === "" ? undefined : 
        <p className={`relative font-bold bg-yellow-300 m-4 cursor-default rounded-xl inline-block ${status.trim() === "" ? "" : "p-2"}`}>
            {status}
            <button onClick={() => ResetStatus(q.id)} 
            className="absolute text-[6px] font-bold text-white border-black border-2 bg-red-500 cursor-pointer w-3 h-3 rounded-full -top-1 -right-1"
            >
                X
                </button>
        </p>
}
    </div>

    </div>
    </Link>})}


</div>

<div className="w-2/3"><Outlet /></div>
  </div>
}

export default Home