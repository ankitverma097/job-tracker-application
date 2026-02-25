"use client";

import type { Dispatch, SetStateAction } from "react";
import { JobType } from "@/types/job";
import TypeChips from "./Typechips";

interface FiltersState {
  company: string;
  types: JobType[];
  minSalary: number;
  maxSalary: number;
  maxDistance: number;
}

interface Props {
  filters: FiltersState;
  setFilters: Dispatch<SetStateAction<FiltersState>>;
}

export default function FiltersPanel({ filters, setFilters }: Props) {
  return (
    <div className="space-y-5">
      <input
        type="text"
        placeholder="Search company"
        value={filters.company}
        onChange={(e) => setFilters({ ...filters, company: e.target.value })}
        className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-500 outline-none ring-sky-100 transition focus:ring-2 focus:ring-sky-300"
      />

      <TypeChips
        selected={filters.types}
        onChange={(types: JobType[]) =>
          setFilters({ ...filters, types })
        }
      />

      <div className="space-y-2">
        <label className="text-xs font-medium uppercase tracking-wide text-slate-500">
          Salary range (₹)
        </label>
        <div className="flex gap-3">
          <input
            type="number"
            placeholder="Min"
            value={filters.minSalary}
            onChange={(e) =>
              setFilters({ ...filters, minSalary: Number(e.target.value) })
            }
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-500 outline-none ring-sky-100 transition focus:ring-2 focus:ring-sky-300"
          />
          <input
            type="number"
            placeholder="Max"
            value={filters.maxSalary}
            onChange={(e) =>
              setFilters({ ...filters, maxSalary: Number(e.target.value) })
            }
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-500 outline-none ring-sky-100 transition focus:ring-2 focus:ring-sky-300"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-xs font-medium uppercase tracking-wide text-slate-500">
          Distance (0–50 km)
        </label>
        <input
          type="range"
          min="0"
          max="50"
          value={filters.maxDistance}
          onChange={(e) =>
            setFilters({ ...filters, maxDistance: Number(e.target.value) })
          }
        />
        <p className="text-xs text-slate-500">
          Within <span className="font-semibold">{filters.maxDistance} km</span>{" "}
          of Jaipur center
        </p>
      </div>

      <button
        onClick={() =>
          setFilters({
            company: "",
            types: [],
            minSalary: 0,
            maxSalary: 2000,
            maxDistance: 50,
          })
        }
        className="inline-flex w-full items-center justify-center rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:border-slate-300"
      >
        Reset Filters
      </button>
    </div>
  );
}