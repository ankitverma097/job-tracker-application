"use client";

import jobsData from "@/data/jobs.json";
import { useEffect, useMemo, useState } from "react";
import { JAIPUR_CENTER } from "@/lib/constants";
import { calculateDistance } from "@/lib/distance";
import { JobProvider, useJobs } from "@/context/JobContext";
import FiltersPanel from "@/components/filters/filterPannel";
import JobList from "@/components/jobs/Joblist";
import AppliedJobList from "@/components/jobs/Applied";
import type { Job, JobType } from "@/types/job";

interface FiltersState {
  company: string;
  types: JobType[];
  minSalary: number;
  maxSalary: number;
  maxDistance: number;
}

function Dashboard() {
  const { appliedIds } = useJobs();

  const [filters, setFilters] = useState<FiltersState>({
    company: "",
    types: [],
    minSalary: 0,
    maxSalary: 2000,
    maxDistance: 50,
  });

  const [activeTab, setActiveTab] = useState<"available" | "applied">(
    "available"
  );
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    if (!notification) return;

    const id = window.setTimeout(() => {
      setNotification(null);
    }, 3000);

    return () => window.clearTimeout(id);
  }, [notification]);

  const jobsWithDistance = useMemo<Job[]>(() => {
    return (jobsData as Job[]).map((job) => ({
      ...job,
      distance: calculateDistance(
        JAIPUR_CENTER.lat,
        JAIPUR_CENTER.lon,
        job.location.lat,
        job.location.lon
      ),
    }));
  }, []);

  const filtered = jobsWithDistance.filter((job) => {
    const companyMatch = job.company
      .toLowerCase()
      .includes(filters.company.toLowerCase());

    const typeMatch =
      filters.types.length === 0 ||
      filters.types.includes(job.type);

    const salaryMatch =
      job.salary >= filters.minSalary &&
      job.salary <= filters.maxSalary;

    const distanceMatch =
      job.distance! <= filters.maxDistance;

    return companyMatch && typeMatch && salaryMatch && distanceMatch;
  });

  const dashboardJobs = filtered.filter(
    (job) => !appliedIds.includes(job.id)
  );

  const appliedJobs = jobsWithDistance.filter((job) =>
    appliedIds.includes(job.id)
  );

  return (
    <main className="min-h-screen bg-gradient-to-b from-sky-50/80 via-slate-50 to-slate-100">
      <div className="mx-auto max-w-5xl px-6 py-10 space-y-10">
        <header className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
              Jaipur Job Tracker
            </h1>
            <p className="mt-1 text-sm text-slate-600">
              Filter nearby jobs, apply, and keep track of what you&apos;ve already applied to.
            </p>
          </div>
        </header>

        {notification && (
          <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm text-emerald-800">
            {notification}
          </div>
        )}

        <section className="grid gap-8 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1.4fr)] items-start">
          <aside className="rounded-2xl border border-slate-200 bg-white/80 p-5 shadow-sm backdrop-blur">
            <h2 className="mb-4 text-sm font-medium uppercase tracking-wide text-slate-500">
              Filters
            </h2>
            <FiltersPanel filters={filters} setFilters={setFilters} />
          </aside>

          <div className="space-y-6">
            <div className="inline-flex rounded-full bg-slate-200/80 p-1 text-xs font-medium text-slate-600 shadow-sm backdrop-blur">
              <button
                type="button"
                onClick={() => setActiveTab("available")}
                className={`rounded-full px-3 py-1 transition ${
                  activeTab === "available"
                    ? "bg-sky-800 text-white shadow-md shadow-sky-300"
                    : "text-slate-600 hover:text-slate-700 hover:bg-white/70"
                }`}
              >
                Available Jobs
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("applied")}
                className={`rounded-full px-3 py-1 transition ${
                  activeTab === "applied"
                    ? "bg-emerald-500 text-white shadow-md shadow-emerald-300"
                    : "text-slate-500 hover:text-slate-700 hover:bg-white/70"
                }`}
              >
                Applied Jobs
              </button>
            </div>

            {activeTab === "available" ? (
              <section>
                <div className="mb-3 flex items-baseline justify-between gap-2">
                  <h2 className="text-lg font-semibold text-slate-900">
                    Jobs Dashboard
                  </h2>
                  <p className="text-xs text-slate-500">
                    Showing {dashboardJobs.length} open job
                    {dashboardJobs.length === 1 ? "" : "s"} that match your
                    filters
                  </p>
                </div>
                <JobList
                  jobs={dashboardJobs}
                  onApplied={(job) =>
                    setNotification(`You applied for “${job.title}” at ${job.company}.`)
                  }
                />
              </section>
            ) : (
              <section>
                <div className="mb-3 flex items-baseline justify-between gap-2">
                  <h2 className="text-lg font-semibold text-slate-900">
                    Applied Jobs
                  </h2>
                  <p className="text-xs text-slate-500">
                    You&apos;ve applied to {appliedJobs.length} job
                    {appliedJobs.length === 1 ? "" : "s"} so far
                  </p>
                </div>
                <AppliedJobList jobs={appliedJobs} />
              </section>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}

export default function Page() {
  return (
    <JobProvider>
      <Dashboard />
    </JobProvider>
  );
}