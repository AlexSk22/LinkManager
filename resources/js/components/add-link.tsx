import { CardContent } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "@/components/ui/button"
import { MultiSelectCreate } from "./ui/multiselect-create";
import { useEffect, useState } from "react";
import axios from "axios";
import { Tag } from "@/types/tag";

export default function AddLink() {
    const [resultTag, setResultTag] = useState<Tag[] | null>();
    const [selectedTags, setSelectedTags] = useState<string[]>();
    const [send, setSend] = useState<number>(1);

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


    const submit =(e: React.FormEvent<HTMLFormElement>) => {
        const formData = new FormData(e.currentTarget);

        const name = formData.get("Name");
        const uri = formData.get("Uri");

        const payload = {
            name : name,
            link : uri,
            tags: selectedTags,
        };

        axios.post('/link',payload);
        console.log(payload);

        e.preventDefault();
        e.currentTarget.reset();
        setSelectedTags([]);
        setSend(send+1);
    }

    return (

        <form
            onSubmit={submit}
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
