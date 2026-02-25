import { Job } from "@/types/job";
import JobCard from "./Jobcard";

interface Props {
  jobs: Job[];
}

export default function AppliedJobList({ jobs }: Props) {
  if (jobs.length === 0) {
    return <p>No applied jobs yet</p>;
  }

  return (
    <div className="space-y-4">
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} isApplied />
      ))}
    </div>
  );
}