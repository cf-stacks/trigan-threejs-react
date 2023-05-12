import React, { useState } from 'react'
import { Button, Modal, Title } from '@mantine/core'
import axios from 'axios'
import toast from 'react-hot-toast'

import { AdminInvitation } from '../../../types/AdminInvitation'
import { TEST_API_URL } from '../../../util/constants'

interface DeleteAdminInvitationModalProps {
  setModal: React.Dispatch<React.SetStateAction<string>>
  modal: string
  fetchFunction: () => Promise<void>
  selectedAdminInvitation: AdminInvitation | null
  setSelectedAdminInvitation: React.Dispatch<
    React.SetStateAction<AdminInvitation | null>
  >
}

const DeleteAdminInvitationModal = ({
  setModal,
  modal,
  fetchFunction,
  selectedAdminInvitation,
  setSelectedAdminInvitation,
}: DeleteAdminInvitationModalProps) => {
  const [fetching, setFetching] = useState(false)

  const reset = () => {
    setModal('')
    setSelectedAdminInvitation(null)
  }

  const handleDelete = async (e: any) => {
    e.preventDefault()
    setFetching(true)
    try {
      await axios.delete(
        `${TEST_API_URL}/admin-invitation/delete/${selectedAdminInvitation?.id}`,
        {
          headers: {
            Authorization: `${localStorage.getItem('access_token')}`,
          },
        }
      )
      toast.success('Deleted Successfully')
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
      opened={modal === 'remove'}
      onClose={reset}
      withCloseButton={false}
      padding={0}
      closeOnEscape={false}
      closeOnClickOutside={false}
      centered={true}
    >
      <Title
        mb="0.75rem"
        sx={{ padding: '20px' }}
        size="h4"
        className="text-center"
      >
        Do you want to delete the invite for email{' '}
        <b>{selectedAdminInvitation?.email}</b>?
      </Title>
      <form className="flex flex-col" onSubmit={handleDelete}>
        <div className="flex justify-center pb-3">
          <Button
            variant="outline"
            type="submit"
            color="red"
            mr={'1rem'}
            disabled={fetching}
          >
            Delete Invite
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

export default DeleteAdminInvitationModal
