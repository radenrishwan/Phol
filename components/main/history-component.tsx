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
import { useState } from "react";
import { History } from "@/lib/db/result";

interface HistoryComponentProps {
    historyList: History[];
}
export default function HistoryComponent({
    historyList,
}: HistoryComponentProps) {
    const [visibleItems, setVisibleItems] = useState(6);

    const loadMore = () => {
        setVisibleItems((prevState) => prevState + 6);
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <button>
                    <HistoryIcon className="mr-3" />
                </button>
            </DialogTrigger>
            <DialogContent className="min-w-[70vw] max-h-[80vh] overflow-auto">
                <DialogHeader>
                    <DialogTitle>History</DialogTitle>
                    <DialogDescription>
                        See all components you&apos;ve generated.
                    </DialogDescription>
                </DialogHeader>
                {historyList.length > 0 ? (
                    <div className="grid grid-cols-3 gap-6 w-full">
                        {historyList.slice(0, visibleItems).map((item) => (
                            <HistoryCard history={item} key={item.date} />
                        ))}
                    </div>
                ) : (
                    <p className="text-muted-foreground text-sm text-center p-12">
                        No components generated yet...
                    </p>
                )}
                {historyList.length > visibleItems && (
                    <Button
                        onClick={loadMore}
                        type="button"
                        variant="secondary"
                    >
                        Load More
                    </Button>
                )}
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
