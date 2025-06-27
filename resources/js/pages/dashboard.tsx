import AddLink from '@/components/add-link';
import CardCounter from '@/components/card-counter';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Link } from '@/types/link';
import { Tag } from '@/types/tag';
import { Head } from '@inertiajs/react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Home',
        href: '/dashboard',
    },
];



export default function Dashboard() {

    const [amountTags, setAmountTags] = useState<number>();
    const [amountLinks, setAmountLinks] = useState<number>();

    const queryClient = useQueryClient();

    const query = useQuery({
        queryKey: ['Links'], queryFn: async () => {
            return await axios.get('/user').then(res => {
                setAmountLinks(res.data.link_count);
                setAmountTags(res.data.tag_count);
            })
                .catch(err => {
                    console.error('Error fetching links:', err);
                });

        }
    });



    return (
        <AppLayout >
            <Head title="Home" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                <Card>
                    <CardContent className='content-center justify-center text-center align-middle h-full p-2' >
                        <CardTitle className='text-4xl p-2 m-2'>
                            Add Link
                        </CardTitle>
                        <AddLink />
                    </CardContent>
                </Card>
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <CardCounter title='Links' counter={amountLinks || 0} />
                    <CardCounter title='Tags' counter={amountTags || 0} />
                </div>
            </div>
        </AppLayout>
    );
}
