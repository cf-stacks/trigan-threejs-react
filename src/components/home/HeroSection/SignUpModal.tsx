import React, { useEffect, useState } from 'react'
import { createStyles, Modal } from '@mantine/core'
import axios from 'axios'
import toast from 'react-hot-toast'
import { TextInputField } from '../../shared/Forms/TextInputField'
import { SubscribeForm } from '../../../types/SubscribeForm'
import { useForm } from 'react-hook-form'
import { validateEmail } from '../../../util/functions'
import { TEST_API_URL } from '../../../util/constants'
import useEarlyAccessModal from '../../../hooks/useEarlyAccessModal'

interface Imodal {
  open: boolean
  size: string
  type: string
}

interface IPostModals {
  modal: Imodal
  setModal: React.Dispatch<React.SetStateAction<Imodal>>
  selectedPost?: any
  setSelectedPost?: any
  fetchFunction?: () => Promise<void>
}

export const SignUpModal = ({
  selectedPost = {},
  setSelectedPost = {},
  fetchFunction,
}: IPostModals) => {
  const useStyles = createStyles((theme) => ({
    modal: {
      background: 'transparent',
    },
  }))
  const { classes } = useStyles()
  const { modal, setModal } = useEarlyAccessModal()
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    if (!selectedPost || Object.keys(selectedPost).length === 0) {
      return setLoading(false)
    }
    if (Object.keys(selectedPost).length === 0) return setLoading(true)
    setLoading(false)
  }, [selectedPost])

  const {
    control,
    handleSubmit,
    reset,
    formState: {
      errors: { email, name },
    },
  } = useForm<SubscribeForm>({
    defaultValues: {
      email: '',
      name: '',
    },
  })
  const onSubmit = async (values: SubscribeForm) => {
    console.log('api test', values)
    try {
      await axios.post(
        `${TEST_API_URL}/mailing-early-access/create?apiKey=ABC123`,
        values
      )
      reset()
      toast.success('Signup Request Received!')
    } catch (e) {
      toast.error('Something Went Wrong')
    }
  }

  if (loading) return <></>

  if (modal.type === 'create')
    return (
      <Modal
        opened={modal.open}
        onClose={() => setModal({ ...modal, open: false })}
        // size={'40%'}
        withCloseButton={false}
        padding={0}
        className={'sm:w-full'}
        classNames={{
          modal: classes.modal,
        }}
      >
        <div className="my-3 px-10 py-10 text-left lg:mt-0">
          <h6 className="py-2 text-xl uppercase text-[#DCDCDC]">
            Sign Up for Early Access!
          </h6>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextInputField
              name="name"
              placeholder="Type Your Name"
              control={control as any}
              error={name?.message}
              border="border-[#b4bec8]"
              className="form-input w-full rounded-md border-[#A855F7] shadow-sm"
            />
            <TextInputField
              name="email"
              placeholder="Type Your Email"
              control={control as any}
              rules={{
                validate: {
                  value: (v: string) => validateEmail(v),
                },
              }}
              error={email?.message}
              border="border-[#b4bec8]"
              className="form-input w-full rounded-md border-[#A855F7] shadow-sm"
            />
            <div className="flex w-full justify-center py-4">
              <button className="w-full rounded-md bg-[#A855F7] py-2 font-bold text-white">
                Sign up
              </button>
            </div>
          </form>
        </div>
      </Modal>
    )
  return <></>
}
