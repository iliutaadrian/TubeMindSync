import { db, Entry, Project, ProjectFile } from "@/lib/db";
import { currentUser } from "@clerk/nextjs";
import { sql } from "drizzle-orm";

// Get project by id
// Returns project, files, and entries
const getProject = async (projectId: string) => {
  const user = await currentUser();

  if (!user?.id || !projectId) {
    return null;
  }

  try {
    const projectQuery = await db.execute(sql.raw(`
      SELECT *
      FROM projects
      WHERE id = '${projectId}';
    `));
    const project: Project = projectQuery.rows[0] as Project;

    const projectFilesQuery = await db.execute(sql.raw(`
      SELECT *
      FROM project_files
      WHERE project_id IN (
        ${project.id}
      )
    `));
    const files: ProjectFile[] = projectFilesQuery.rows as ProjectFile[];

    const entryQuery = await db.execute(sql.raw(`
      SELECT *
      FROM entries
      WHERE project_id IN (
        ${projectQuery.rows.map((project) => project.id).join(",")}
      )
    `));
    const entries: Entry[] = entryQuery.rows as Entry[];

    return {
      project,
      files,
      entries,
    };
  } catch (error: any) {
    console.log(error);
    return null;
  }
};

export default getProject;
