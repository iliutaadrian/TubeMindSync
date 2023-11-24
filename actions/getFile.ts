import { currentUser } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import {
  db,
  Entry,
  EntryTable,
  EntryTranslation,
  EntryTranslationTable,
  ProjectFileTable,
  ProjectTable,
} from "@/lib/db";

const getFile = async (fileId: string) => {
  const user = await currentUser();

  if (!user?.id) {
    return null;
  }

  try {
    const projectFileId = await db.select().from(ProjectFileTable).where(
      eq(ProjectFileTable.id, parseInt(fileId)),
    );

    const projectId = projectFileId[0].projectId;

    const project = await db
      .select()
      .from(ProjectTable)
      .where(eq(ProjectTable.id, parseInt(projectId)));

    const rows = await db
      .select({
        entry: EntryTable,
        translation: EntryTranslationTable,
      })
      .from(EntryTable)
      .where(eq(EntryTable.projectId, projectId))
      .leftJoin(
        EntryTranslationTable,
        eq(EntryTable.id, EntryTranslationTable.entryId),
      );

    const entriesReducer = rows.reduce<
      Record<number, { entry: Entry; translations: EntryTranslation[] }>
    >(
      (acc, row) => {
        const entry = row.entry;
        const translation = row.translation;

        if (!acc[entry.id]) {
          acc[entry.id] = { entry, translations: [] };
        }

        if (translation) {
          acc[entry.id].translations.push(translation);
        }

        return acc;
      },
      {},
    );

    const availableLanguages = project[0].availableLanguages.split(",").filter(
      (lang) => lang !== project[0].defaultLanguage,
    );
    const languageHash = availableLanguages.reduce((hash, language) => {
      hash[language] = "";
      return hash;
    }, {});

    const entries = Object.values(entriesReducer).flatMap(
      ({ entry, translations }) => {
        const translationValues = { ...languageHash }; // Initialize languageHashAux for each pass

        translations.map((entryTranslation) => {
          translationValues[entryTranslation.language] = entryTranslation.value;
        });

        return {
          ...entry,
          translations,
          translationValues,
        };
      },
    );

    const entriesSize = entries.length;

    let wordCount = 0
    let translatedCount = 0
    let reviewedCount = 0

    entries.forEach((entry) => {
      wordCount += entry.value.split(' ').length
      translatedCount += entry.status === 'done' ? 1 : 0
      reviewedCount += entry.status === 'review' ? 1 : 0
    })

    let translatedPercent = wordCount > 0 ? ((translatedCount / wordCount) * 100).toFixed(0) : 0
    let reviewedPercent = wordCount > 0 ? ((reviewedCount / wordCount) * 100).toFixed(0) :  0
    const details = [
      {
        name: "Entries",
        value: entriesSize,
      },
      {
        name: "Words",
        value: wordCount,
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
      ...projectFileId[0],
      project: project[0],
      entries,
      details,
    };
  } catch (error: any) {
    console.log(error);
    return null;
  }
};

export default getFile;
