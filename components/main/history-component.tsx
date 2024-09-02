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

import { HistoryIcon } from "lucide-react";
import HistoryCard from "./history-card";
import { ScrollArea } from "../ui/scroll-area";
import { ComponentGenerate } from "@/lib/const";

interface HistoryComponentProps {
    historyList: ComponentGenerate[];
}

export default function HistoryComponent({
    historyList,
}: HistoryComponentProps) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <button>
                    <HistoryIcon className="mr-3" />
                </button>
            </DialogTrigger>
            <DialogContent className="w-full h-[80vh]">
                <DialogHeader>
                    <DialogTitle>History</DialogTitle>
                    <DialogDescription>
                        See all components you&apos;ve generated.
                    </DialogDescription>
                </DialogHeader>
                <ScrollArea>
                    <div className="flex flex-col gap-6">
                        {historyList.map((item) => (
                            <HistoryCard history={item} key={item.date} />
                        ))}
                    </div>
                </ScrollArea>
                <DialogFooter className="sm:justify-start">
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">
                            Close
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
