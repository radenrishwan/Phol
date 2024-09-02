import Image from "next/image";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { ComponentGenerate } from "@/lib/const";

type props = {
    history: ComponentGenerate;
};

export default function HistoryCard({ history }: props) {
    // show date like dd/mm/yyyy
    const date = new Date(history.date).toLocaleDateString("en-GB");

    return (
        <Card>
            <CardHeader>
                <CardTitle>{date}</CardTitle>
            </CardHeader>
            <CardContent>
                <Image
                    src="https://placehold.co/480x270"
                    alt="Placeholder"
                    className="w-full h-auto mb-4 rounded-md"
                    height={270}
                    width={480}
                />
                <CardDescription>{history.prompt}</CardDescription>
            </CardContent>
        </Card>
    );
}
