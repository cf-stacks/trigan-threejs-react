// This file is responsible for handling models that dispalay on admin/posts (create-edit-delete) modals
// all the post info are state variables and they change based on what is the current modal

// the requests are made on ***handleCreate, handleEdit and handleDelete*** functions

import React, {
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
  useCallback,
} from 'react'
import {
  Button,
  Modal,
  Title,
  TextInput,
  Divider,
  createStyles,
  Text,
  Avatar,
} from '@mantine/core'
import axios from 'axios'
import { ListItems } from './List'
import { TEST_API_URL } from '../../../util/constants'
import toast from 'react-hot-toast'
import { BlogPost } from '../../../types/BlogPost'
import { getErrorMsg } from '../../../util/api'
import RichTextEditor from '../content/RichText'
import { IoClose } from 'react-icons/io5'

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

  tagInput: {
    borderRadius: '1.5rem 0rem 0rem 1.5rem !important',
  },

  tagButton: {
    borderRadius: '0rem 1.5rem 1.5rem 0rem !important',
    height: '36px',
    display: 'flex',
    alignItems: 'center',
    padding: '1rem',
    backgroundColor: '#653494',
    border: '1px solid #653494',
    color: 'white',
  },
}))

interface TagInputProps {
  label: string
  value: string[]
  onChange: Dispatch<SetStateAction<string[]>>
}

const TagInput = ({ label, value, onChange }: TagInputProps) => {
  const { classes, cx } = useStyles()
  const [text, setText] = useState('')

  const addItem = useCallback(() => {
    setText('')
    onChange((prev) => prev.concat(text))
  }, [text, setText, onChange])

  const removeItem = useCallback(
    (index) => {
      onChange((prev) => [...prev.slice(index)])
    },
    [onChange]
  )

  return (
    <div>
      <div className="mb-2 flex text-sm">
        <TextInput
          classNames={{
            input: cx('bg-transparent', classes.tagInput),
            label: 'text-white',
          }}
          label={label}
          className="w-full"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <div className="flex items-end">
          <button
            className={cx('whitespace-nowrap', classes.tagButton)}
            onClick={addItem}
            disabled={!text}
          >
            Add
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {value.map((item, i) => (
          <div
            key={item}
            className="inline-flex items-center gap-2 rounded-3xl bg-[#212529] px-2 py-1 text-[#828282]"
          >
            <span>{item}</span>

            <IoClose className="cursor-pointer" onClick={() => removeItem(i)} />
          </div>
        ))}
      </div>
    </div>
  )
}

interface Imodal {
  open: boolean
  size: string
  type: string
}
interface IPostModals {
  modal: Imodal
  setModal: React.Dispatch<React.SetStateAction<Imodal>>
  selectedPost: BlogPost
  setSelectedPost: React.Dispatch<React.SetStateAction<Record<string, any>>>
  fetchFunction: () => Promise<void>
}
export const PostsModals = ({
  modal,
  setModal,
  selectedPost,
  setSelectedPost,
  fetchFunction,
}: IPostModals) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [content, setContent] = useState('')
  const [categories, setCategories] = useState<string[]>([])
  const [tags, setTags] = useState<string[]>([])
  const [originalFilename, setOriginalFilename] = useState('')
  const [loading, setLoading] = useState(true)

  const { classes } = useStyles()
  useEffect(() => {
    if (!selectedPost || Object.keys(selectedPost).length === 0) {
      setTitle('')
      setAuthor('')
      setContent('')
      setCategories([])
      setTags([])
      setOriginalFilename('')
      return setLoading(false)
    }
    if (Object.keys(selectedPost).length === 0) return setLoading(true)
    setTitle(selectedPost.title)
    setAuthor(selectedPost.author)
    setContent(window.atob(selectedPost.content))
    setCategories(selectedPost.categories as [])
    setTags(selectedPost.tags as [])
    setOriginalFilename(selectedPost.original_filename)
    setLoading(false)
  }, [selectedPost])

  // ****************************** API REQUEST FUNCTIONS ******************************

  const handleDelete = async () => {
    try {
      await axios.delete(`${TEST_API_URL}/posts/${selectedPost.id_post}`, {
        withCredentials: true,
        headers: {
          Authorization: `${localStorage.getItem('access_token')}`,
        },
      })
      void fetchFunction()
      toast.success('Deleted Successfully')
      setModal({ ...modal, open: false })
    } catch (error) {
      toast.error(getErrorMsg(error))
    }
  }
  const handleCreate = async (e: any) => {
    e.preventDefault()
    console.log('Handle Create')
    const newPost = {
      title,
      author,
      content,
      categories,
      tags,
      originalFilename,
    }
    try {
      await axios.post(`${TEST_API_URL}/posts`, newPost, {
        withCredentials: true,
        headers: {
          Authorization: `${localStorage.getItem('access_token')}`,
        },
      })
      void fetchFunction()
      setModal({ ...modal, open: false })
      toast.success('Created Successfully')
    } catch (error) {
      toast.error(getErrorMsg(error))
    }
  }
  const handleEdit = async () => {
    const newPost = {
      title,
      author,
      content,
      categories,
      tags,
      originalFilename,
    }
    try {
      const res = await axios.put(
        `${TEST_API_URL}/posts/${selectedPost.id_post}`,
        newPost,
        {
          withCredentials: true,
          headers: {
            Authorization: `${localStorage.getItem('access_token')}`,
          },
        }
      )
      console.log(res)
      void fetchFunction()
      setModal({ ...modal, open: false })
      toast.success('Created Successfully')
    } catch (error) {
      toast.error(getErrorMsg(error))
    }
  }

  // ****************************** API REQUEST FUNCTIONS END ******************************

  // this function closes the modal and sets the selected post to an empty string (resets the state variables)
  // this function is not called when closing create modal because we don't want to reset the variables,
  // in case the user accidentally closes the modal, the values will remain.
  const handleClose = () => {
    setSelectedPost({})
    setModal({ ...modal, open: false })
  }

  if (loading) return <></>
  const onChange = () => console.log('okay')

  if (modal.type === 'create')
    return (
      <Modal
        opened={modal.open}
        onClose={() => setModal({ ...modal, open: false })}
        size={961}
        withCloseButton={false}
        classNames={{ modal: 'p-[50px]' }}
        style={{ backgroundColor: '#000000' }}
      >
        <Title size={36} className="mb-8 text-white">
          Create a new post
        </Title>

        <form onSubmit={handleCreate}>
          <div className="flex gap-x-10">
            <div className="mb-4 w-full">
              <TextInput
                classNames={{
                  input: 'bg-transparent rounded-3xl',
                  label: 'text-white',
                }}
                label="Title for the post"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="mb-4 w-full">
              <TextInput
                classNames={{
                  input: 'bg-transparent rounded-3xl',
                  label: 'text-white',
                }}
                label="Author of the post"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
            </div>
          </div>

          <div className="flex gap-x-10">
            <div className="mb-4 w-full">
              <TagInput
                label="Category"
                value={categories}
                onChange={setCategories}
              />
            </div>

            <div className="mb-4 w-full">
              <TagInput label="Tags" value={tags} onChange={setTags} />
            </div>

            <div className="mb-4 w-full">
              <TextInput
                classNames={{
                  input: 'bg-transparent rounded-3xl',
                  label: 'text-white',
                }}
                label="Original file name"
                value={originalFilename}
                onChange={(e) => setOriginalFilename(e.target.value)}
              />
            </div>
          </div>

          <div style={{ padding: '0 20px 20px' }}>
            <Text weight={500}>Content</Text>
            <RichTextEditor value={content} onChange={setContent} id="rte" />
          </div>

          <div
            style={{
              padding: '20px',
              display: 'flex',
              justifyContent: 'flex-end',
            }}
          >
            <Button
              variant="outline"
              color="blue"
              onClick={() => setModal({ ...modal, open: false })}
              classNames={{ root: 'border-white rounded-3xl text-white mr-4' }}
            >
              cancel
            </Button>

            <Button
              variant="outline"
              type="submit"
              color="green"
              mr={'1rem'}
              onClick={handleCreate}
              classNames={{
                root: 'border-white bg-red-600 rounded-3xl text-white mr-4',
              }}
            >
              Submit
            </Button>
          </div>
        </form>
      </Modal>
    )

  if (modal.type === 'delete')
    return (
      <Modal
        opened={modal.open}
        onClose={() => handleClose}
        size={'md'}
        withCloseButton={false}
      >
        <Title order={4}>
          Are you sure you want to delete {selectedPost.title} ?
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
          Editing {selectedPost.title}
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
                  label="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <TextInput
                  label="Author"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                />
              </div>

              <TextInput
                label="Original file Name"
                value={originalFilename}
                onChange={(e) => setOriginalFilename(e.target.value)}
              />
            </div>
            <div className={classes.formChild}>
              <Title order={4}>Categories</Title>
              <ListItems array={categories} setArray={setCategories} />
            </div>
            <div className={classes.formChild}>
              <Title order={4}>Tags</Title>
              <ListItems array={tags} setArray={setTags} />
            </div>
          </section>
          <div style={{ padding: '0 20px 20px' }}>
            <Text weight={500}>Content</Text>
            <div id="rte">
              <RichTextEditor value={content as string} onChange={setContent} />
            </div>
          </div>
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
