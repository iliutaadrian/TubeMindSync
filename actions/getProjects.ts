import { Entry, db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs";
import { sql } from "drizzle-orm";

const getProjects = async () => {
  const user = await currentUser();

  if (!user?.id) {
    return null;
  }

  try {
    const projectQuery = await db.execute(sql.raw(`
      SELECT *
      FROM projects
      WHERE user_id = '${user.id}';
    `));
    const projects = projectQuery.rows || [];

    const projectFilesQuery = await db.execute(sql.raw(`
      SELECT *
      FROM project_files
      WHERE project_id IN (
        ${
      projects.length
        ? projectQuery.rows.map((project) => project.id).join(",")
        : 0
    }
      )
    `));

    const entryQuery = await db.execute(sql.raw(`
      SELECT *
      FROM entries
      WHERE project_id IN (
        ${
      projects.length
        ? projectQuery.rows.map((project) => project.id).join(",")
        : 0
    }
      )
    `));
    const entries: Entry[] = entryQuery.rows as Entry[];
    const fileNumber = projectFilesQuery.rows.length;
    var projectCount = projects.length;
    let wordCount = 0;
    let translatedCount = 0;
    let reviewedCount = 0;

    entries.forEach((entry) => {
      wordCount += entry.value.split(" ").length;
      translatedCount += entry.status === "done" ? 1 : 0;
      reviewedCount += entry.status === "review" ? 1 : 0;
    });

    let translatedPercent = wordCount > 0
      ? ((translatedCount / wordCount) * 100).toFixed(0)
      : 0;
    let reviewedPercent = wordCount > 0
      ? ((reviewedCount / wordCount) * 100).toFixed(0)
      : 0;

    const details = [
      {
        name: "Projects",
        value: projectCount,
      },
      {
        name: "Files",
        value: fileNumber,
      },
      {
        name: "Translated",
        value: translatedPercent,
        percent: true,
      },
      {
        name: "Reviewed",
        value: reviewedPercent,
        percent: true,
      },
    ];

    return {
      projects,
      details,
    };
  } catch (error: any) {
    console.log(error);
    return null;
  }
};

export default getProjects;
