import AddLink from '@/components/add-link';
import CardCounter from '@/components/card-counter';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
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



export default function Dashboard() {


    const [resultLink, setResultLink] = useState<Link[]>();
    const [resultTag, setResultTag] = useState<Tag[]>();
    const [searchString, setSearchString] = useState<string>();
    const [searchTags, setSearchTags] = useState<Tag[]>();

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
    return (
        <AppLayout >

            <Head title="Home" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                {
                    resultLink?.map(el =>
                        <Card key={el.id}>
                            <CardContent>
                                <CardTitle>
                                    {el.name}
                                </CardTitle>
                                <br />
                                <CardDescription>
                                    <a href={el.link}>{el.link}</a>
                                </CardDescription>
                                <br />
                                <CardDescription className=''>
                                    {el.tags.map(tag => (
                                        <Badge className="m-1">{tag.tagname}</Badge>
                                    ))}
                                </CardDescription>

                            </CardContent>
                        </Card>
                    )
                }
            </div>
        </AppLayout>
    );
}
