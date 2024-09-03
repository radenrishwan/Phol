import { toast } from "@/hooks/use-toast";
import { historyDBName, historyStoreName } from "../const";

export let db: IDBDatabase;
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
