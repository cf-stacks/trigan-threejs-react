import { Title } from '@mantine/core'
import { ColumnSort, SortingState } from '@tanstack/react-table'
import axios, { AxiosError } from 'axios'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { ReactNode, useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import Table from '../../../components/Table'
import { PostsModals } from '../../../components/admin/posts/PostsModals'
import { AdminLayout } from '../../../components/layouts/AdminLayout'
import TabHeaderAction from '../../../components/tabHeaderAction'
import { useColumns } from '../../../table-columns/posts'
import { TEST_API_URL } from '../../../util/constants'

interface DashboardProps {
  children?: ReactNode
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
// const dummyData: any = [
//   {
//     id_post: '6290bc6c64c77c6f5ee1a294',
//     date_created: '2022-05-27T11:56:28.212Z',
//     date_updated: '2022-05-27T11:56:28.212Z',
//     title: 'temporary',
//     author: 'temporary',
//     content: 'dGVtcG9yYXJ5',
//     categories: ['12345'],
//     tags: ['67890'],
//     original_filename: 'temporary',
//     proposal_id: '',
//   },
//   {
//     id_post: '6290ce8d0955b3719fbb6cb8',
//     date_created: '2022-05-27T13:13:49.706Z',
//     date_updated: '2022-05-27T13:13:49.706Z',
//     title: 'temporary',
//     author: 'temporary',
//     content: 'dGVtcG9yYXJ5',
//     categories: ['12345'],
//     tags: ['67890'],
//     original_filename: 'temporary',
//     proposal_id: '',
//   },
//   {
//     id_post: '629837147f2741c337b79765',
//     date_created: '2022-06-02T04:05:40.237Z',
//     date_updated: '2022-06-02T04:05:40.237Z',
//     title: 'temporary',
//     author: 'temporary',
//     content: 'dGVtcG9yYXJ5',
//     categories: ['12345'],
//     tags: ['67890'],
//     original_filename: 'temporary',
//     proposal_id: '',
//   },
//   {
//     id_post: '6299ff437f2741c337b79768',
//     date_created: '2022-06-03T12:32:03.126Z',
//     date_updated: '2022-06-03T12:32:03.126Z',
//     title: 'temporary',
//     author: 'temporary',
//     content: 'dGVtcG9yYXJ5',
//     categories: ['12345'],
//     tags: ['67890'],
//     original_filename: 'temporary',
//     proposal_id: '',
//   },
//   {
//     id_post: '62b9c1f24e8e96ced9600b4a',
//     date_created: '2022-06-27T14:42:58.268Z',
//     date_updated: '2022-06-27T14:42:58.268Z',
//     title: 'a test title no 1',
//     author: 'some random person 1',
//     content: 'bG90cyBvZiByYW5kb20gY29udGVudC4uLg==',
//     categories: ['987'],
//     tags: ['123'],
//     original_filename: 'etc',
//     proposal_id: '',
//   },
//   {
//     id_post: '62b9c2324e8e96ced9600b4d',
//     date_created: '2022-06-27T14:44:02.816Z',
//     date_updated: '2022-06-27T14:44:02.816Z',
//     title: 'something different 2',
//     author: 'John Doe',
//     content: 'eHl6IDAwMA==',
//     categories: ['box'],
//     tags: ['exciting', 'fun'],
//     original_filename: 'old',
//     proposal_id: '',
//   },
//   {
//     id_post: '62b9c2584e8e96ced9600b51',
//     date_created: '2022-06-27T14:44:40.139Z',
//     date_updated: '2022-06-27T14:44:40.139Z',
//     title: 'aaaaaa',
//     author: 'aaaaaa',
//     content: 'YWFhYWFh',
//     categories: ['12345'],
//     tags: ['67890'],
//     original_filename: 'aaaaaa',
//     proposal_id: '',
//   },
//   {
//     id_post: '62ba612b4e8e96ced9600b54',
//     date_created: '2022-06-28T02:02:19.378Z',
//     date_updated: '2022-06-28T02:02:19.378Z',
//     title: 'aaaaaa',
//     author: 'aaaaaa',
//     content: 'YWFhYWFh',
//     categories: ['12345'],
//     tags: ['67890'],
//     original_filename: 'aaaaaa',
//     proposal_id: '',
//   },
// ]
const Dashboard: NextPage<DashboardProps> = () => {
  const [search, setSearch] = useState('')
  const [posts, setPosts] = useState<any>([]) // use an empty array instead of dummdata when url is fixed
  const [fetching, setFetching] = useState(true)
  const [modal, setModal] = useState({ open: false, size: 'md', type: '' })
  const [selectedPost, setSelectedPost] = useState<any>([])

  const router = useRouter()

  const fetchFunction = useCallback(
    async ({ sort }: { sort?: ColumnSort }) => {
      setFetching(true)
      console.log('request senttt')
      try {
        const p: any = await axios.get(
          `${TEST_API_URL}/posts?is_preview=false`,
          {
            withCredentials: true,
            headers: {
              Authorization: `${localStorage.getItem('access_token')}`,
              'Content-Language': `${localStorage.getItem('content-language')}`,
              Session: `${localStorage.getItem('session_key')}`,
            },
            params: {
              sortBy: sort ? sort.id : undefined,
              order: sort ? (sort.desc ? 'desc' : 'asc') : undefined,
            },
          }
        )

        console.log(p)
        setPosts(p.data.posts)
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
    },
    [router]
  )

  const [rowSelection, setRowSelection] = useState({})
  const [sorting, setSorting] = useState<SortingState>([])

  const columns = useColumns({
    edit: useCallback(() => {}, []),
    remove: useCallback(() => {}, []),
  })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    if (e) e.preventDefault()
    const [sortField] = sorting
    await fetchFunction({ sort: sortField })
  }

  useEffect(() => {
    const [sortField] = sorting
    void fetchFunction({ sort: sortField })
  }, [fetchFunction, sorting])

  const refetch = useCallback(async () => {
    const [sortField] = sorting
    void fetchFunction({ sort: sortField })
  }, [fetchFunction, sorting])

  const searchPosts = async (term: string) => {
    setSearch(term)
    if (term.length > 0) {
      console.log(term)
      setPosts(
        posts?.filter((post: any) =>
          post.title.toLowerCase().includes(term.toLowerCase())
        )
      )
    } else {
      const [sortField] = sorting
      await fetchFunction({ sort: sortField })
    }
  }

  return (
    <AdminLayout>
      <div className="mb-8 flex items-center justify-between">
        <Title size={24} align="center" className="text-white">
          Posts
        </Title>

        <TabHeaderAction
          search={{
            value: search,
            onChange: (e) => searchPosts(e.target.value),
            handleSubmit: handleSubmit,
          }}
          create={{
            text: 'Create Post',
            onClick: () => setModal({ open: true, type: 'create', size: '' }),
          }}
          remove={console.log}
        />
      </div>

      <section>
        <Table
          loading={fetching}
          columns={columns}
          data={posts}
          state={{ rowSelection, sorting }}
          onSortingChange={setSorting}
          enableRowSelection={true}
          onRowSelectionChange={setRowSelection}
        />
      </section>

      <div>
        <PostsModals
          modal={modal}
          setModal={setModal}
          selectedPost={selectedPost}
          setSelectedPost={setSelectedPost}
          fetchFunction={refetch}
        />
      </div>
    </AdminLayout>
  )
}

export default Dashboard
