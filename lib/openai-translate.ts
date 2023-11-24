import OpenAI from "openai/index";

// export const runtime = "edge";

// const openai = new OpenAI({
// 	apiKey: process.env.OPENAI_API_KEY,
// });

export const checkOpenAIKey = async (key: string) => {
  if (!key) {
    return false; // If no key is provided, return false
  }

  try {
    const openai = new OpenAI({
      apiKey: key,
    });

    await openai.completions.create({
      model: "text-davinci-003",
      stream: false,
      temperature: 1,
      max_tokens: 3,
      prompt: `Say ok.`,
    });
    return true;
  } catch (error) {
    return false;
  }
};

export const openaiTranslate = async (
  default_language: string,
  language: string,
  note: string,
  value: string,
  key: string,
) => {
  const openai = new OpenAI({
    apiKey: key,
  });
  const response = await openai.completions.create({
    model: "text-davinci-003",
    stream: false,
    temperature: 1,
    max_tokens: 300,
    prompt:
    `You are the best translator. You will receive a text in ${default_language}. You will translate the following text in ${language}. Take into consideration the following note points for translation: ${note}. Only respond with the translated text. Make sure to not add extra spaces. DO not include extra punctuation. Text: ${value}. Translated text:`,
  });

  return response.choices[0].text;
};
