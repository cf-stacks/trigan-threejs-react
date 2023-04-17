import { NextPage } from 'next'
import { useState, Dispatch, SetStateAction } from 'react'
import { AdminLayout } from '../../../components/layouts/AdminLayout'
import { LinkedinJobApplicants } from '../../../components/admin/linkedin/LinkedinJobApplicants'
import {
  JobType,
  LinkedinAccountJobs,
} from '../../../components/admin/linkedin/LinkedinAccountJobs'
import {
  AccountType,
  LinkedinAccounts,
} from '../../../components/admin/linkedin/LinkedinAccounts'

const Linkedin: NextPage = () => {
  const [selectedAccount, setSelectedAccount] = useState<AccountType>()
  const [selectedJob, setSelectedJob] = useState<JobType>()

  return (
    <AdminLayout>
      <LinkedinAccounts
        selectedAccount={selectedAccount as AccountType}
        setSelectedAccount={
          setSelectedAccount as Dispatch<SetStateAction<AccountType | null>>
        }
      />
      {!!selectedAccount && (
        <LinkedinAccountJobs
          accountID={selectedAccount.id}
          selectedJob={selectedJob as JobType}
          setSelectedJob={
            setSelectedJob as Dispatch<SetStateAction<JobType | null>>
          }
        />
      )}
      {!!selectedAccount && !!selectedJob && (
        <LinkedinJobApplicants selectedJob={selectedJob as JobType} />
      )}
    </AdminLayout>
  )
}

export default Linkedin
