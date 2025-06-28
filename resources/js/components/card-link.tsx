import { Link } from "@/types/link";
import { Card, CardContent, CardDescription, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Button } from "./ui/button";
import { Hand, Pen, Trash } from "lucide-react";

export interface LinkCardProps {
    link: Link
}

export default function CardLink({ link }: LinkCardProps) {

    const queryClient = useQueryClient();

    async function remove() {
        await axios.delete(`/link/${link.id}`);
    }

    function HandleRemove() {
        remove();
    }

    function HandleEdit(){

    }

    return (
        <Card>
            <CardContent>
                <div className="flex justify-between items-start">
                    <CardTitle>{link.name}</CardTitle>
                    <div className="flex gap-3">
                        <Button className="w-fit" variant="secondary" asChild>
                            <button type="submit" onClick={HandleEdit}><Pen></Pen></button>
                        </Button>
                        <Button className="w-fit" variant="destructive" asChild>
                            <button type="submit" onClick={HandleRemove}><Trash></Trash></button>
                        </Button>
                    </div>

                </div>
                <br />
                <CardDescription>
                    <a href={link.link}>{link.link}</a>
                </CardDescription>
                <br />
                <CardDescription>
                    {link.tags.map((el, i) => (
                        <Badge key={i} className="m-1">{el.tagname}</Badge>
                    ))}
                </CardDescription>
            </CardContent>
        </Card>
    );
}
