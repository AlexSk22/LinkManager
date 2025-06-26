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
import { Car } from 'lucide-react';
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
                <Card>
                    <CardContent>
                        <CardTitle>
                            Recent
                        </CardTitle>
                        <CardDescription>

                        </CardDescription>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 rounded-xl p-4 overflow-x-auto">

                            {resultLink?.map(el =>
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
                                        <CardDescription>
                                            {el.tags.map(tag => (
                                                <Badge className="m-1">{tag.tagname}</Badge>
                                            ))}
                                        </CardDescription>
                                    </CardContent>
                                </Card>
                            )}
                        </div>

                    </CardContent>
                </Card>
                <Card>
                    <CardContent>
                        <CardTitle>
                            Tags
                        </CardTitle>
                        <CardDescription>

                        </CardDescription>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 rounded-xl p-4 overflow-x-auto">

                            {resultTag?.map(el =>
                                <a href={'/links' + '/'+el.tagname}>
                                    <Card>
                                        <CardContent>
                                            <CardTitle>
                                                {el.tagname}
                                            </CardTitle>
                                            <br/>
                                            <CardDescription>
                                                Items {el.links_count}
                                            </CardDescription>
                                        </CardContent>
                                    </Card>
                                </a>
                            )}
                        </div>

                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
