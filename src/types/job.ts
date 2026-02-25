export type JobType = "Full-time" | "Part-time" | "Shift" | "Contract";


// creating interface for type safety for location and job in which i have to define the type 

export interface Location {
  lat: number;
  lon: number;
}

export interface Job {
  id: string;
  company: string;
  title: string;
  type: JobType;
  salary: number;
  location: Location;
  distance?: number;
}