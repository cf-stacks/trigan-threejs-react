import { useState } from 'react'
import {
    Table,
    Loader,
    Button,
    createStyles,
    ScrollArea,
} from '@mantine/core'
import { IconPencil, IconX } from '@tabler/icons'

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

export const HiringRoleProcessTable = ({
    documents,
    fetching,
    setModal,
    setSelectedDocument,
}: any) => {
    const { classes, cx } = useStyles()
    const [scrolled, setScrolled] = useState(false)
    const newdocuments =
        documents?.Data?.length > 0 ? (
            documents?.Data?.map((element: any, index: number) => (
                <tr key={index}>
                    <td>{element.name}</td>
                    <td>{element.description}</td>
                    <td>{element.creator_id}</td>
                    <td>{element.updater_id}</td>
                    <td>{new Date(element.created_at as Date).toLocaleDateString()}</td>
                    <td>{new Date(element.updated_at as Date).toLocaleDateString()}</td>
                    <td>
                        <Button.Group>
                            <Button
                                onClick={() => {
                                    setModal({ open: true, type: 'edit' })
                                    setSelectedDocument(element)
                                }}
                                variant="light"
                                color="blue"
                            >
                                <IconPencil style={{ zIndex: 90 }} />
                            </Button>
                            <Button
                                onClick={() => {
                                    setModal({ open: true, type: 'delete' })
                                    setSelectedDocument(element)
                                }}
                                variant="light"
                                color="red"
                            >
                                <IconX style={{ zIndex: 90 }} />
                            </Button>
                        </Button.Group>
                    </td>
                </tr>
            ))
        ) : documents?.Success == 'true' ? (
                <tr>
                    <td>{documents?.Data?.name}</td>
                    <td>{documents?.Data?.description}</td>
                    <td>{documents?.Data?.creator_id}</td>
                    <td>{documents?.Data?.updater_id}</td>
                    <td>{new Date(documents?.Data?.created_at as Date).toLocaleDateString()}</td>
                    <td>{new Date(documents?.Data?.updated_at as Date).toLocaleDateString()}</td>
                    <td>
                        <Button.Group>
                            <Button
                                onClick={() => {
                                    setModal({ open: true, type: 'edit' })
                                    setSelectedDocument(documents?.Data)
                                }}
                                variant="light"
                                color="blue"
                            >
                                <IconPencil style={{ zIndex: 90 }} />
                            </Button>
                            <Button
                                onClick={() => {
                                    setModal({ open: true, type: 'delete' })
                                    setSelectedDocument(documents?.Data)
                                }}
                                variant="light"
                                color="red"
                            >
                                <IconX style={{ zIndex: 90 }} />
                            </Button>
                        </Button.Group>
                    </td>
            </tr>
        ) : (
                    <tr>
                        <td colSpan={8} style={{ textAlign: 'center' }}>
                            No Data
                        </td>
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
                <thead className={cx(classes.header, { [classes.scrolled]: scrolled })} style={{ zIndex: 120 }}>
                    <tr>
                        <th>name</th>
                        <th >description</th>
                        {/* colSpan={2} align="right" */}
                        <th>creator id</th>
                        <th>updater id</th>
                        <th>created at</th>
                        <th>updated at</th>
                        <th colSpan={2} align="right">
                            actions
                        </th>
                    </tr>
                </thead>
                <tbody>{newdocuments}</tbody>
            </Table>
        </ScrollArea>
    )
}
