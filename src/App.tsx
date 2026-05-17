import {useState, useEffect} from "react"
import { Routes,Route,Link } from "react-router-dom"
import Home from "./Home"
import JobDescription from "./JobDescription"
import Create from "./Create"
import { Job, UserJob } from "./types"

function App() {

    const [jobs, setJobs] = useState<Job[]>([])
    const [search, setSearch] = useState("")
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [userJob, setUserJob] = useState<UserJob[]>(() => {
     const saved = localStorage.getItem("UserJob")
    return saved ? JSON.parse(saved) : [];
})

const ChangeStatus = (CurrStatus : string, StatusID : number) => {
    if(!jobs) return
 return setJobs(prev => prev.map((q : Job) => q.id === StatusID ? {...q, status: CurrStatus} : {...q} ))
}
const ResetStatus = (StatusID : number) => {
    if(!jobs) return
 return setJobs(prev => prev.map((q : Job) => q.id === StatusID ? {...q, status: ""} : {...q} ))
}

const addUserJob = (Job : UserJob) => {
    return setUserJob(prev => [...prev, Job ])
}

    const JOBS_API = "https://remotive.com/api/remote-jobs"

    const apiCall = async () => { 
        try{
            setLoading(true)
            setError(false)
            const save = await fetch(JOBS_API)
        const result = await save.json()
        setJobs(result.jobs.map((q : Job) => ({...q, status: "" })))
    }
        catch(err)
        {
       setError(true)
       console.log(err)
        }
        finally{
            setLoading(false)
        }
        

    }
    const CompareArray = (search.trim() === "") ? [] : jobs.filter((q : Job) => q.title.trim().toLowerCase().includes(search.toLowerCase().trim()) )
    useEffect(() => {apiCall()}, [])
    useEffect(() => localStorage.setItem("UserJob", JSON.stringify(userJob) ),[userJob]);
    
    if(error) return <h1 className="text-8xl font-bold m-50 text-center">404 Error, Please Refresh page.</h1>
    if(loading) return <h1 className="text-8xl font-bold m-50 text-center">Loading..</h1>

   return <div >
<div>
   <Link to="/"><h1 className="text-left inline m-4 font-bold text-green-700 text-decoration decoration-black hover:underline hover:text-green-600 text-xl">Esteban Job tracker</h1></Link>
   <Link to="/Create"><h1 className="inline font-bold text-green-700 text-decoration decoration-black hover:underline hover:text-green-600 text-xl"> Create a Job! </h1></Link>
  
<input 
value={search}
onChange={(e) => setSearch(e.target.value)}
className=" p-4 ml-120 mt-4 border rounded-4xl hover:bg-gray-100"
placeholder="search.."
></input>
 </div>

<div className="absolute text-center left-180">
    {CompareArray.map((q : Job) => 
    <div key={q.id} className="border text-center bg-gray-900 text-green-200 rounded-xl p-2 hover:bg-gray-800 cursor-pointer">
        <Link 
        to={"/" + q.id} 
        onClick={() => setSearch("")}
       >
            {q.title}
        </Link>

        </div>
    )}
    </div >

<Routes>
    <Route path="/" element={<Home ResetStatus={ResetStatus} jobs={jobs} userJob={userJob} />} >
        <Route path="/:id"element={<JobDescription ChangeStatus={ChangeStatus} jobs={jobs} userJob={userJob}/>} />
    </Route>
    <Route path="/Create" element={<Create addUserJob={addUserJob}/>} />
</Routes>

   </div>
}

export default App