import { Link } from "@/types/link";
import { Card, CardContent, CardDescription, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Button } from "./ui/button";
import { Check, Pen, Trash, X } from "lucide-react";
import { useRef, useState } from "react";
import { Input } from "./ui/input";
import { toast } from "sonner";

export interface LinkCardProps {
    link: Link
}

export default function CardLink({ link }: LinkCardProps) {

    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [name, setName] = useState<string>(link.name);
    const [url, setUrl] = useState<string>(link.link);

    const queryClient = useQueryClient();

    async function remove() {
        await axios.delete(`/link/${link.id}`);
    }
    async function edit() {
        const payload = {
            name: name,
            link: url,
        };
        await axios.put(`/link/${link.id}`, payload);
    }

    const editMutation = useMutation({
        mutationFn: edit,
        onSuccess: () => {
            toast.success("Link edited successfully!");
            queryClient.invalidateQueries({ queryKey: ['Links'] });
            setIsEditing(false);
        },
        onError: (error) => {
            console.error("Submission failed:", error);
            toast.error("Failed to edit link. Please try again.");
        }
    });

    const removeMutation = useMutation({
        mutationFn: remove,
        onSuccess: () => {
            toast.success("Link removed successfully!");
            queryClient.invalidateQueries({ queryKey: ['Links'] });
        },
        onError: (error) => {
            console.error("Submission failed:", error);
            toast.error("Failed to remove link. Please try again.");
        }
    });

    function HandleRemove() {
        removeMutation.mutate();
    }
    function HandleEdit() {
        if (isEditing) {
            editMutation.mutate();
            setIsEditing(false);
            return;
        }
        setIsEditing(true);
    }
    function cancel() {
        setIsEditing(false);
        setName(link.name);
        setUrl(link.link);
    }


    return (
        <>
            {
                isEditing ?
                    <Card>
                        <CardContent>
                            <div className="flex justify-between items-start">
                                <CardTitle><Input defaultValue={link.name} onChange={(e) => setName(e.currentTarget.value)} /></CardTitle>
                                <div className="flex gap-3">
                                    <Button className="w-fit" variant="secondary" asChild>
                                        <button type="submit" onClick={HandleEdit}><Check></Check></button>
                                    </Button>
                                    <Button className="w-fit" variant="destructive" asChild>
                                        <button type="submit" onClick={cancel}><X></X></button>
                                    </Button>
                                </div>
                            </div>
                            <br />
                            <CardDescription>
                                <Input defaultValue={link.link} onChange={(e) => setUrl(e.currentTarget.value)} />
                            </CardDescription>
                            <br />
                            <CardDescription>
                                {link.tags.map((el, i) => (
                                    <Badge key={i} className="m-1">{el.tagname}</Badge>
                                ))}
                            </CardDescription>
                        </CardContent >
                    </Card >
                    :
                    <Card>
                        < CardContent >
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
                        </CardContent >
                    </Card >
            }
        </>
    );
}
