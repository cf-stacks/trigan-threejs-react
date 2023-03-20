import { SetStateAction, useState, Dispatch } from 'react'
import { Table, Loader, Button, createStyles, ScrollArea } from '@mantine/core'
import { IconMail, IconMessage, IconPencil, IconX } from '@tabler/icons'
import { useRouter } from 'next/router'

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
      borderBottom: `1px solid ${
        theme.colorScheme === 'dark'
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

export interface ApplicantType {
  id: string
  creator_id: string
  created_at: string
  updated_at: string
  linkedin_job_id: string
  name: string
  cv_link: string
  status: string
}

export interface MoadalType {
  open: boolean
  size?: string
  type: 'edit'
}
interface ApplicantsTableProps {
  applicants: ApplicantType[]
  fetching: boolean
  setModal: Dispatch<SetStateAction<MoadalType>>
  setSelectedApplicant: Dispatch<SetStateAction<ApplicantType>>
}

export const ApplicantsTable = ({
  applicants,
  fetching,
  setModal,
  setSelectedApplicant,
}: ApplicantsTableProps) => {
  const { classes, cx } = useStyles()
  const [scrolled, setScrolled] = useState(false)
  const router = useRouter()

  const statusColors = { ACTIVE: 'green', REJECT: '#fcba03', INVITED: 'blue' }

  const newposts =
    applicants.length > 0 ? (
      applicants.map((element: ApplicantType, index: number) => (
        <tr key={index}>
          <th>{element.id}</th>
          <th>{element.creator_id}</th>
          <td>{new Date(element.created_at).toLocaleDateString()}</td>
          <td>{new Date(element.updated_at).toLocaleDateString()}</td>
          <th>{element.linkedin_job_id}</th>
          <th>{element.name}</th>
          <th style={{ color: 'purple' }}>
            <a href={element.cv_link}>Link</a>
          </th>
          <th
            style={{
              color: statusColors[element.status as keyof typeof statusColors],
            }}
          >
            {element.status}
          </th>
          <td>
            <Button.Group>
              <Button
                onClick={() => {
                  setModal({ open: true, type: 'edit' })
                  setSelectedApplicant(element)
                }}
                variant="light"
                color="blue"
              >
                <IconPencil style={{ zIndex: -1 }} />
              </Button>
              <Button onClick={() => {}} variant="light" color="blue">
                <IconMail style={{ zIndex: -1 }} />
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
            <th>id</th>
            <th>creator id</th>
            <th>created at</th>
            <th>updated at</th>
            <th>linkedin job id</th>
            <th>name</th>
            <th>cv link</th>
            <th>status</th>
            <th colSpan={2} align="right">
              actions
            </th>
          </tr>
        </thead>
        <tbody>{newposts}</tbody>
      </Table>
    </ScrollArea>
  )
}
