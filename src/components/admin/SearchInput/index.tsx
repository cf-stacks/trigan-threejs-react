import { Input, createStyles } from '@mantine/core'
import { IconSearch } from '@tabler/icons'
import { FormEventHandler } from 'react'

interface SearchInputProps {
  handleSearch: FormEventHandler<HTMLFormElement | null>
  search: string
  placeholder: string
  disabled: boolean
  setSearch: React.Dispatch<React.SetStateAction<string>>
}

const useStyles = createStyles((theme) => ({
  searchContainer: {
    marginRight: '1.5rem',
    position: 'relative',
    display: 'flex',
    width: '341px',
    '@media only screen and (max-width: 850px)': {
      width: '300px',
    },

    input: {
      backgroundColor: '#39394B',
      color: 'white',
      borderRadius: '10px',
      padding: '12px 20px',
      paddingRight: '62px',
      width: '100%',
      height: '42px',
    },

    button: {
      borderRadius: '10px',
      position: 'absolute',
      right: '0',
      color: 'white',
      height: '42px',
      width: '42px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
  },
}))

export const SearchInput = ({
  handleSearch,
  search,
  placeholder,
  disabled,
  setSearch,
}: SearchInputProps) => {
  const { classes } = useStyles()

  return (
    <form className={`${classes.searchContainer}`} onSubmit={handleSearch}>
      <Input
        sx={{ width: '100%' }}
        placeholder={placeholder}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        disabled={disabled}
      />
      <button type="submit">
        <IconSearch />
      </button>
    </form>
  )
}
