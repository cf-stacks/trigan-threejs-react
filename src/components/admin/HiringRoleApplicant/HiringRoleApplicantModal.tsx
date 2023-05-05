// This file is responsible for handling models that dispalay on admin/Documents (create-edit-delete) modals
// all the Document info are state variables and they change based on what is the current modal

// the requests are made on ***handleCreate, handleEdit and handleDelete*** functions

import {
    Button,
    Divider,
    Modal,
    TextInput,
    Textarea,
    Title,
    createStyles,
} from '@mantine/core'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { HiringRoleApplicant } from '../../../types/HiringRoleApplicant'
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
    selectedDocument: HiringRoleApplicant
    setSelectedDocument: React.Dispatch<React.SetStateAction<Record<string, any>>>
    fetchFunction: () => Promise<void>
}
export const HiringRoleApplicantModals = ({
    modal,
    setModal,
    selectedDocument,
    setSelectedDocument,
    fetchFunction,
}: IDocumentModals) => {
    const [contribution_plan, setContribution_plan] = useState('')
    const [country, setCountry] = useState('')
    const [email, setEmail] = useState('')
    const [first_name, setFirst_name] = useState('')
    const [interest_topic, setInterest_topic] = useState('')
    const [joining_reason, setJoining_reason] = useState('')
    const [known_about_trigan, setKnown_about_trigan] = useState('')
    const [last_name, setLast_name] = useState('')
    const [nationality, setNationality] = useState('')
    const [qualification, setQualification] = useState('')
    const [skill, setSkill] = useState('')
    const [hiring_role_id, setHiring_role_id] = useState('')
    const [time_spend, setTime_spend] = useState('')
    const [created_by, setCreated_by] = useState('')
    const [updated_by, setUpdated_by] = useState('')
    const [deleted_by, setDeleted_by] = useState('')
    const [created_at, setCreated_at] = useState('')
    const [updated_at, setUpdated_at] = useState('')

    const [loading, setLoading] = useState(true)

    const { classes } = useStyles()

    useEffect(() => {
        if (!selectedDocument || Object.keys(selectedDocument).length === 0) {
            setContribution_plan('')
            setCountry('')
            setEmail('')
            setFirst_name('')
            setInterest_topic('')
            setJoining_reason('')
            setKnown_about_trigan('')
            setLast_name('')
            setNationality('')
            setQualification('')
            setSkill('')
            setHiring_role_id('')
            setTime_spend('')
            setCreated_by('')
            setUpdated_by('')
            setDeleted_by('')
            setCreated_at('')
            setUpdated_at('')
            return setLoading(false)
        }
        if (Object.keys(selectedDocument).length === 0) return setLoading(true)
        setContribution_plan(selectedDocument.contribution_plan)
        setCountry(selectedDocument.country)
        setEmail(selectedDocument.email)
        setFirst_name(selectedDocument.first_name)
        setInterest_topic(selectedDocument.interest_topic)
        setJoining_reason(selectedDocument.joining_reason)
        setKnown_about_trigan(selectedDocument.known_about_trigan)
        setLast_name(selectedDocument.last_name)
        setNationality(selectedDocument.nationality)
        setQualification(selectedDocument.qualification)
        setSkill(selectedDocument.skill)
        setHiring_role_id(selectedDocument.hiring_role_id)
        setTime_spend(selectedDocument.time_spend)
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
                `${TEST_API_URL}/hiring-role-applicant/delete/${selectedDocument.id}`,
                {
                    withCredentials: true,
                    headers: {
                        Authorization: `${localStorage.getItem('access_token')}`,
                        'Content-Language': `${localStorage.getItem('content-language')}`,
                        Session: `${localStorage.getItem('session_key')}`,
                    },
                }
            )
            alert('Deleted Successfully')
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
            contribution_plan,
            country,
            email,
            first_name,
            interest_topic,
            joining_reason,
            known_about_trigan,
            last_name,
            nationality,
            qualification,
            skill,
            hiring_role_id,
            time_spend,
        }

        try {
            await axios.post(`${TEST_API_URL}/hiring-role-applicant/create`, newDocument, {
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
            contribution_plan,
            country,
            hiring_role_id,
            email,
            first_name,
            interest_topic,
            joining_reason,
            known_about_trigan,
            last_name,
            nationality,
            qualification,
            skill,
            time_spend,
            created_by,
            updated_by,
            deleted_by,
            created_at,
            updated_at,
        }
        try {
            await axios.put(`${TEST_API_URL}/hiring-role-applicant/update`, newDocument, {
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
            alert(error)
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
                    Create a new documets
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
                                    label="contribution plan"
                                    value={contribution_plan}
                                    onChange={(e) => setContribution_plan(e.target.value)}
                                />
                            </div>
                            <div className={classes.inputContainer}>
                                <TextInput
                                    label="hiring role ID"
                                    value={hiring_role_id}
                                    onChange={(e) => setHiring_role_id(e.target.value)}
                                />
                            </div>
                            <div className={classes.inputContainer}>
                                <TextInput
                                    label="country"
                                    value={country}
                                    onChange={(e) => setCountry(e.target.value)}
                                />
                            </div>
                            <div className={classes.inputContainer}>
                                <TextInput
                                    label="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className={classes.inputContainer}>
                                <TextInput
                                    label="first name"
                                    value={first_name}
                                    onChange={(e) => setFirst_name(e.target.value)}
                                />
                            </div>
                            <div className={classes.inputContainer}>
                                <TextInput
                                    label="interest topic"
                                    value={interest_topic}
                                    onChange={(e) => setInterest_topic(e.target.value)}
                                />

                            </div>
                            <div className={classes.inputContainer}>
                                <TextInput
                                    label="joining reason"
                                    value={joining_reason}
                                    onChange={(e) => setJoining_reason(e.target.value)}
                                />
                            </div>
                            <div className={classes.inputContainer}>
                                <TextInput
                                    label="known about trigan"
                                    value={known_about_trigan}
                                    onChange={(e) => setKnown_about_trigan(e.target.value)}
                                />
                            </div>
                            <div className={classes.inputContainer}>
                                <TextInput
                                    label="last name"
                                    value={last_name}
                                    onChange={(e) => setLast_name(e.target.value)}
                                />
                            </div>
                            <div className={classes.inputContainer}>
                                <TextInput
                                    label="Nationality"
                                    value={nationality}
                                    onChange={(e) => setNationality(e.target.value)}
                                />
                            </div>
                            <div className={classes.inputContainer}>
                                <TextInput
                                    label="qualification"
                                    value={qualification}
                                    onChange={(e) => setQualification(e.target.value)}
                                />
                            </div>
                            <div className={classes.inputContainer}>
                                <TextInput
                                    label="skill"
                                    value={skill}
                                    onChange={(e) => setSkill(e.target.value)}
                                />
                            </div>
                            <div className={classes.inputContainer}>
                                <TextInput
                                    label="time spend"
                                    value={time_spend}
                                    onChange={(e) => setTime_spend(e.target.value)}
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
                    Are you sure you want to delete {selectedDocument.first_name} ?
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
                    Editing {selectedDocument.first_name}
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
                                    label="contribution plan"
                                    value={contribution_plan}
                                    onChange={(e) => setContribution_plan(e.target.value)}
                                />
                            </div>
                            <div className={classes.inputContainer}>
                                <TextInput
                                    label="hiring role ID"
                                    value={hiring_role_id}
                                    onChange={(e) => setHiring_role_id(e.target.value)}
                                />
                            </div>
                            <div className={classes.inputContainer}>
                                <TextInput
                                    label="country"
                                    value={country}
                                    onChange={(e) => setCountry(e.target.value)}
                                />
                            </div>
                            <div className={classes.inputContainer}>
                                <TextInput
                                    label="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className={classes.inputContainer}>
                                <TextInput
                                    label="first name"
                                    value={first_name}
                                    onChange={(e) => setFirst_name(e.target.value)}
                                />
                            </div>
                            <div className={classes.inputContainer}>
                                <TextInput
                                    label="interest topic"
                                    value={interest_topic}
                                    onChange={(e) => setInterest_topic(e.target.value)}
                                />

                            </div>
                            <div className={classes.inputContainer}>
                                <TextInput
                                    label="joining reason"
                                    value={joining_reason}
                                    onChange={(e) => setJoining_reason(e.target.value)}
                                />
                            </div>
                            <div className={classes.inputContainer}>
                                <TextInput
                                    label="known about trigan"
                                    value={known_about_trigan}
                                    onChange={(e) => setKnown_about_trigan(e.target.value)}
                                />
                            </div>
                            <div className={classes.inputContainer}>
                                <TextInput
                                    label="last name"
                                    value={last_name}
                                    onChange={(e) => setLast_name(e.target.value)}
                                />
                            </div>
                            <div className={classes.inputContainer}>
                                <TextInput
                                    label="Nationality"
                                    value={nationality}
                                    onChange={(e) => setNationality(e.target.value)}
                                />
                            </div>
                            <div className={classes.inputContainer}>
                                <TextInput
                                    label="qualification"
                                    value={qualification}
                                    onChange={(e) => setQualification(e.target.value)}
                                />
                            </div>
                            <div className={classes.inputContainer}>
                                <TextInput
                                    label="skill"
                                    value={skill}
                                    onChange={(e) => setSkill(e.target.value)}
                                />
                            </div>
                            <div className={classes.inputContainer}>
                                <TextInput
                                    label="time spend"
                                    value={time_spend}
                                    onChange={(e) => setTime_spend(e.target.value)}
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
