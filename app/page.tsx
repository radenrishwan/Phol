"use client";

import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable";

import { useRef, useEffect, useState } from "react";
import NavigationBar from "@/components/ui/nav";
import LeftPaneComponent from "@/components/main/left-pane-component";
import RightPaneComponent from "@/components/main/right-pane-component";
import { getHistory, History } from "@/lib/db/result";
import { initDB } from "@/lib/db/db";

type View = "code" | "view";

export default function Home() {
    const navRef = useRef<HTMLHtmlElement>(null);
    const fileRef = useRef<HTMLInputElement>(null);

    const [navHeight, setNavHeight] = useState(0);
    const [prompt, setPrompt] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [view, setView] = useState<View>("view");

    const [history, setHistory] = useState<History[]>([]);

    const [isDBReady, setIsDBReady] = useState(false);

    useEffect(() => {
        initDB().then(async () => {
            setIsDBReady(true);

            // get all history
            const history = await getHistory();
            setHistory(history);
        });
    }, []);

    const [resultComponent, setResultComponent] = useState("");

    useEffect(() => {
        if (navRef.current) {
            setNavHeight(navRef.current.clientHeight);
        }
    }, []);

    return (
        <>
            <NavigationBar
                navRef={navRef}
                isHistoryReady={isDBReady}
                history={history}
            />
            <main>
                <ResizablePanelGroup direction="horizontal">
                    <ResizablePanel defaultSize={70}>
                        <LeftPaneComponent
                            navHeight={navHeight}
                            resultComponent={resultComponent}
                            view={view}
                            setView={setView}
                            loading={isLoading}
                        />
                    </ResizablePanel>
                    <ResizableHandle />
                    <ResizablePanel defaultSize={30}>
                        <RightPaneComponent
                            setPrompt={setPrompt}
                            prompt={prompt}
                            setIsLoading={setIsLoading}
                            setResultComponent={setResultComponent}
                            fileRef={fileRef}
                            isLoading={isLoading}
                            onGenerateSuccess={() => {
                                // update history
                                getHistory().then((history) => {
                                    setHistory(history);
                                });
                            }}
                        />
                    </ResizablePanel>
                </ResizablePanelGroup>
            </main>
        </>
    );
}
