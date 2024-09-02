import Empty from "../ui/empty";

const htmlFormat = (body: string) =>
    `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tailwind CSS Example</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body>
    ${body}
</body>
</html>
`.trim();

interface ViewComponentProps {
    resultComponent: string;
}

export default function ViewComponent({ resultComponent }: ViewComponentProps) {
    return (
        <div className="w-full h-full">
            {resultComponent ? (
                <iframe
                    srcDoc={htmlFormat(resultComponent)}
                    className="w-full h-full border-0 rounded-lg shadow-md"
                    title="Generated Component"
                />
            ) : (
                <Empty />
            )}
        </div>
    );
}
