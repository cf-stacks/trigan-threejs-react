import { AdminLayout } from '../../../components/layouts/AdminLayout'
import { Title } from '@mantine/core'
import TabHeaderAction from '../../../components/tabHeaderAction'
import { TEST_API_URL } from '../../../util/constants'
import { HiringRoleProcessTable } from '../../../components/admin/HiringRoleProcess/HiringRoleProcessTable'
import { useCallback, useEffect, useState } from 'react'
import { HiringRoleProcessModals } from '../../../components/admin/HiringRoleProcess/HiringRoleProcessModal'
import axios, { AxiosError } from 'axios'
import { Router, useRouter } from 'next/router'
import { toast } from 'react-hot-toast'

const HiringRoleProcess = () => {
    const [search, setSearch] = useState('')
    const [documents, setDocuments] = useState<any>([]) // use an empty array instead of dummdata when url is fixed
    const [fetching, setFetching] = useState(true)
    const [modal, setModal] = useState({ open: false, size: 'md', type: '' })
    const [selectedDocument, setSelectedDocument] = useState<any>({})
    const router = useRouter()
   

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        if (e) e.preventDefault()
        try {
            axios.get(`${TEST_API_URL}/hiring-role-process/get/${search}`, {
                withCredentials: true,
                headers: {
                    Authorization: `${localStorage.getItem('access_token')}`,
                    'Content-Language': `${localStorage.getItem('content-language')}`,
                    Session: `${localStorage.getItem('session_key')}`,
                },
            })
                .then((res) => {
                    setDocuments(res.data)
                    console.log(documents)
                }
                )

        } catch (error) {
            toast.error('results not found')
        }
    }
    console.log(documents)
    const fetchFunction = useCallback(async () => {
        setFetching(true)
        try {
            const p: any = await axios.get(`${TEST_API_URL}/hiring-role-process/get`, {
                withCredentials: true,
                headers: {
                    Authorization: `${localStorage.getItem('access_token')}`,
                    'Content-Language': `${localStorage.getItem('content-language')}`,
                    Session: `${localStorage.getItem('session_key')}`,
                },
            })

            setDocuments(p.data)
            console.log(p)
        } catch (error) {
            console.log(error)
            const err = error as AxiosError
            if ((err.response?.status as number) === 401) {
                await router.push('/admin/login')
            }
            toast.error('Something went wrong')
        }
        setFetching(false)
    }, [router])

    useEffect(() => {
        void fetchFunction()
    }, [fetchFunction])

    return (
        <AdminLayout>
            <Title align={'center'}>Hiring role process</Title>
            <TabHeaderAction
                search={{
                    value: search,
                    onChange: (e) => setSearch(e.target.value),
                    handleSubmit: handleSubmit,
                }}
                create={{
                    text: 'Create new hiring role process',
                    onClick: () => setModal({ open: true, type: 'create', size: '' }),
                }}
            />

            <section>
                <HiringRoleProcessTable
                    documents={documents}
                    fetching={fetching} //pass fetching instead of false when url is fixed
                    setModal={setModal}
                    setSelectedDocument={setSelectedDocument}
                />
            </section>

            <div>
                <HiringRoleProcessModals
                    modal={modal}
                    setModal={setModal}
                    selectedDocument={selectedDocument}
                    setSelectedDocument={setSelectedDocument}
                    fetchFunction={fetchFunction}
                />
            </div>
        </AdminLayout>
    )
}



export default HiringRoleProcess