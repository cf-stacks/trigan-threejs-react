import { SetStateAction, useState, Dispatch } from 'react'
import { Table, Loader, Button, createStyles, ScrollArea } from '@mantine/core'
import { IconPencil, IconX } from '@tabler/icons'
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

export interface JobType {
  id: string
  creator_id: string
  created_at: string
  updated_at: string
  linkedin_account_id: string
  title: string
  description: string
  job_id: string
  link: string
  is_active: boolean
}

interface AccountsTableProps {
  jobs: JobType[]
  fetching: boolean
}

export const JobsTable = ({ jobs: users, fetching }: AccountsTableProps) => {
  const { classes, cx } = useStyles()
  const [scrolled, setScrolled] = useState(false)
  const router = useRouter()

  const newposts =
    users.length > 0 ? (
      users.map((element: JobType, index: number) => (
        <tr key={index}>
          <th>{element.id}</th>
          <th>{element.creator_id}</th>
          <td>{new Date(element.created_at).toLocaleDateString()}</td>
          <td>{new Date(element.updated_at).toLocaleDateString()}</td>
          <th>{element.linkedin_account_id}</th>
          <th>{element.title}</th>
          <th>
            <div
              style={{
                whiteSpace: 'pre-line',
                height: '100px',
                overflowY: 'scroll',
              }}
            >
              {element.description}
            </div>
          </th>
          <th>{element.job_id}</th>
          <th style={{ color: 'purple' }}>
            <a href={element.link}>link</a>
          </th>
          <th>{element.is_active ? 'Yes' : 'No'}</th>
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
            <th>linkedin account id</th>
            <th>title</th>
            <th>description</th>
            <th>job_id</th>
            <th>link</th>
            <th>is active</th>
          </tr>
        </thead>
        <tbody>{newposts}</tbody>
      </Table>
    </ScrollArea>
  )
}
