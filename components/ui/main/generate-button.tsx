import { GoogleGenerativeAI } from "@google/generative-ai";
import { getCookie } from "../cookie";
import { geminiApiKeyCookie, modelUsedCookie } from "@/lib/const";
import { modelList } from "@/lib/model";

const instruction = `
    You are an expert frontend developer and UI/UX specialist. Your task is to generate a HTML CODE and Tailwind CSS. Adhere strictly to the guidelines below, and respond with only the code.

    Instructions:
    Data: Use placeholders and static content. Do not use dynamic data or props.
    Styling: Apply responsive design using Tailwind CSS. Use inline Tailwind classes for styling.
    Structure: Write a single functional component. Keep the code concise and focused.
    HTML Specifics:
        - Use <img> instead of <Image>.
        - Use <a> instead of <Link>.
        - When using <a> or <button>, set the href attribute to "#" or "javascript:void(0)".
    Design System: Follow Apple’s Design Guidelines (Cupertino). If an image layout is provided, adapt it to Cupertino design principles.
    Images & Icons: Use images and icons from https://placehold.co/ .
    Text Content: Use lorem ipsum for titles and descriptions unless specific text is provided.
    Code Quality: Ensure the code is clean and complete—do not send unfinished code.
    Code Templates:
        - HTML:
        ~~~html
        // ... all HTML code
        ~~~

    Answer format:
        { .. // HTML CODE }

    Note: when image is provided in prompt, use the same layout.

    This version emphasizes expertise in frontend development and UI/UX design while making the instructions clearer and more focused on quality.
`;

function fileToGenerativePart(path: string, mimeType: string) {
    return {
        inlineData: {
            data: path,
            mimeType,
        },
    };
}

export async function generateWithGemini(
    prompt: string,
    file: string | null,
): Promise<string> {
    const geminiApiKey = getCookie(geminiApiKeyCookie);
    const modelUsed = getCookie(modelUsedCookie);

    const genAI = new GoogleGenerativeAI(geminiApiKey ?? "");

    const model = genAI.getGenerativeModel({
        model: modelUsed ?? modelList[0].value,
        systemInstruction: instruction,
    });

    if (prompt === "") {
        return "";
    }

    if (file != null) {
        const image = fileToGenerativePart("", "image/jpg");

        const result = await model.generateContent([image, prompt]);

        const resultText = result.response
            .text()
            .replace(/```/g, "")
            .replace("html", "");

        return resultText;
    }

    const result = await model.generateContent(prompt);

    // remove code block markdown
    const resultText = result.response
        .text()
        .replace(/```/g, "")
        .replace("html", "");

    return resultText;
}
