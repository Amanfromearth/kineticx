import OpenAI from "openai";
import fetch from "node-fetch";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  headers: { "OpenAI-Organization": process.env.OPENAI_ORGANIZATION_ID },
});

const pexelsApiKey = process.env.PEXEL_API_KEY;

function convertContentToJson(contentString) {
  // Ensuring property names are quoted and unneeded commas are removed
  let formattedString = contentString
    .replace(/([{,]\s*)(\w+)(\s*:\s*["\{])/g, '$1"$2"$3')
    .replace(/,\s*}/g, "}")
    .replace(/,\s*\]/g, "]");
  try {
    const jsonArray = JSON.parse(formattedString);
    // Standardizing text property presentation
    jsonArray.forEach(item => {
      if (item.text && typeof item.text === 'string') {
        item.text = item.text.trim();
      }
    });
    return jsonArray;
  } catch (error) {
    console.error("Failed to parse JSON:", error);
    console.error("Problematic JSON string:", formattedString);
    return null;
  }
}

function splitWords(contentString) {
  // Regex to match words, 's, and emojis
  return contentString.match(/\b\w+'?s?\b|[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]+/gu);
}

async function fetchFirstPhoto(description) {
  const apiUrl = `https://api.pexels.com/v1/search?query=${encodeURIComponent(
    description
  )}&per_page=1`;
  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        Authorization: pexelsApiKey,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch photo");
    }

    const data = await response.json();
    return data.photos[0].src.large;
  } catch (error) {
    console.error("Error:", error);
  }
}


export async function POST(req, res) {
  const { formData } = await req.json();
  const response = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `I'm preparing a kinetic typography video that will explore the topic specified in ${formData}. To ensure the content is engaging and relevant, please provide a creative text entry of about 60 words.Also include emoji's. This text should encapsulate the essence of ${formData}, incorporating dynamic language that translates well visually and emotionally in a kinetic typography format. Give a conculsive ending Aim for a mix of impactful statements and visually descriptive phrases that can animate effectively on screen. Example-format: [{text:"abc"}]`,
      },
    ],
    model: "gpt-3.5-turbo",
  });
  console.log(response?.choices[0]?.message?.content)
  const result = convertContentToJson(response?.choices[0]?.message?.content);
  // const imageUrls = await Promise.all(
  //   resultList.map((item) => fetchFirstPhoto(item.description))
  // );

  const text = result[0].text;

  const wordList = splitWords(text);

  try {
    return new Response(JSON.stringify(wordList), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error sending the response:", error);
    return new Response(
      JSON.stringify({
        error: "Failed to send the response, please check the format.",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
