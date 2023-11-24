import axios from "axios";

export const fetchProjects = async () => {
  console.log("CALLING FETCH PROJECTS");
  try {
    const { data } = await axios.get('/api/projects/read');
    console.log(data);
    const details = data.details;
    return {};
  } catch (error) {
    throw new Error('Failed to fetch projects');
  }
};
