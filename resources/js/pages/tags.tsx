import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardTitle } from '@/components/ui/card';
import { MultiSelect } from '@/components/ui/multiselect';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Link } from '@/types/link';
import { Tag } from '@/types/tag';
import { Head } from '@inertiajs/react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Home',
        href: '/dashboard',
    },
];



export default function Links() {

    const queryClient = useQueryClient();

    const [resultTag, setResultTag] = useState<Tag[]>();
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

    const queryTags = useQuery({
        queryKey: ['Tags'], queryFn: async () => {
            return await axios.get('/tag')
                .then(res => {
                    setResultTag(res.data);
                })
                .catch(err => {
                    console.error('Error fetching links:', err);
                });

        }
    });

    const tagOptions = resultTag?.map(tag => ({
        value: tag.tagname,
        label: tag.tagname,
    })) || [];


    /*
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

    */

    return (
        <AppLayout >

            <Head title="Home" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">

                <Card>
                    <CardContent>
                        <CardTitle>
                            Tags
                        </CardTitle>
                        <div className='m-4 flex gap-5'>
                            <MultiSelect
                                options={tagOptions}
                                onChange={(newValue) => {
                                    setSelectedTags(newValue.map(el => el.value));
                                }}></MultiSelect>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 rounded-xl p-4 overflow-x-auto">

                            {selectedTags && selectedTags.length > 0 ?
                                resultTag?.filter(el => selectedTags.includes(el.tagname)).map((el, i) =>
                                    <a key={i} href={'/links' + '/' + el.tagname}>
                                        <Card>
                                            <CardContent>
                                                <CardTitle>
                                                    {el.tagname}
                                                </CardTitle>
                                                <br />
                                                <CardDescription>
                                                    Items {el.links_count}
                                                </CardDescription>
                                            </CardContent>
                                        </Card>
                                    </a>
                                ) :
                                resultTag?.map((el, i) =>
                                    <a href={'/links' + '/' + el.tagname} key={i}>
                                        <Card>
                                            <CardContent>
                                                <CardTitle>
                                                    {el.tagname}
                                                </CardTitle>
                                                <br />
                                                <CardDescription>
                                                    Items {el.links_count}
                                                </CardDescription>
                                            </CardContent>
                                        </Card>
                                    </a>
                                )
                            }
                        </div>

                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
