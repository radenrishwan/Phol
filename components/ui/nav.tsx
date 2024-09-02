import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { Button } from "./button";
import { RefObject } from "react";
import SettingComponent from "../main/setting-component";
import HistoryComponent from "../main/history-component";
import { ComponentGenerate } from "@/lib/const";

type NavigationBarProps = {
    navRef: RefObject<HTMLElement>;
    isHistoryReady: boolean;
    history: ComponentGenerate[];
};

export default function NavigationBar({
    navRef,
    isHistoryReady,
    history,
}: NavigationBarProps) {
    return (
        <nav className="bg-white shadow-sm" ref={navRef}>
            <div className="w-full container mx-auto flex justify-between py-4">
                <div className="flex">
                    <div className="flex-shrink-0 flex items-center">
                        <span className="text-xl font-bold">Phol.</span>
                    </div>
                </div>
                <div className="hidden sm:ml-6 sm:flex sm:items-center">
                    {isHistoryReady ? (
                        <HistoryComponent historyList={history} />
                    ) : (
                        <></>
                    )}
                    <Button variant="outline" className="ml-3">
                        <GitHubLogoIcon className="mr-3" />
                        Github
                    </Button>
                    <SettingComponent />
                </div>
            </div>
        </nav>
    );
}
