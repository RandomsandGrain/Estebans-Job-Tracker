import {useState, useEffect, useReducer} from "react"
import {Job, UserJob} from "./types"
import App from "./App"

interface Props {
  addUserJob: (job: UserJob) => void;
}

function Create({addUserJob} : Props) {

const [title, setTitle] = useState("")
const [minsalary, setMinSalary] = useState<string >("")
const [maxsalary, setMaxSalary] = useState<string >("")
const [description, setDescription] = useState("")
const [companyname, setCompanyName] = useState("")
const [jobtype, setJobType] = useState<"Part-Time" | "Full-Time" | "Contract" | "">("")


const ClearInputs = () => {
 setTitle("")
 setCompanyName("")
 setJobType("")
 setMinSalary("")
 setMaxSalary("")
 setDescription("")
}

const AddNewJob = () => {
    if(title.trim() === "" || minsalary.trim() === ""|| maxsalary.trim() === "" || jobtype.trim() === "" || companyname.trim() === ""|| description.trim() === "") return alert("Please fill in every field!")
    const newJob : UserJob = {
    title: title ,
  companyName:companyname ,
  jobType:jobtype ,
  minSalary: Number(minsalary),
  maxSalary: Number(maxsalary),
  description:description,
  id:Date.now(),
  status: ""
 } 
 addUserJob(newJob)
 ClearInputs()
}
    return <div>
       
        <div className="text-center flex">
            <div className="m-4">
<p className="inline-block m-4">Title:</p>
<input 
className="border inline-block"
placeholder="e.g. Software Engineer"
value={title}
onChange={(e) => setTitle(e.target.value)}
/>
<br />
<p className="inline-block m-4 ">CompanyName:</p>
<input 
className="border inline-block"
placeholder="e.g. Google"
value={companyname}
onChange={(e) => setCompanyName(e.target.value)}
/>
<br />
<p className="inline-block  m-4">JobType:</p>
<select 
className="border inline-block cursor-pointer"
value={jobtype}
onChange={(e) =>setJobType(e.target.value as "Part-Time" | "Full-Time" | "Contract" | "")}
>
    <option value=""></option>
    <option value="Part-Time">Part-Time</option>
    <option value="Full-Time">Full-Time</option>
    <option value="Contract">Contract</option>
    </select> 


<br />
<p className="inline-block m-4">Salary:</p>
<input 
className="border inline-block w-20 m-2"
type="number"
value={minsalary}
placeholder="$    min"
onChange={(e) => setMinSalary(e.target.value)}
/>
-
<input 
className="border inline-block w-20 m-2"
type="number"
value={maxsalary}
placeholder="$    max"
onChange={(e) => setMaxSalary(e.target.value)}
/>
<br />
</div>

<div className="text-left">
<p>Description:</p><textarea 
className="border h-70 w-100"
placeholder="e.g. Build and create code that runs clean and effectively..."
value={description}
onChange={(e) => setDescription(e.target.value)}
/>
</div>
</div>
<button className="border bg-gray-100 rounded-xl p-2 m-2 w-190 hover:bg-gray-200 cursor-pointer" onClick= {AddNewJob}
 
>Create</button>
    </div>
}

export default Create