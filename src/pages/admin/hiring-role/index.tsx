import { AdminLayout } from '../../../components/layouts/AdminLayout'
import { Title } from '@mantine/core'
import TabHeaderAction from '../../../components/tabHeaderAction'
import { TEST_API_URL } from '../../../util/constants'
import { HiringRoleTable } from '../../../components/admin/HiringRole/HiringRoleTable'
import { useCallback, useEffect, useState } from 'react'
import { HiringRoleModals } from '../../../components/admin/HiringRole/HiringRoleModals'
import axios, { AxiosError } from 'axios'
import { Router, useRouter } from 'next/router'
import { toast } from 'react-hot-toast'
import { Pagination, PaginationProps } from 'antd'

const HiringRole = () => {
    const [hiring, setHiring] = useState<any>([])
    const [fetching, setFetching] = useState(false)
    const [modal, setModal] = useState({ open: false, size: 'md', type: '' })
    const [selectedDocument, setSelectedDocument] = useState<any>({})
    const [search, setSearch] = useState('')

    const [totalCount, setCount] = useState(0)
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(20)

    const router = useRouter()

    const fetchFunction = useCallback(async (page:number,pageSize:number) => {
        setFetching(true)
        try {
            const p: any = await axios.get(`${TEST_API_URL}/hiring-role/get?page=${page}&page_size=${pageSize}`, {
                withCredentials: true,
                headers: {
                    Authorization: `${localStorage.getItem('access_token')}`,
                    'Content-Language': `${localStorage.getItem('content-language')}`,
                    Session: `${localStorage.getItem('session_key')}`,
                },
            })
            setHiring(p.data)
            setCount(p.data.Meta.total_count) 
        } catch (error) {
            const err = error as AxiosError
            if ((err.response?.status as number) === 401) {
                await router.push('/admin/login')
            }
            toast.error('Something went wrong')
        }
        setFetching(false)
    }, [router])

    const handlePageSizeChange: PaginationProps['onShowSizeChange'] = (
        current,
        pageSize
    ) => {
        setPage(1)
        setPageSize(pageSize)
    }

    const handlePaginationChange = (page: number) => {
        setPage(page)
    }

    useEffect(() => {
        void fetchFunction(page, pageSize)
    }, [fetchFunction, page, pageSize])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            if (search == '') {
                await fetchFunction(page, pageSize)
                return
            }
            const response = await axios.get(`${TEST_API_URL}/hiring-role/get/${search}`, {
                withCredentials: true,
                headers: {
                    Authorization: `${localStorage.getItem('access_token')}`,
                    'Content-Language': `${localStorage.getItem('content-language')}`,
                    Session: `${localStorage.getItem('session_key')}`,
                },
            })
            setHiring(response.data)
        } catch (error: any) {
            if (error.response && error.response.status === 400) {
                setHiring(null)
            } else {
                toast.error('results not found')
            }
        }
    }



    return (

        <AdminLayout>
            <Title align="center">Hiring role</Title>
            <TabHeaderAction
                search={{
                    value: search,
                    onChange: (e) => setSearch(e.target.value),
                    handleSubmit: handleSubmit,
                }}
                create={{
                    onClick: () => setModal({ open: true, type: 'create', size: '' }),
                    text: 'Hiring role',
                }}
            />

            <HiringRoleTable
                documents={hiring}
                fetching={fetching}
                setModal={setModal}
                setSelectedDocument={setSelectedDocument}
            />


            <div>
            <HiringRoleModals
                modal={modal}
                setModal={setModal}
                selectedDocument={selectedDocument}
                setSelectedDocument={setSelectedDocument}
                fetchFunction={() => fetchFunction(page, pageSize)}
                />
            
            </div>
            <Pagination
                current={page}
                pageSize={pageSize}
                total={totalCount}
                onChange={handlePaginationChange}
                showSizeChanger
                onShowSizeChange={handlePageSizeChange}
            />
            
        </AdminLayout>

    )
}

export default HiringRole      