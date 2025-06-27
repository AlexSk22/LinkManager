import { CardContent } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "@/components/ui/button"
import { MultiSelectCreate } from "./ui/multiselect-create";
import { useEffect, useState } from "react";
import axios from "axios";
import { Tag } from "@/types/tag";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export default function AddLink() {

    const [resultTag, setResultTag] = useState<Tag[] | null>();
    const [selectedTags, setSelectedTags] = useState<string[]>();
    const [send, setSend] = useState<number>(1);

    const queryClient = useQueryClient();

    async function submit(formData: FormData) {
        const name = formData.get("Name");
        const uri = formData.get("Uri");
        const tags = formData.getAll("Tags");

        const payload = {
            name: name,
            link: uri,
            tags: tags,
        };

        await axios.post('/link', payload);
    }

    const mutation = useMutation({
        mutationFn: submit,
        onSuccess: () => {
            toast.success("Link added successfully!");
            queryClient.invalidateQueries({ queryKey: ['Links'] });
        },
        onError: (error) => {
            console.error("Submission failed:", error);
            toast.error("Failed to add link. Please try again.");
        }
    });


    useEffect(() => {
        axios.get('/tag')
            .then(res => {
                setResultTag(res.data);

            })
            .catch(err => {
                console.error('Error fetching links:', err);
            });
    }, []);

    const tagOptions = resultTag?.map(tag => ({
        value: tag.tagname,
        label: tag.tagname,
    })) || [];

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        mutation.mutate(formData);

        e.preventDefault();
        e.currentTarget.reset();
        setSelectedTags([]);
        setSend(send + 1);
    };

    return (

        <form
            onSubmit={handleSubmit}
        >
            <CardContent className='flex p-2 m-2 gap-5 w-full flex-col md:flex-row '>

                <Input name="Name" placeholder='Name' required />
                <Input name="Uri" placeholder='uri' required />
                <MultiSelectCreate
                    key={send}
                    required
                    isMulti
                    options={tagOptions}
                    name="Tags"
                    onChange={(newValue) => {
                        setSelectedTags(newValue.map(el => el.value));
                    }}></MultiSelectCreate>
                <Button
                    className="px-15"
                >Add</Button>

            </CardContent>

        </form>
    );

}
