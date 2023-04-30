import {
  Button,
  Divider,
  Modal,
  Select,
  Title,
  createStyles,
} from '@mantine/core'
import axios from 'axios'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { TEST_API_URL } from '../../../util/constants'
import { ApplicantType } from '../linkedin/LinkedinJobApplicants'
import { MoadalType } from './LinkedinApplicantsTable'

const useStyles = createStyles(() => ({
  inputContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '1rem',
    '@media only screen and (max-width: 850px)': {
      flexDirection: 'column',
    },
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    textAlignLast: 'end',
  },
  formChild: {
    width: '100%',
    margin: '0 1rem',
    '@media only screen and (max-width: 850px)': {
      margin: '0',
      marginBottom: '2rem',
    },
  },
}))

interface ApplicantsModalsType {
  modal: MoadalType
  setModal: React.Dispatch<React.SetStateAction<MoadalType>>
  selectedApplicant: ApplicantType
  setSelectedApplicant: React.Dispatch<React.SetStateAction<ApplicantType>>
  fetchFunction: () => Promise<void>
}

const ModalEdit: React.FC<ApplicantsModalsType> = (props) => {
  const { classes } = useStyles(); // Remove curly braces here
  const [status, setStatus] = useState<string | null>(null);

  const handleClose = () => {
    props.setModal({ ...props.modal, open: false })
  }

  const handleEdit = async (e: any) => {
    e.preventDefault()
    const updatedAccount = {
      status,
      id: props.selectedApplicant.id,
    }

    try {
      await axios.put(
        `${TEST_API_URL}/linkedin-applicant/update`,
        updatedAccount,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${localStorage.getItem('access_token')}`,
            'Content-Language': `${localStorage.getItem('content-language')}`,
            Session: `${localStorage.getItem('session_key')}`,
          },
        }
      )
      toast.success('Updated Successfully')
      handleClose()
      void props.fetchFunction()
    } catch (error) {
      toast.error('An error occured')
    }
  }

  return (
    <Modal
      opened={props.modal.open}
      onClose={handleClose}
      size={'100%'}
      withCloseButton={false}
      padding={0}
    >
      <Title mb={'2rem'} sx={{ padding: '20px' }}>
        Update Status of Applicant
      </Title>
      <form
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}
        onSubmit={handleEdit}
      >
        <section
          className={classes.inputContainer}
          style={{ padding: '0 20px 20px' }}
        >
          <div className={classes.formChild}>
            <div className={classes.inputContainer}>
              <Select
                label="Status"
                placeholder="Change Status"
                data={[
                  { value: 'REJECT', label: 'REJECT' },
                  { value: 'INVITED', label: 'INVITED' },
                  { value: 'ACTIVE', label: 'ACTIVE' },
                ]}
                onChange={setStatus}
                value={status}
              />
            </div>
          </div>
        </section>
        <Divider />
        <div
          style={{
            padding: '20px',
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <Button variant="outline" type="submit" color="green" mr={'1rem'}>
            Submit
          </Button>
          <Button variant="outline" color="blue" onClick={handleClose}>
            cancel
          </Button>
        </div>
      </form>
    </Modal>
  )
}

export const ApplicantsModals: React.FC<ApplicantsModalsType> = (props) => {
  const { modal } = props

  return (
    <div>
      {
        {
          edit: <ModalEdit {...props} />,
        }[modal.type]
      }
    </div>
  )
}
