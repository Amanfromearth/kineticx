import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  headers: { "OpenAI-Organization": process.env.OPENAI_ORGANIZATION_ID },
});

const convertContentToJson = (contentString) => {
  const trimmed = contentString.trim();
  if (trimmed.startsWith("[") && trimmed.endsWith("]")) {
    try {
      return JSON.parse(trimmed);
    } catch (error) {
      console.error("Failed to parse JSON:", error);
    }
  }
  return [{ text: trimmed }];
};

const splitWords = (contentString) => 
  contentString.match(/\b\w+'?s?\b|[\p{Emoji_Presentation}\p{Emoji}\p{Emoji_Modifier_Base}]/gu);

export async function POST(req) {
  try {
    const { formData } = await req.json();
    const response = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `Create a kinetic typography video script about ${formData}. Provide a creative text entry around 60+ words, including emojis. The output should be in this exact format:
[{"text":"Your 60-word script here, including emojis"}]
Ensure the content is engaging, visually descriptive, and suitable for kinetic typography. Include a mix of impactful statements and a conclusive ending.`,
        },
      ],
      model: "gpt-3.5-turbo",
    });

    const result = convertContentToJson(response.choices[0]?.message?.content);
    const wordList = splitWords(result[0].text);

    return new Response(JSON.stringify(wordList), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error processing request:", error);
    return new Response(
      JSON.stringify({
        error: "Failed to process the request. Please try again.",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
