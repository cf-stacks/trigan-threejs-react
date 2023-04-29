import { Modal } from '@mantine/core'
import axios from 'axios'
import { ReactNode, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { IEarlyAccessModalContext } from '../../../context/EarlyAccessModalContext'
import useEarlyAccessModal from '../../../hooks/useEarlyAccessModal'
import { ContactUsFormValues } from '../../../types/ContactUsFormValues'
import { validateEmail } from '../../../util/functions'
import { TextInputField } from '../../shared/Forms/TextInputField'
import { TextareaInputField } from '../../shared/Forms/TextareaInputField'

interface ContactUsFormProps {
  children?: ReactNode
  modal: IEarlyAccessModalContext
  setModal: Function
}

interface ContactUsModalProps {
  modal: IEarlyAccessModalContext
  setModal: Function
}

export const ContactUsModal: React.FC<ContactUsModalProps> = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: {
      errors: { country, name, email, content, subject },
    },
  } = useForm<ContactUsFormValues>({
    defaultValues: {
      country: '',
      name: '',
      email: '',
      content: '',
      subject: '',
    },
  })
  const { modal, setModal } = useEarlyAccessModal()
  const [loading, setLoading] = useState(false)
  const onSubmit = async (values: ContactUsFormValues) => {
    console.log('Token====>', localStorage.getItem('access_token'))
    try {
      // await axios.post(`/api/create-mail`, values)
      await axios.post(
        `https://test1.trigan.org/api/v1/mailing-early-access/create?apiKey=ABC123`,
        values,
        {
          withCredentials: true,
          headers: {
            Authorization: `${localStorage.getItem('access_token')}`,
            'Content-Language': `${localStorage.getItem('content-language')}`,
            Session: `${localStorage.getItem('session_key')}`
          },
        }
      )
      reset()
      toast.success('Message Sent Successfully')
    } catch (e) {
      toast.error('Something Went Wrong')
    }
  }

  if (loading) return <></>

  if (modal.type === 'contact')
    return (
      <Modal
        opened={modal.open}
        onClose={() => setModal({ ...modal, open: false })}
        // size={'40%'}
        withCloseButton={false}
        padding={0}
        className={'border border-gray-400 sm:w-full'}
      >
        <div className="bg-white md:mt-5 lg:mt-0">
          <div className="mx-px my-px bg-black px-10 py-10 text-white">
            <h6 className="py-2 text-center text-xl uppercase text-[#DCDCDC] md:text-left">
              Contact Us
            </h6>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-1">
              <TextInputField
                name="name"
                placeholder="Type Your Name"
                control={control as any}
                error={name?.message}
                className="form-input w-full rounded-md border-[#A855F7] shadow-sm"
              />
              <TextInputField
                name="subject"
                placeholder="Type Your Subject"
                control={control as any}
                error={subject?.message}
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
                className="form-input w-full rounded-md border-[#A855F7] shadow-sm"
              />

              <TextInputField
                name="country"
                placeholder="Type Your Country"
                control={control as any}
                error={country?.message}
                className="form-input w-full rounded-md border-[#A855F7] shadow-sm"
              />

              <TextareaInputField
                name="content"
                placeholder="Type Your Message"
                control={control as any}
                error={content?.message}
                className="form-input w-full rounded-md border-[#A855F7] shadow-sm"
              />
              <div className="flex w-full justify-center pb-4">
                <button className="w-full rounded-md bg-[#A855F7] py-2 font-bold text-white">
                  Contact Us
                </button>
              </div>
            </form>
          </div>
        </div>
      </Modal>
    )

  return <></>
}
