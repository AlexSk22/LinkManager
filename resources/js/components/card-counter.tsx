import { Card, CardContent, CardTitle } from "./ui/card";

export interface CardCounterProps {
    title: string;
    counter: number;
}

export default function CardCounter({ title, counter }: CardCounterProps) {
    return (
        <Card className="h-full">
            <CardContent className="flex flex-col items-center justify-center text-center h-full p-4">
                <CardTitle className="text-9xl font-bold">
                    {counter}
                </CardTitle>
                <CardTitle className="text-4xl mt-2">
                    {title}
                </CardTitle>
            </CardContent>
        </Card>
    );
}
