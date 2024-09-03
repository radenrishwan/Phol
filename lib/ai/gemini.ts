import { GoogleGenerativeAI } from "@google/generative-ai";
import { geminiApiKeyCookie, modelUsedCookie } from "@/lib/const";
import { modelList } from "@/lib/model";
import { getCookie } from "@/components/ui/cookie";

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
    instruction: string,
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
            .replace("html", "")
            .replace("ts", "")
            .replace("js", "")
            .replace("~~~", "");

        return resultText;
    }

    const result = await model.generateContent(prompt);

    // remove code block markdown
    const resultText = result.response
        .text()
        .replace(/```/g, "")
        .replace("html", "")
        .replace("ts", "")
        .replace("js", "")
        .replace("~~~", "");

    return resultText;
}
