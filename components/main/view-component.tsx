import { htmlFormat } from "@/lib/view";
import Empty from "../ui/empty";

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
