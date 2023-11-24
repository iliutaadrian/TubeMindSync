import OpenAI from "openai/index";

export const segmentText = (inputText: string) => {
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
