import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import ModelComponent from "@/components/main/model-component";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { geminiApiKeyCookie } from "@/lib/const";
import { getCookie } from "@/components/ui/cookie";
import { useToast } from "@/hooks/use-toast";
import { generateWithGemini } from "@/lib/ai/gemini";
import { htmlInstruction } from "@/lib/ai/instruction";
import { saveHistory } from "@/lib/db/result";

type RightPaneComponentProps = {
    fileRef: React.RefObject<HTMLInputElement>;
    setPrompt: (prompt: string) => void;
    isLoading: boolean;
    setIsLoading: (isLoading: boolean) => void;
    prompt: string;
    setResultComponent: (html: string) => void;
    onGenerateSuccess: () => void;
};

export default function RightPaneComponent({
    fileRef,
    setPrompt,
    isLoading,
    setIsLoading,
    prompt,
    setResultComponent,
    onGenerateSuccess,
}: RightPaneComponentProps) {
    const { toast } = useToast();

    const onGenerate = () => {
        const geminiApiKey = getCookie(geminiApiKeyCookie);

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
                const base64 = e.target?.result as string;

                resultFile = base64;
            };
            reader.readAsDataURL(file);
        }

        generateWithGemini(prompt, resultFile, htmlInstruction) // TODO: made it dynamic instruction later
            .then((html) => {
                setResultComponent(html);
                setIsLoading(false);

                saveHistory({
                    html: html,
                    date: Date.now(),
                    prompt: prompt,
                });

                onGenerateSuccess();
            })
            .catch((err) => {
                setIsLoading(false);
                toast({
                    title: "Oops, something went wrong!",
                    description: err.message,
                });
            });
    };

    return (
        <div className="flex flex-col h-full p-6 space-y-6">
            <ModelComponent />
            <div
                className="flex flex-col items-start gap-4 w-full max-w-sm"
                ref={fileRef}
            >
                <Label htmlFor="image">Image</Label>
                <Input id="image" type="file" accept="image/*" />
            </div>
            <div className="flex items-center space-x-2">
                <Switch id="export-mode" />
                <Label htmlFor="export-mode">Export function as default</Label>
            </div>
            <Textarea
                className="h-[8rem]"
                placeholder="Type your prompt here."
                onChange={(e) => setPrompt(e.target.value)}
            />
            <Button onClick={() => onGenerate()} disabled={isLoading}>
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
    );
}
