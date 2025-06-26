import { Card, CardContent } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "@/components/ui/button"
import { MultiSelect } from "./ui/multiselect";
import { useEffect, useState } from "react";
import axios from "axios";
import { Tag } from "@/types/tag";

export default function AddLink() {
    const [resultTag, setResultTag] = useState<Tag[] | null>();
    const [selectedTags, setSelectedTags] = useState<string[]>();
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


    return (

            <CardContent className='flex p-2 m-2 gap-5 w-full flex-col md:flex-row '>
                <Input placeholder='Name' />
                <Input placeholder='uri' />
                <MultiSelect isMulti
                    options={tagOptions}
                    onChange={(newValue) => {
                        console.log(newValue.map(el => el.value));
                        setSelectedTags(newValue.map(el => el.value));
                    }}></MultiSelect>
                <Button className="px-15">Add</Button>
            </CardContent>

    );

}
