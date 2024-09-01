import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { HistoryIcon } from "lucide-react";
import { Button } from "./button";
import SettingComponent from "./main/setting-component";
import { RefObject } from "react";

type NavigationBarProps = {
    navRef: RefObject<HTMLElement>;
};

export default function NavigationBar({ navRef }: NavigationBarProps) {
    return (
        <nav className="bg-white shadow-sm" ref={navRef}>
            <div className="w-full container mx-auto flex justify-between py-6">
                <div className="flex">
                    <div className="flex-shrink-0 flex items-center">
                        <span className="text-xl font-bold">Phol.</span>
                    </div>
                </div>
                <div className="hidden sm:ml-6 sm:flex sm:items-center">
                    <HistoryIcon className="mr-3" />
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
