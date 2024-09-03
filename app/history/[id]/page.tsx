"use client";

import { initDB } from "@/lib/db/db";
import { getHistory, getHistoryById } from "@/lib/db/result";
import { htmlFormat } from "@/lib/view";
import { useEffect, useState } from "react";

type props = {
    id: string;
};

export default function ShareIdComponent({ params }: { params: props }) {
    const [isDBReady, setIsDBReady] = useState(false);
    const [component, setComponent] = useState("");

    useEffect(() => {
        initDB().then(async () => {
            setIsDBReady(true);

            // get component
            getHistoryById(parseInt(params.id)).then((value) => {
                console.log(value);

                setComponent(value?.html ?? "");
            });
        });
    });

    if (isDBReady) {
        if (component === "") {
            return <div>Component not found</div>;
        }

        return (
            <iframe
                srcDoc={htmlFormat(component)}
                className="w-screen h-screen overflow-auto"
            />
        );
    } else {
        return <div>Loading...</div>;
    }
}
