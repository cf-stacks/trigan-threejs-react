import { NextPage } from 'next'
import { Dispatch, SetStateAction, useState } from 'react'
import {
  JobType,
  LinkedinAccountJobs,
} from '../../../components/admin/linkedin/LinkedinAccountJobs'
import {
  AccountType,
  LinkedinAccounts,
} from '../../../components/admin/linkedin/LinkedinAccounts'
import { LinkedinJobApplicants } from '../../../components/admin/linkedin/LinkedinJobApplicants'
import { AdminLayout } from '../../../components/layouts/AdminLayout'

const Linkedin: NextPage = () => {
  const [selectedAccount, setSelectedAccount] = useState<AccountType | null>()
  const [selectedJob, setSelectedJob] = useState<JobType>()

  return (
    <AdminLayout>
      <LinkedinAccounts
        selectedAccount={selectedAccount && (selectedAccount as AccountType)}
        setSelectedAccount={
          setSelectedAccount as Dispatch<SetStateAction<AccountType | null>>
        }
      />
      {!!selectedAccount && (
        <LinkedinAccountJobs
          accountID={selectedAccount.id}
          selectedJob={selectedJob as JobType}
          setSelectedAccount={
            setSelectedAccount as Dispatch<SetStateAction<AccountType | null>>
          }
          setSelectedJob={
            setSelectedJob as Dispatch<SetStateAction<JobType | null>>
          }
        />
      )}
      {!!selectedAccount && !!selectedJob && (
        <LinkedinJobApplicants
          setSelectedJob={
            setSelectedJob as Dispatch<SetStateAction<JobType | null>>
          }
          selectedJob={selectedJob as JobType}
        />
      )}
    </AdminLayout>
  )
}

export default Linkedin
