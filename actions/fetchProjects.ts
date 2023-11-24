import { Project } from "@/lib/db";
import axios from "axios";

export const fetchProjects = async () => {
  console.log("CALLING FETCH PROJECTS");
  try {
    const { data } = await axios.get('/api/projects/read');
    console.log(data);
    const projects: Project[] = data.projects as Project[];
    const details = data.details;
    return { projects, details };
  } catch (error) {
    throw new Error('Failed to fetch projects');
  }
};
