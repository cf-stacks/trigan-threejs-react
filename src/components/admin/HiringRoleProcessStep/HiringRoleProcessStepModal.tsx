// This file is responsible for handling models that dispalay on admin/Documents (create-edit-delete) modals
// all the Document info are state variables and they change based on what is the current modal

// the requests are made on ***handleCreate, handleEdit and handleDelete*** functions

import {
    Button,
    Divider,
    Input,
    Modal,
    TextInput,
    Textarea,
    Title,
    createStyles,
    Switch
} from '@mantine/core'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { HiringRoleProcessStep } from '../../../types/HiringRoleProcessStep'
import { TEST_API_URL } from '../../../util/constants'


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

interface Imodal {
    open: boolean
    size: string
    type: string
}
interface IDocumentModals {
    modal: Imodal
    setModal: React.Dispatch<React.SetStateAction<Imodal>>
    selectedDocument: HiringRoleProcessStep
    setSelectedDocument: React.Dispatch<React.SetStateAction<Record<string, any>>>
    fetchFunction: () => Promise<void>
}
export const HiringRoleProcessStepModals = ({
    modal,
    setModal,
    selectedDocument,
    setSelectedDocument,
    fetchFunction,
}: IDocumentModals) => {
//     {
//   "description": "string",
//   "hiring_role_process_id": "string",
//   "is_admin_required": true,
//   "name": "string",
//   "step_order": 0
// }
    const [hiring_role_process_id,setHiring_role_process_id] = useState('')
    const [description, setDescription] = useState('')
    const [is_admin_required, setIs_admin_required] = useState(false)
    const [name, setName] = useState('')
    const [step_order, setStep_order] = useState(0)
    const [created_by, setCreated_by] = useState('')
    const [updated_by, setUpdated_by] = useState('')
    const [deleted_by, setDeleted_by] = useState('')
    const [created_at, setCreated_at] = useState('')
    const [updated_at, setUpdated_at] = useState('')

    const [loading, setLoading] = useState(true)

    const { classes } = useStyles()

    useEffect(() => {
        if (!selectedDocument || Object.keys(selectedDocument).length === 0) {
            setName('')
            setDescription('')
            setHiring_role_process_id('')
            setIs_admin_required(false)
            setStep_order(0)
            setCreated_by('')
            setUpdated_by('')
            setDeleted_by('')
            setCreated_at('')
            setUpdated_at('')
            return setLoading(false)
        }
        if (Object.keys(selectedDocument).length === 0) return setLoading(true)
        setName(selectedDocument.name)
        setDescription(selectedDocument.description)
        setHiring_role_process_id(selectedDocument.hiring_role_process_id)
        setIs_admin_required(selectedDocument.is_admin_required)
        setStep_order(selectedDocument.step_order)
        setCreated_by(selectedDocument.created_by)
        setUpdated_by(selectedDocument.updated_by)
        setDeleted_by(selectedDocument.deleted_by)
        setCreated_at(selectedDocument.created_at)
        setUpdated_at(selectedDocument.updated_at)
        setLoading(false)
    }, [selectedDocument])

    // ****************************** API REQUEST FUNCTIONS ******************************
    const handleDelete = async () => {
        try {
            await axios.delete(
                `${TEST_API_URL}/hiring-role-process-step/delete/${selectedDocument.id}`,
                {
                    withCredentials: true,
                    headers: {
                        Authorization: `${localStorage.getItem('access_token')}`,
                        'Content-Language': `${localStorage.getItem('content-language')}`,
                        Session: `${localStorage.getItem('session_key')}`,
                    },
                }
            )
            toast.success('Deleted Successfully')
            setModal({ ...modal, open: false })
            void fetchFunction()
        } catch (error) {
            toast.error('An error occured')
        }
    }
    const handleCreate = async (e: any) => {
        e.preventDefault()
        // if(type.length )
        const newDocument = {
            name,
            description,
            hiring_role_process_id,
            is_admin_required,
            step_order,
            created_by,
            updated_by,
            deleted_by,
            created_at,
        }

        try {
            await axios.post(`${TEST_API_URL}/hiring-role-process-step/create`, newDocument, {
                withCredentials: true,
                headers: {
                    Authorization: `${localStorage.getItem('access_token')}`,
                    'Content-Language': `${localStorage.getItem('content-language')}`,
                    Session: `${localStorage.getItem('session_key')}`,
                },
            })
            toast.success('Created Successfully')
            setModal({ ...modal, open: false })
            void fetchFunction()
        } catch (error) {
            // Aiko:
            // this can be encapsulated in a function logError(error)
            // since typescript is strong typed, it requires you to declare
            // the type of error you handling. In this case, it is AxiosError
            let errMsg
            if (axios.isAxiosError(error) && error.response) {
                errMsg = error.response.data.message as string
            } else errMsg = String(error)
            toast.error(errMsg)
        }
    }

    const handleEdit = async () => {
        const newDocument = {
            id: selectedDocument.id,
            name,
            description,
            hiring_role_process_id,
            is_admin_required,
            step_order,
            created_by,
            updated_by,
            deleted_by,
            created_at,
            updated_at,
        }
        try {
            await axios.put(`${TEST_API_URL}/hiring-role-process-step/update`, newDocument, {
                withCredentials: true,
                headers: {
                    Authorization: `${localStorage.getItem('access_token')}`,
                    'Content-Language': `${localStorage.getItem('content-language')}`,
                    Session: `${localStorage.getItem('session_key')}`,
                },
            })
            toast.success('Created Successfully')
            setModal({ ...modal, open: false })
            void fetchFunction()
        } catch (error) {
            toast.error('An error occured')
        }
    }

    // ****************************** API REQUEST FUNCTIONS END ******************************

    // this function closes the modal and sets the selected Document to an empty string (resets the state variables)
    // this function is not called when closing create modal because we don't want to reset the variables,
    // in case the user accidentally closes the modal, the values will remain.
    const handleClose = () => {
        setSelectedDocument({})
        setModal({ ...modal, open: false })
    }

    if (loading) return <></>

    if (modal.type === 'create')
        return (
            <Modal
                opened={modal.open}
                onClose={() => setModal({ ...modal, open: false })}
                size={'100%'}
                withCloseButton={false}
                padding={0}
            >
                <Title mb={'2rem'} sx={{ padding: '20px' }}>
                Create new document
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
                            <Textarea
                                label="Description"
                                minRows={4}
                                maxRows={6}
                                value={description}
                                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                                    setDescription(e.currentTarget.value)
                                }
                            />
                             <div className={classes.inputContainer}>
                                <TextInput
                                    label="Hiring Role Process Id"
                                    value={hiring_role_process_id}
                                    onChange={(e) => setHiring_role_process_id(e.target.value)}
                                />
                            </div>
                            <label htmlFor="is_admin_required">Is Admin Required</label>
                            <Switch
                                label="Is Admin Required"
                                checked={is_admin_required}
                                onChange={(e) => setIs_admin_required(e.target.checked)}
                            />
                            <label htmlFor="step_order">Step Order</label>
                            <Input
                                type='number'
                                value={step_order}
                                onChange={(e) => setStep_order(parseInt(e.target.value))}
                            />
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
                        <Button
                            variant="outline"
                            type="submit"
                            color="green"
                            mr={'1rem'}
                            onClick={handleCreate}
                        >
                            Submit
                        </Button>
                        <Button
                            variant="outline"
                            color="blue"
                            onClick={() => setModal({ ...modal, open: false })}
                        >
                            cancel
                        </Button>
                    </div>
                </form>
            </Modal>
        )

    if (modal.type === 'delete')
        return (
            <Modal
                opened={modal.open}
                onClose={handleClose}
                size={'md'}
                withCloseButton={false}
            >
                <Title order={4}>
                    Are you sure you want to delete {selectedDocument.name} ?
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

    if (modal.type === 'edit')
        return (
            <Modal
                opened={modal.open}
                onClose={handleClose}
                size={'100%'}
                withCloseButton={false}
                padding={0}
            >
                <Title mb={'2rem'} sx={{ padding: '20px' }}>
                    Editing {selectedDocument.name}
                </Title>
                <form
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                    onSubmit={() => handleEdit()}
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
                            <label htmlFor="step_order">Step Order</label>
                            <Input
                                type='number'
                                value={step_order}
                                onChange={(e) => setStep_order(parseInt(e.target.value))} />
                            <Switch
                                label="Is Admin Required"
                                checked={is_admin_required}
                                onChange={(e) => setIs_admin_required(e.target.checked)}
                            />
                            
                            
                            <Textarea
                                label="Description"
                                minRows={4}
                                maxRows={6}
                                value={description}
                                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                                    setDescription(e.currentTarget.value)
                                }
                            />
                           
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
                        <Button
                            variant="outline"
                            type="submit"
                            color="blue"
                            mr={'1rem'}
                            onClick={handleEdit}
                        >
                            Update
                        </Button>
                        <Button variant="outline" color="blue" onClick={handleClose}>
                            cancel
                        </Button>
                    </div>
                </form>
            </Modal>
        )
    return <></>
}
