import React, { useEffect, useState } from 'react'
import {
  Button,
  Modal,
  Title,
  TextInput,
  Textarea,
  Divider,
  createStyles,
} from '@mantine/core'
import { MoadalType, AccountType } from './LinkedinAccountsTable'
import axios from 'axios'
import { TEST_API_URL } from '../../../util/constants'
import toast from 'react-hot-toast'

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

interface AccountsModalsType {
  modal: MoadalType
  setModal: React.Dispatch<React.SetStateAction<MoadalType>>
  selectedAccount: AccountType
  setSelectedAccount: React.Dispatch<React.SetStateAction<AccountType>>
  fetchFunction: () => Promise<void>
}

const ModalCreate: React.FC<AccountsModalsType> = (props) => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [is_active, setIs_active] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const { classes } = useStyles()

  const handleCreate = async (e: any) => {
    e.preventDefault()
    const newAccount = {
      name,
      description,
      is_active,
      username,
      password,
    }
    try {
      await axios.post(`${TEST_API_URL}/linkedin-account/add`, newAccount, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${localStorage.getItem('access_token')}`,
        },
      })
      toast.success('Created Successfully')
      props.setModal({ ...props.modal, open: false })
      void props.fetchFunction()
    } catch (error) {
      let errMsg
      if (axios.isAxiosError(error) && error.response) {
        errMsg = error.response.data.Data.Message as string
      } else errMsg = String(error)
      toast.error(errMsg)
    }
  }

  const handleClose = () => {
    props.setModal({ ...props.modal, open: false })
    setName('')
    setDescription('')
    setIs_active('')
    setUsername('')
    setPassword('')
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
        Create a new Account
      </Title>
      <form
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}
        onSubmit={handleCreate}
      >
        <section
          className={classes.inputContainer}
          style={{ padding: '0 20px 20px' }}
        >
          <div className={classes.formChild}>
            <div className={classes.inputContainer}>
              <TextInput
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className={classes.inputContainer}>
              <TextInput
                label="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className={classes.inputContainer}>
              <TextInput
                label="Is_active"
                value={is_active}
                onChange={(e) => setIs_active(e.target.value)}
              />
            </div>
            <div className={classes.inputContainer}>
              <TextInput
                label="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className={classes.inputContainer}>
              <TextInput
                label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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

const ModalEdit: React.FC<AccountsModalsType> = (props) => {
  const { classes } = useStyles()
  const [name, setName] = useState('')

  const handleClose = () => {
    props.setModal({ ...props.modal, open: false })
  }

  const handleEdit = async (e: any) => {
    e.preventDefault()
    const updatedAccount = {
      name,
      id: props.selectedAccount.id
    };

    try {
      await axios.put(`${TEST_API_URL}/linkedin-account/update`, updatedAccount, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${localStorage.getItem('access_token')}`,
        },
      })
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
        Update a Account
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
              <TextInput
                label="name"
                onChange={(e) => setName(e.target.value)}
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

const ModalDelete: React.FC<AccountsModalsType> = (props) => {
  const handleClose = () => {
    props.setModal({ ...props.modal, open: false })
  }

  const handleDelete = async () => {
    try {
      await axios.delete(`${TEST_API_URL}/linkedin-account/delete/${props.selectedAccount.id}`, {
        withCredentials: true,
        headers: {
          Authorization: `${localStorage.getItem('access_token')}`,
        },
      })
      toast.success('Deleted Successfully')
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
      size={'md'}
      withCloseButton={false}
    >
      <Title order={4}>
        Are you sure you want to delete {props.selectedAccount.name} ?
      </Title>
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          marginTop: '2rem',
        }}
      >
        <Button
          mr={'1rem'}
          variant="outline"
          color="red"
          onClick={handleDelete}
        >
          Delete
        </Button>
        <Button variant="outline" color="gray" onClick={handleClose}>
          cancel
        </Button>
      </div>
    </Modal>
  )
}

export const AccountsModals: React.FC<AccountsModalsType> = (props) => {
  const { modal } = props

  return (
    <div>
      {
        {
          create: <ModalCreate {...props} />,
          edit: <ModalEdit {...props} />,
          delete: <ModalDelete {...props} />,
        }[modal.type]
      }
    </div>
  )
}
