"use client";

import { JobType } from "@/types/job";

interface Props {
  selected: JobType[];
  onChange: (types: JobType[]) => void;
}

const TYPES: JobType[] = ["Full-time", "Part-time", "Shift", "Contract"];

export default function TypeChips({ selected, onChange }: Props) {
  const toggle = (type: JobType) => {
    if (selected.includes(type)) {
      onChange(selected.filter((t) => t !== type));
    } else {
      onChange([...selected, type]);
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      {TYPES.map((type) => (
        <button
          key={type}
          onClick={() => toggle(type)}
          className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ring-1 transition ${
            selected.includes(type)
              ? "bg-sky-600 text-white ring-sky-600 shadow-sm"
              : "bg-slate-50 text-slate-700 ring-slate-200 hover:bg-slate-100"
          }`}
        >
          {type}
        </button>
      ))}
    </div>
  );
}