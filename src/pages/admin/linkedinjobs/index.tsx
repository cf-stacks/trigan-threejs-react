import {NextPage} from 'next';
import React, {useEffect, useState} from 'react';
import {AdminLayout} from '../../../components/layouts/AdminLayout';
import {TEST_API_URL} from '../../../util/constants';
import toast from 'react-hot-toast';
import {useRouter} from 'next/router';
import useSWR from 'swr';
import {JobsTable} from '../../../components/admin/linkedinjobs/LinkedinJobsTable';
import { Title} from "@mantine/core";
import {Pagination, PaginationProps} from "antd";

const Jobs: NextPage = () => {

    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(20);

    const {data, error, isValidating} = useSWR(`${TEST_API_URL}/linkedin-job/get?page=${page}&page_size=${pageSize}`, {
        fetcher: async (url: string) => {
            const res = await fetch(url, {
                headers: {
                    Authorization: `${localStorage.getItem('access_token')}`,

                },
            });
            return await res.json();
        },
        revalidateOnMount: true,
        revalidateOnPageChange: true,
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

    const handlePageChange = (pageNumber: number) => {
        setPage(pageNumber);
    };

    const handlePageSizeChange: PaginationProps['onShowSizeChange'] = (current, pageSize) => {
        setPage(1);
        setPageSize(pageSize);
    };

    return (
        <AdminLayout>
            <Title align="center">Linkedin Jobs</Title>

            <section>
                <JobsTable jobs={data?.Data || []} fetching={!data && !error}/>
                <Pagination
                    current={page}
                    pageSize={pageSize}
                    showSizeChanger
                    onShowSizeChange={handlePageSizeChange}
                    total={data?.Meta.total_count || 0}
                    onChange={handlePageChange}
                    disabled={isValidating}
                />
            </section>
        </AdminLayout>
    );
};

export default Jobs;
