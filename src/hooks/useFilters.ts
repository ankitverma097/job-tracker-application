import { Job } from "@/types/job";

interface FilterState {
  company: string;
  types: string[];
  minSalary: number;
  maxSalary: number;
  maxDistance: number;
}

export function filterJobs(jobs: Job[], filters: FilterState): Job[] {
  return jobs.filter((job) => {
    const companyMatch = job.company
      .toLowerCase()
      .includes(filters.company.toLowerCase());

    const typeMatch =
      filters.types.length === 0 || filters.types.includes(job.type);

    const salaryMatch =
      job.salary >= filters.minSalary &&
      job.salary <= filters.maxSalary;

    const distanceMatch =
      job.distance !== undefined &&
      job.distance <= filters.maxDistance;

    return companyMatch && typeMatch && salaryMatch && distanceMatch;
  });
}