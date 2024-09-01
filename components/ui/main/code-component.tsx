import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";
import Empty from "../empty";

type CodeComponentProps = {
    code: string;
    className?: string;
};

export default function CodeComponent({ code, className }: CodeComponentProps) {
    if (!code.trim()) {
        return <Empty />;
    }

    return (
        <div
            className={`${className} w-full h-auto overflow-auto rounded-lg shadow-lg`}
        >
            <SyntaxHighlighter
                language="xml"
                style={oneLight}
                showLineNumbers={true}
                wrapLines={true}
                customStyle={{
                    margin: 0,
                    padding: "1.5rem",
                    fontSize: "0.875rem",
                    lineHeight: "1.5",
                    width: "max-content",
                    minWidth: "100%",
                }}
            >
                {code.trim()}
            </SyntaxHighlighter>
        </div>
    );
}
