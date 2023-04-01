import {NextPage} from 'next';
import React, {useEffect} from 'react';
import {AdminLayout} from '../../../components/layouts/AdminLayout';
import {Title} from '@mantine/core';
import {TEST_API_URL} from '../../../util/constants';
import toast from 'react-hot-toast';
import {useRouter} from 'next/router';
import useSWR from 'swr';
import {JobsTable} from '../../../components/admin/linkedinjobs/LinkedinJobsTable';

const Jobs: NextPage = () => {
    const {data, error} = useSWR(`${TEST_API_URL}/linkedin-job/get`, {
        fetcher: async (url: string) => {
            const res = await fetch(url, {
                headers: {
                    Authorization: `${localStorage.getItem('access_token')}`,
                },
            });
            return await res.json();
        },
        revalidateOnFocus: false,
        shouldRetryOnError: false,
        withCredentials: true,
    });

    const router = useRouter();

    useEffect(() => {
        if (error) {
            if (error.response?.status === 401) {
                void router.push('/admin/login');
            }
            toast.error('Something went wrong');
        }
    }, [error, router]);

    return (
        <AdminLayout>
            <Title align="center">Linkedin Jobs</Title>

            <section>
                <JobsTable jobs={data?.Data || []} fetching={!data && !error}/>
            </section>
        </AdminLayout>
    );
};

export default Jobs;