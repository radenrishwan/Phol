import { CodeIcon, EyeIcon } from "lucide-react";
import { Button } from "../button";
import CodeComponent from "./code-component";
import ViewComponent from "./view-component";

type RightPaneComponentProps = {
    view: "view" | "code";
    navHeight: number;
    resultComponent: string;
    setView: (view: "view" | "code") => void;
    loading: boolean;
};

export default function RightPaneComponent({
    view,
    navHeight,
    resultComponent,
    setView,
    loading,
}: RightPaneComponentProps) {
    return (
        <div
            className="relative w-full p-6 overflow-auto"
            style={{ height: `calc(100vh - ${navHeight}px)` }}
        >
            {loading ? (
                <div className="flex items-center justify-center h-full">
                    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
                </div>
            ) : (
                <>
                    {view === "view" ? (
                        <ViewComponent resultComponent={resultComponent} />
                    ) : (
                        <CodeComponent
                            code={resultComponent}
                            className="rounded-md p-2"
                        />
                    )}
                    <div className="absolute top-2 right-2 flex items-center space-x-2 bg-white p-1 rounded-md shadow-md border border-gray-200">
                        <Button
                            variant={view === "view" ? "secondary" : "ghost"}
                            size="sm"
                            onClick={() => setView("view")}
                        >
                            <EyeIcon />
                        </Button>
                        <Button
                            variant={view === "code" ? "secondary" : "ghost"}
                            size="sm"
                            onClick={() => setView("code")}
                        >
                            <CodeIcon />
                        </Button>
                    </div>
                </>
            )}
        </div>
    );
}
