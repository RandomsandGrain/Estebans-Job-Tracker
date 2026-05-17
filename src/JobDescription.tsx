import { Job, UserJob } from "./types"
import { useParams } from "react-router-dom"
import { useState } from "react"

interface Props {
    jobs: Job[],
    userJob: UserJob[]
    ChangeStatus: (CurrStatus : string, StatusID : number) => void
}

function JobDescription({ jobs, userJob, ChangeStatus}: Props) {

 const [jobstat, setJobStat] = useState<string>("")

    const CurrID = Number(useParams().id)
    if(Number.isNaN(CurrID)) return
    const FindJob = jobs.find((q)=> q.id === CurrID)
    const FindUserJob = userJob.find((q)=> q.id === CurrID)

   
    if(FindUserJob) return < div className="overflow-y-auto h-screen">
        <div className="border border-solid rounded-xl p-10">
            <h1 className="text-3xl font-bold text-black">{FindUserJob.title}</h1>
            <p className="text-decoration underline ">{FindUserJob.companyName}</p>
            <div className="flex">
            <div> 
                <p className="text-xl">{FindUserJob.jobType}</p>
                <p className="bg-green-200 p-1 rounded-xl inline-block m-2 text-xl">${FindUserJob.minSalary} - ${FindUserJob.maxSalary}</p>
            </div>
            </div>


<hr />
<h3 className="font-bold text-2xl text-black m-10">Job Description</h3>
<div>{FindUserJob.description}</div>
</div></div>
 if(!FindJob) return
    return <div className="overflow-y-auto h-screen">
        <div className="border border-solid rounded-xl p-10">

    <select 
        value={jobstat} 
       className="text-xl ml-250 border-3 rounded-full font-bold border appearance-none text-center hover:cursor-pointer hover:bg-gray-100"
        onChange={(e) => {
            const inputVal = e.target.value
            setJobStat(inputVal)
            ChangeStatus(inputVal, FindJob.id)
            setJobStat("")
        }}>
        <option value="">...</option>
        <option value="Considering">Considering</option>
        <option value="Applied">Applied</option>
        <option value="Interview">Interview</option>
    </select>

            <h1 className="text-3xl font-bold text-black">{FindJob.title} 

  

        </h1>
              
            <a href={FindJob.url} target="_blank" rel="noopener noreferrer" className=" text-decoration underline ">{FindJob.company_name}</a>
            <div className="flex">
            <div className="flex flex-row">
                <img src={FindJob.company_logo} className="w-22 m-4" alt="company logo"/>
            </div>
            <div> 
                <p className="text-xl">{FindJob.job_type}</p>
                <p className="text-xl">{FindJob.candidate_required_location}</p>
            </div>
            </div>
            
<p className={` text-xl text-black inline-block rounded-xl p-1 m-4 ${FindJob.salary.trim() === "" ? "bg-gray-100" : "bg-green-200" } `}>

    {FindJob.salary.trim() === "" ? "Pay Information not provided" : FindJob.salary}

</p>


<hr />
<h3 className="font-bold text-2xl text-black m-10">Job Description</h3>
<div dangerouslySetInnerHTML={{__html : FindJob.description}} />
</div>

    </div>
}

export default JobDescription