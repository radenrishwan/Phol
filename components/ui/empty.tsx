import { Lightbulb } from "lucide-react";

export default function Empty() {
    return (
        <div className="relative flex flex-col items-center justify-center h-full gap-4 p-8">
            <Lightbulb height={48} width={48} className="text-indigo-500" />
            <h3 className="text-2xl font-semibold text-gray-800">
                No content yet
            </h3>
            <p className="text-gray-600 text-center max-w-md">
                Get started by generating some content. Your creations will
                appear here.
            </p>
        </div>
    );
}
