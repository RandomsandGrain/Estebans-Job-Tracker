export interface Job {
    id: number,
      url: string,
      title: string,
      company_name:string,
      company_logo: string,
      category: string,
      job_type:string,
      publication_date: string,
      candidate_required_location:string,
      salary: string,
      description: string,
      status: string
}
export interface UserJob {
  title: string,
  companyName: string,
  jobType: string,
  minSalary: number,
  maxSalary: number,
  description: string,
  id: number,
  status: string
}