"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import ModelComponent from "@/components/ui/main/model-component";
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useRef, useEffect, useState } from "react";
import { generateWithGemini } from "@/components/ui/main/generate-button";
import { Input } from "@/components/ui/input";
import NavigationBar from "@/components/ui/nav";
import { Loader2 } from "lucide-react";
import RightPaneComponent from "@/components/ui/main/right-pane-component";
import { useToast } from "@/hooks/use-toast";
import { geminiApiKeyCookie } from "@/lib/const";
import { getCookie } from "@/components/ui/cookie";

type View = "code" | "view";

export default function Home() {
    const navRef = useRef<HTMLHtmlElement>(null);
    const fileRef = useRef<HTMLInputElement>(null);
    const [navHeight, setNavHeight] = useState(0);
    const [prompt, setPrompt] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [view, setView] = useState<View>("view");

    const { toast } = useToast();

    const [resultComponent, setResultComponent] = useState("");

    useEffect(() => {
        if (navRef.current) {
            setNavHeight(navRef.current.clientHeight);
        }
    }, []);

    return (
        <>
            <NavigationBar navRef={navRef} />
            <main>
                <ResizablePanelGroup direction="horizontal">
                    <ResizablePanel defaultSize={70}>
                        <RightPaneComponent
                            navHeight={navHeight}
                            resultComponent={resultComponent}
                            view={view}
                            setView={setView}
                            loading={isLoading}
                        />
                    </ResizablePanel>
                    <ResizableHandle />
                    <ResizablePanel defaultSize={30}>
                        <div className="flex flex-col h-full p-6 space-y-6">
                            <ModelComponent />
                            <div
                                className="flex flex-col items-start gap-4 w-full max-w-sm"
                                ref={fileRef}
                            >
                                <Label htmlFor="image">Image</Label>
                                <Input
                                    id="image"
                                    type="file"
                                    accept="image/*"
                                />
                            </div>
                            <div className="flex items-center space-x-2">
                                <Switch id="export-mode" />
                                <Label htmlFor="export-mode">
                                    Export function as default
                                </Label>
                            </div>
                            <Textarea
                                className="h-[8rem]"
                                placeholder="Type your prompt here."
                                onChange={(e) => setPrompt(e.target.value)}
                            />
                            <Button
                                onClick={() => {
                                    const geminiApiKey =
                                        getCookie(geminiApiKeyCookie);

                                    if (!geminiApiKey) {
                                        toast({
                                            title: "Oops, something went wrong!",
                                            description:
                                                "You need to set your Gemini API key in setting to use the model.",
                                        });
                                        return;
                                    }

                                    setIsLoading(true);

                                    var resultFile: string | null = null;

                                    const file = fileRef.current?.files?.[0];
                                    if (file) {
                                        const reader = new FileReader();
                                        reader.onload = (e) => {
                                            const base64 = e.target
                                                ?.result as string;

                                            resultFile = base64;
                                        };
                                        reader.readAsDataURL(file);
                                    }

                                    generateWithGemini(prompt, resultFile)
                                        .then((html) => {
                                            setResultComponent(html);
                                            setIsLoading(false);
                                        })
                                        .catch((err) => {
                                            setIsLoading(false);
                                            toast({
                                                title: "Oops, something went wrong!",
                                                description: err.message,
                                            });
                                        });
                                }}
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Creating...
                                    </>
                                ) : (
                                    "Create"
                                )}
                            </Button>
                        </div>
                    </ResizablePanel>
                </ResizablePanelGroup>
            </main>
        </>
    );
}
