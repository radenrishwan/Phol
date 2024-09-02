"use client";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { geminiApiKeyCookie } from "@/lib/const";
import { GearIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { getCookie } from "../ui/cookie";

export default function SettingComponent() {
    const [geminiKey, setGeminiKey] = useState("");

    const handleGeminiKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setGeminiKey(e.target.value);
        saveGeminiKey();
    };

    const saveGeminiKey = () => {
        document.cookie = `${geminiApiKeyCookie}=${geminiKey}; path=/; max-age=31536000`;
    };

    useEffect(() => {
        setGeminiKey(getCookie(geminiApiKeyCookie) ?? "");
    }, []);

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" className="ml-3">
                    <GearIcon className="mr-3" />
                    Settings
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Settings</DialogTitle>
                    <DialogDescription>
                        Update your model setting here.
                    </DialogDescription>
                </DialogHeader>
                <Label htmlFor="gemini-key">Gemini</Label>
                <Input
                    id="gemini-key"
                    placeholder="API Key"
                    value={geminiKey}
                    onChange={handleGeminiKeyChange}
                    onKeyUp={() => saveGeminiKey()}
                    onKeyDown={() => saveGeminiKey()}
                />
                <DialogFooter>
                    <DialogClose asChild>
                        <Button type="submit" onClick={saveGeminiKey}>
                            Save Changes
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
