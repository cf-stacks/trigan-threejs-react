import { Button, createStyles, Loader, ScrollArea, Table } from '@mantine/core'
import { IconHistory, IconPencil } from '@tabler/icons'
import { useState } from 'react'

const useStyles = createStyles((theme) => ({
    header: {
        position: 'sticky',
        top: 0,
        backgroundColor:
            theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
        transition: 'box-shadow 150ms ease',

        '&::after': {
            content: '""',
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            borderBottom: `1px solid ${theme.colorScheme === 'dark'
                ? theme.colors.dark[3]
                : theme.colors.gray[2]
                }`,
        },
    },

    scrolled: {
        boxShadow: theme.shadows.sm,
    },

    tableArea: {
        width: 'calc(100vw - 40px)',
        margin: '0 auto',
        '& @media only screen and (max-width: 600px)': {},
    },

    '& *': {
        fontSize: '0.75rem',
    },
}))

export const HiringRoleApplicantTable = ({
    documents,
    fetching,
    setModal,
    setSelectedDocument,
}: any) => {
    const { classes, cx } = useStyles()
    const [scrolled, setScrolled] = useState(false)
//     {
//   "contribution_plan": "string",
//   "country": "string",
//   "email": "string",
//   "first_name": "string",
//   "interest_topic": "string",
//   "joining_reason": "string",
//   "known_about_trigan": "string",
//   "last_name": "string",
//   "nationality": "string",
//   "qualification": "string",
//   "skill": "string",
//   "time_spend": "string"
// }
    const newdocuments =
        documents?.Data?.length > 0 ? (
            documents?.Data?.map((element: any, index: number) => (
                <tr key={index}>
                    <td>{element.contribution_plan}</td>
                    <td>{element.country}</td>
                    <th>{element.email}</th>
                    <td>{element.first_name}</td>
                    <td>{element.last_name}</td>
                    <td>{element.interest_topic}</td>
                    <td>{element.joining_reason}</td>
                    <td>{element.known_about_trigan}</td>
                    <td>{element.nationality}</td>
                    <td>{element.qualification}</td>
                    <td>{element.skill}</td>
                    <td>{element.time_spend}</td>
                    <td>{new Date(element.created_at as Date).toLocaleDateString()}</td>
                    <td>{new Date(element.updated_at as Date).toLocaleDateString()}</td>
                    <td>
                        <Button.Group>
                            <Button
                                onClick={() => {
                                    setModal({ open: true, type: 'edit' })
                                    setSelectedDocument(element)
                                }
                                }
                                variant="light"
                                color="blue"
                            >
                                <IconPencil />
                            </Button>
                            <Button
                                onClick={() => {
                                    setModal({ open: true, type: 'delete' })
                                    setSelectedDocument(element)
                                }}
                                variant="light"
                                color="red"
                            >
                                <IconHistory />
                            </Button>
                        </Button.Group>
                    </td>
                </tr>
            ))
        ) : (
            <tr>
                <td colSpan={9}>No Items</td>
            </tr>
        )

    if (fetching)
        return (
            <main
                style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
            >
                <Loader />
            </main>
        )

    return (
        <ScrollArea
            sx={{ height: 'calc(100vh - 155px - 2rem)' }}
            className={classes.tableArea}
            onScrollPositionChange={({ y }) => setScrolled(y !== 0)}
        >
            <Table
                sx={{
                    minWidth: 700,
                    '& td': {
                        maxWidth: '200px',
                        wordWrap: 'break-word',
                    },
                    '& th': {
                        textTransform: 'capitalize',
                    },
                }}
            >
                <thead className={cx(classes.header, { [classes.scrolled]: scrolled })}>
                    <tr>
                        <th>contribution plan</th>
                        <th>country</th>
                        <th>email</th>
                        <th>first name</th>
                        <th>intrest topic</th>
                        <th>joining reason</th>
                        <th>know about trigan</th>
                        <th>qualification</th>
                        <th>skill</th>
                        <th>time spen</th>
                        {/* colSpan={2} align="right" */}
                        <th>created_at</th>
                        <th>updated_at</th>
                        <th colSpan={2}>actions</th>
                    </tr>
                </thead>
                <tbody>{newdocuments}</tbody>
            </Table>
        </ScrollArea>
    )
}

// {
//   "contribution_plan": "string",
//   "country": "string",
//   "email": "string",
//   "first_name": "string",
//   "interest_topic": "string",
//   "joining_reason": "string",
//   "known_about_trigan": "string",
//   "last_name": "string",
//   "nationality": "string",
//   "qualification": "string",
//   "skill": "string",
//   "time_spend": "string"
// }
