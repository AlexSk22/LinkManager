import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Link } from '@/types/link';
import { Tag } from '@/types/tag';
import { TagPageProp } from '@/types/tag-page-prop';
import { Head, usePage } from '@inertiajs/react';
import axios from 'axios';
import { Badge } from 'lucide-react';
import { useEffect, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Home',
        href: '/dashboard',
    },
];

export default function TagFolder() {


    /* It works but why????? */
    const { props } = usePage<TagPageProp>();

    const [resultTag, setResultTag] = useState<Tag>();
    useEffect(() => {
        axios.get(`/tag/${props.tagname}`)
            .then(res => {
                setResultTag(res.data[0]);
                console.log(res.data[0]);
            })
            .catch(err => {
                console.error('Error fetching links:', err);
            });
    }, [props.tagname]);
    return (
        <AppLayout >
            <Head title="Home" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                <Card>
                    <CardContent>
                        <CardDescription>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 rounded-xl p-4 overflow-x-auto">

                                {resultTag?.links.map(el =>
                                    <Card key={el.id}>
                                        <CardContent>
                                            <CardTitle>
                                                {el.name}
                                            </CardTitle>
                                            <br />
                                            <CardDescription>
                                                <a href={el.link}>{el.link}</a>
                                            </CardDescription>
                                        </CardContent>
                                    </Card>
                                )}

                            </div>
                        </CardDescription>
                    </CardContent>
                </Card>
            </div>
        </AppLayout >
    );
}
