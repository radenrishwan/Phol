type buildPromptProps = {
    guide: string;
    instruction: string[];
    template: string;
    answerTemplate: string;
};

const buildSystemPrompt = ({
    answerTemplate,
    guide,
    instruction,
    template,
}: buildPromptProps): string => {
    const ins = instruction.map((item) => `- ${item}`).join("\n");

    return `
You are an expert frontend developer and UI/UX specialist. ${guide}

Adhere strictly to the guidelines below, and respond with only the code.
- Images & Icons: For image you can use it from https://placehold.co/. For the icon, you can use lucide icons or radix-ui or react-icons.
- Text Content: Use lorem ipsum for titles and descriptions unless specific text is provided.
- Code Quality: Ensure the code is clean and complete—do not send unfinished code.
- Data: Use placeholders and static content. Do not use dynamic data or props.
- Text Content: Use lorem ipsum for titles and descriptions unless specific text is provided.
- Structure: Write a single functional component. Keep the code concise and focused.
${ins}

Code Templates:
${template}

Answer format:
${answerTemplate}

Note: when image is provided in prompt, use the same layout.

This version emphasizes expertise in frontend development and UI/UX design while making the instructions clearer and more focused on quality.'
`.trim();
};

const buildInstruction = (title: string, description: string) => {
    return `${title}:${description}`;
};

export const htmlInstruction = buildSystemPrompt({
    instruction: [
        buildInstruction(
            "HTML Specification",
            "when <src> is provided, set href to #.",
        ),
        buildInstruction(
            "Styling",
            "Apply responsive design using Tailwind CSS. Use inline Tailwind classes for styling.",
        ),
    ],
    guide: "Your task is to generate a HTML code and Tailwind CSS.",
    template: `
~~~html
// HTML CODE HERE
~~~
`.trim(),
    answerTemplate: `
~~~html
// HTML CODE HERE
~~~
`.trim(),
});
