import { Job } from "@/types/job";
import JobCard from "./Jobcard";

interface Props {
  jobs: Job[];
  onApplied?: (job: Job) => void;
}

export default function JobList({ jobs, onApplied }: Props) {
  if (jobs.length === 0) {
    return <p>No jobs match your filters</p>;
  }

  return (
    <div className="space-y-4">
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} onApplied={onApplied} />
      ))}
    </div>
  );
}