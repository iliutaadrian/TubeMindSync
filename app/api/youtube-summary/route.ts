import { checkOpenAIKey } from "@/lib/openai-translate";
import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import OpenAI from "openai/index";
import { YoutubeTranscript } from "youtube-transcript";

const options = [
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
    name: "Main Concept Explanation",
    key: "main-concept",
    value:
      "Main Concept Explanation:Break down the primary concept discussed in the video in a way that a 15-year-old can easily understand.",
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
];

export async function POST(
  request: Request,
) {
  const user = await currentUser();
  if (!user) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const body = await request.json();
  const { link, ok } = body;

  const isValidKey = await checkOpenAIKey(ok);

  if (!isValidKey) {
    return new NextResponse(
      "Bad OpenAI API key. Make sure to set it in settings.",
      { status: 401 },
    );
  }

  if (!link) {
    return new NextResponse("Bad Request", { status: 400 });
  }

  try {
    const transcriptYT = await YoutubeTranscript.fetchTranscript(link);
    const transcript = transcriptYT.map((item) => item.text).join(" ");

    if (!transcript) {
      return new NextResponse("No transcript", { status: 400 });
    }

    let summary = transcript;
    while (summary.length > 5000) {
      let segments = segmentText(summary);

      const segmentPromises = segments.map((segment) =>
        preprocessText(segment, ok)
      );
      const summaries = await Promise.all(segmentPromises);
      summary = summaries.join("");
    }

    const response = await Promise.all(
      options.map(async (option: any) => ({
        ...option,
        summary: await openaiSummary(summary, option.value, ok),
      })),
    );

    return new NextResponse(JSON.stringify(response), { status: 200 });
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

const segmentText = (inputText: string) => {
  const segments = [];
  const words = inputText.split(" ");

  let currentSegment = "";
  for (const word of words) {
    if ((currentSegment + word).length < 3000) {
      currentSegment += `${word} `;
    } else {
      segments.push(currentSegment.trim());
      currentSegment = `${word} `;
    }
  }

  if (currentSegment.trim().length > 0) {
    segments.push(currentSegment.trim());
  }

  return segments;
};

export const preprocessText = async (
  segment: string,
  key: string,
) => {
  const openai = new OpenAI({
    apiKey: key,
  });
  const response = await openai.completions.create({
    model: "text-davinci-003",
    stream: false,
    temperature: 1,
    max_tokens: 400,
    prompt:
      `You will receive a part of a video transcript. Clean up the transcript by removing any unnecessary filler words, repeated phrases, or irrelevant content. Only respond with the text. The part is:${segment}`,
  });

  return response.choices[0].text;
};

export const openaiSummary = async (
  transcript: string,
  option: string,
  key: string,
) => {
  const openai = new OpenAI({
    apiKey: key,
  });
  const response = await openai.completions.create({
    model: "text-davinci-003",
    stream: false,
    temperature: 1,
    max_tokens: 2000,
    prompt:
      `Include emojis if possible. Analyze the video transcript provided below and do the operation mentioned below. The response should be in the markdown format with a heading 3 and a list of items. Only include the response text. ${option}
      Video Transcript:${transcript}`,
  });

  return response.choices[0].text;
};
