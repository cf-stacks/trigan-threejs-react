import { Title, createStyles } from '@mantine/core'

interface SelectedItemHeaderProps {
  selectedDescription: string
  title: string
  setItemSelected: React.Dispatch<React.SetStateAction<{}>>
}

const useStyles = createStyles((theme) => ({
  checkbox: {
    borderRadius: '2px',
    height: '20px',
    width: '20px',

    input: {
      height: '20px',
      width: '20px',
      outline: '0px !important',

      ':checked, :hover': {
        backgroundColor: '#A855F7 !important',
      },
    },
  },
}))

export const SelectedItemHeader = ({
  selectedDescription,
  title,
  setItemSelected,
}: SelectedItemHeaderProps) => {
  const { classes, cx } = useStyles()

  return (
    <div className="flex content-center py-2 text-center align-middle ">
      <div className="flex flex-row">
        <input
          type="checkbox"
          className="mt-0.5 shrink-0 rounded border-gray-200 text-blue-600 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:checked:border-blue-500 dark:checked:bg-blue-500 dark:focus:ring-offset-gray-800"
          checked
          onChange={() => setItemSelected({})}
        />
        <Title size={20} className="pl-4 text-white">
          {selectedDescription + `:`}
        </Title>
        <Title size={20} className="pl-2 text-slate-500">
          {title}
        </Title>
      </div>
    </div>
  )
}
