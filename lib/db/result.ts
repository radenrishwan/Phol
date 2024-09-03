import { toast } from "@/hooks/use-toast";
import { historyStoreName } from "../const";
import { db } from "./db";

export type History = {
    html: string;
    prompt: string;
    date: number;
};

export function saveHistory(component: History) {
    const transaction = db.transaction(historyStoreName, "readwrite");
    // transaction.oncomplete = () => {
    //     toast({
    //         title: "Component saved",
    //         description: "Component saved successfully",
    //     });
    // };

    transaction.onerror = () => {
        toast({
            title: "Oops, something went wrong!",
            description: "Look like something error while saving prompt...",
        });
    };

    const store = transaction.objectStore(historyStoreName);

    store.add(component);
}

export function getHistory(): Promise<History[]> {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(historyStoreName, "readonly");

        const store = transaction.objectStore(historyStoreName);
        const request = store.getAll();

        request.onerror = () => {
            toast({
                title: "Oops, something went wrong!",
                description:
                    "Look like something error while getting prompt...",
            });
            reject();
        };

        request.onsuccess = () => {
            resolve(request.result);
        };
    });
}

export function getHistoryById(id: number): Promise<History | undefined> {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(historyStoreName, "readonly");

        const store = transaction.objectStore(historyStoreName);
        const request = store.get(id);

        request.onerror = () => {
            toast({
                title: "Oops, something went wrong!",
                description:
                    "Look like something error while getting prompt by id...",
            });
            reject();
        };

        request.onsuccess = () => {
            resolve(request.result);
        };
    });
}
