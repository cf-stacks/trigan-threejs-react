import React, { ReactNode } from 'react'
import { NextPage } from 'next'
import { AdminLayout } from '../../../components/layouts/AdminLayout'
import { Title } from '@mantine/core'

interface DashboardProps {
  children?: ReactNode
}

const Dashboard: NextPage<DashboardProps> = () => {
  return (
    <AdminLayout>
      <Title align={'center'}>Sample Page</Title>
    </AdminLayout>
  )
}

export default Dashboard
