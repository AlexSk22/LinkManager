import CardLink from '@/components/card-link';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { MultiSelect } from '@/components/ui/multiselect';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Link } from '@/types/link';
import { Tag } from '@/types/tag';
import { Head } from '@inertiajs/react';
import axios from 'axios';
import { useEffect, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Home',
        href: '/dashboard',
    },
];



export default function Links() {


    const [resultLink, setResultLink] = useState<Link[]>();
    const [resultTag, setResultTag] = useState<Tag[]>();
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [searchString, setSearchString] = useState<string>("");

    useEffect(() => {
        axios.get('/link')
            .then(res => {
                setResultLink(res.data);
            })
            .catch(err => {
                console.error('Error fetching links:', err);
            });
    }, []);
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

    const filteredLinks = selectedTags.length > 0?
        resultLink
            ?.filter(el => el.name.toLowerCase().includes(searchString.toLowerCase()))
            .filter(el => el.tags.some(t => selectedTags.includes(t.tagname) && el.tags.length >= selectedTags.length))
        :
        resultLink
            ?.filter(el => el.name.toLowerCase().includes(searchString.toLowerCase()))


    return (
        <AppLayout >

            <Head title="Home" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                <Card>
                    <CardContent>
                        <CardTitle>
                            Recent
                        </CardTitle>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 rounded-xl p-4 overflow-x-auto">

                            {
                                [...resultLink || []].reverse().slice(0, 4).map((el) =>
                                    <CardLink key={el.id} link={el} />
                                )}
                        </div>

                    </CardContent>
                </Card>
                <Card>
                    <CardContent>

                        <CardTitle>All Links</CardTitle>
                        <div className='m-4 flex gap-5'>
                            <Input placeholder='Search link by name' onChange={(e) => { setSearchString(e.currentTarget.value); }}></Input>
                            <MultiSelect
                                options={tagOptions}
                                onChange={(newValue) => {
                                    setSelectedTags(newValue.map(el => el.value));
                                }}></MultiSelect>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 rounded-xl p-4 overflow-x-auto">

                            {filteredLinks?.map((el) => (
                                <CardLink key={el.id} link={el} />
                           ))}
                            {filteredLinks?.length === 0 && (
                                <div>No links yet</div>
                            )}
                        </div>

                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
