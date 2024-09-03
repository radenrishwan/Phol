import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { History } from "@/lib/db/result";
import { htmlFormat } from "@/lib/view";

type props = {
    history: History;
};

export default function HistoryCard({ history }: props) {
    const date = new Date(history.date).toLocaleDateString("en-GB");
    const truncate = (str: string, n: number) => {
        return str.length > n ? str.substring(0, n) + "..." : str;
    };

    return (
        <Link prefetch={false} href={"/history/" + history.date}>
            <Card>
                <CardHeader>
                    <CardTitle>{date}</CardTitle>
                </CardHeader>
                <CardContent>
                    <iframe
                        srcDoc={htmlFormat(history.html)}
                        className="w-full h-[30rem] mb-4 rounded-md overflow-hidden"
                        height={270}
                        width={480}
                        style={{ zoom: 0.3 }}
                    />
                    <CardDescription>
                        {truncate(history.prompt, 100)}
                    </CardDescription>
                </CardContent>
            </Card>
        </Link>
    );
}
