import React, { useEffect, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Button, Divider, Modal, TextInput, Title } from '@mantine/core'

import { TEST_API_URL } from '../../../util/constants'
import { AdminInvitation } from '../../../types/AdminInvitation'

interface CreateAdminInvitationModalProps {
  setModal: React.Dispatch<React.SetStateAction<string>>
  modal: string
  fetchFunction: () => Promise<void>
  selectedAdminInvitation: AdminInvitation | null
  setSelectedAdminInvitation: React.Dispatch<
    React.SetStateAction<AdminInvitation | null>
  >
}

const CreateOrUpdateAdminInvitationModal = ({
  setModal,
  modal,
  fetchFunction,
  selectedAdminInvitation,
  setSelectedAdminInvitation,
}: CreateAdminInvitationModalProps) => {
  const [email, setEmail] = useState('')
  const [fetching, setFetching] = useState(false)

  const reset = () => {
    setModal('')
    setEmail('')
    setSelectedAdminInvitation(null)
  }

  useEffect(() => {
    if (modal === 'edit') {
      setEmail(selectedAdminInvitation?.email || '')
    } else {
      setEmail('')
    }
  }, [modal])

  const handleCreateOrUpdate = async (e: any) => {
    e.preventDefault()
    setFetching(true)
    try {
      if (modal === 'create') {
        await axios.post(
          `${TEST_API_URL}/admin-invitation/create`,
          { email, role_id: 2 },
          {
            headers: {
              Authorization: `${localStorage.getItem('access_token')}`,
            },
          }
        )
        toast.success('Created Successfully')
      } else {
        await axios.put(
          `${TEST_API_URL}/admin-invitation/update`,
          { ...selectedAdminInvitation, email, role_id: 2 },
          {
            headers: {
              Authorization: `${localStorage.getItem('access_token')}`,
            },
          }
        )
        toast.success('Updated Successfully')
      }
      reset()
      await fetchFunction()
    } catch (error: any) {
      const errorMessage = error.response?.data?.Data?.Message || error.message
      toast.error(errorMessage)
    }
    setFetching(false)
  }

  return (
    <Modal
      opened={['create', 'edit'].includes(modal)}
      onClose={reset}
      withCloseButton={false}
      padding={0}
      closeOnEscape={false}
      closeOnClickOutside={false}
      centered={true}
    >
      <Title mb={'0.75rem'} sx={{ padding: '20px' }}>
        {modal === 'edit' ? 'Update Invite' : 'Invite Admin'}
      </Title>
      <form className="flex flex-col" onSubmit={handleCreateOrUpdate}>
        <section style={{ padding: '0 20px 20px' }}>
          <div>
            <div className="pb-3">
              <TextInput
                label="Email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
                withAsterisk
                type="email"
                classNames={{ input: 'text-black' }}
              />
            </div>
            <div>
              <TextInput type="number" label="Role Id" value="2" disabled />
            </div>
          </div>
        </section>
        <Divider />
        <div className="flex justify-end p-[20px]">
          <Button
            variant="outline"
            type="submit"
            color="green"
            mr="1rem"
            disabled={fetching}
          >
            {modal === 'edit' ? 'Update Invite' : 'Create Invite'}
          </Button>
          <Button
            variant="outline"
            color="blue"
            onClick={reset}
            disabled={fetching}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Modal>
  )
}

export default CreateOrUpdateAdminInvitationModal
