"use client";

import { Job } from "@/types/job";
import { useJobs } from "@/context/JobContext";

interface Props {
  job: Job;
  isApplied?: boolean;
  onApplied?: (job: Job) => void;
}

export default function JobCard({ job, isApplied, onApplied }: Props) {
  const { applyJob, withdrawJob } = useJobs();

  return (
    <div className="flex items-center justify-between gap-6 rounded-xl border border-slate-200 bg-white/90 p-4 shadow-sm transition hover:-translate-y-[1px] hover:border-sky-200 hover:shadow-md">
      <div className="space-y-1.5">
        <div className="flex items-center gap-2">
          <h3 className="text-base font-semibold text-slate-900">
            {job.title}
          </h3>
          <span className="inline-flex items-center rounded-full bg-sky-50 px-2 py-0.5 text-[11px] font-medium text-sky-700 ring-1 ring-sky-100">
            {job.type}
          </span>
        </div>
        <p className="text-sm font-medium text-slate-700">{job.company}</p>
        <div className="flex flex-wrap gap-3 text-xs text-slate-600">
          <span className="inline-flex items-center gap-1 rounded-full bg-slate-50 px-2 py-0.5 ring-1 ring-slate-100">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            ₹{job.salary.toLocaleString("en-IN")} / month
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-slate-50 px-2 py-0.5 ring-1 ring-slate-100">
            <span className="h-1.5 w-1.5 rounded-full bg-sky-500" />
            {job.distance} km from Jaipur center
          </span>
        </div>
      </div>

      {isApplied ? (
        <button
          onClick={() => {
            const confirmed = window.confirm(
              `Are you sure you want to withdraw your application from "${job.title}" at ${job.company}?`
            );
            if (!confirmed) return;
            withdrawJob(job.id);
          }}
          className="inline-flex items-center rounded-full bg-rose-500 px-4 py-1.5 text-sm font-medium text-white shadow-sm transition hover:bg-rose-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 focus-visible:ring-offset-1"
        >
          Withdraw
        </button>
      ) : (
        <button
          onClick={() => {
            applyJob(job.id);
            onApplied?.(job);
          }}
          className="inline-flex items-center rounded-full bg-sky-600 px-4 py-1.5 text-sm font-medium text-white shadow-sm transition hover:bg-sky-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-1"
        >
          Apply
        </button>
      )}
    </div>
  );
}