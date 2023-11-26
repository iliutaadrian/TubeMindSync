export type UserClerk = {
  id: string;
  username: string | null | undefined;
  createdAt: number | null | undefined;
};
//
// export type FullProject = Project & {
//   files: FullProjectFile[]
// };
//
// export type FullProjectFile = ProjectFile & {
//   entries: FullEntryType[]
// }
//
// export type FullEntryType = Entry & {
//   translationValues: any;
// };

export const options = [
  {
    name: "Main Concept Explanation",
    key: "main-concept",
    value:
    "Main Concept Explanation:Break down the primary concept discussed in the video in a way that a 15-year-old can easily understand.",
  },
  {
    name: "Timeline Summary",
    key: "timeline-summary",
    value:
      "Timeline Summary:Provide a chronological summary of the video, including significant time markers.",
  },
  {
    name: "Key Insights",
    key: "key-insights",
    value:
      "Key Insights:Present the main 6 insights from the video in a bullet-point format.",
  },
  {
    name: "Best Quotes",
    key: "best-quotes",
    value:
      "Best Quotes:Extract and present notable quotes from the video that encapsulate key ideas.",
  },
  {
    name: "Assimilation Questions",
    key: "assimilation-questions",
    value:
      "Assimilation Questions:Create 5 questions that, when answered, will enhance the viewer's understanding and assimilation of the material.",
  },
  {
    name: "Q&A Based on Transcript",
    key: "qa-transcript",
    value:
      "Q&A Based on Transcript:Formulate questions and answers based on the content of the video transcript.",
  },
]
