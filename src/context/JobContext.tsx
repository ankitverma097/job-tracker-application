"use client";

import { useLocalStorage } from "@/hooks/UseLocalStorage";
import { createContext, useContext } from "react";


// have to define which value should be in context


interface JobContextType {
  appliedIds: string[];  
  applyJob: (id: string) => void; 
  withdrawJob: (id: string) => void;
}

//why interface : because of type safety(if wrong value passing it can give an error )


// creating container for globale state (to avoid prop drilling)

const JobContext = createContext<JobContextType | null>(null);

export function JobProvider({ children }: { children: React.ReactNode }) {
  const [appliedIds, setAppliedIds] = useLocalStorage<string[]>(
    "applied-jobs",
    []
  );

  const applyJob = (id: string) => {
    if (!appliedIds.includes(id)) {
      setAppliedIds([...appliedIds, id]);
    }
  };

  const withdrawJob = (id: string) => {
    setAppliedIds(appliedIds.filter((jobId) => jobId !== id));
  };

  return (
    <JobContext.Provider value={{ appliedIds, applyJob, withdrawJob }}>
      {children}
    </JobContext.Provider>
  );
}

export const useJobs = () => {
  const context = useContext(JobContext);
  if (!context) throw new Error("useJobs must be used inside JobProvider");
  return context;
};