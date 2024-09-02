import { toast } from "@/hooks/use-toast";
import {
    ComponentGenerate,
    historyDBName,
    historyDBVersion,
    historyStoreName,
} from "./const";

let db: IDBDatabase;
let request: IDBOpenDBRequest;

export function initDB(): Promise<boolean> {
    return new Promise((resolve, reject) => {
        request = indexedDB.open(historyDBName);

        request.onerror = () => {
            toast({
                title: "Oops, something went wrong!",
                description:
                    request.error?.message ??
                    "Look like something error while opening local database...",
            });
            reject(false);
        };

        request.onupgradeneeded = (event) => {
            // @ts-ignore
            db = event.target.result;

            if (!db.objectStoreNames.contains(historyStoreName)) {
                db.createObjectStore(historyStoreName, {
                    keyPath: "date",
                });
            }
        };

        request.onsuccess = (event) => {
            // @ts-ignore
            db = event.target.result;

            db.onerror = function () {
                toast({
                    title: "Oops, something went wrong!",
                    description:
                        "Look like something error while accessing local database...",
                });
                reject(false);
            };

            resolve(true);
        };
    });
}

export function savePrompt(component: ComponentGenerate) {
    // Create a new object store
    const transaction = db.transaction(historyStoreName, "readwrite");
    transaction.oncomplete = () => {
        toast({
            title: "Prompt saved",
            description: "Prompt saved successfully",
        });
    };

    transaction.onerror = () => {
        toast({
            title: "Oops, something went wrong!",
            description: "Look like something error while saving prompt...",
        });
    };

    const store = transaction.objectStore(historyStoreName);

    // Add the prompt to the object store
    store.add(component);

    // Clear the input fields
}

export function getPrompt(): Promise<ComponentGenerate[]> {
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
