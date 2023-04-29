import axios from 'axios';
import { ReactNode } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { ContactUsFormValues } from '../../../types/ContactUsFormValues';
import { validateEmail } from '../../../util/functions';
import { TextInputField } from '../../shared/Forms/TextInputField';
import { TextareaInputField } from '../../shared/Forms/TextareaInputField';

interface ContactUsFormProps {
  children?: ReactNode;
}

export const ContactUsForm: React.FC<ContactUsFormProps> = () => {
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
  });
  const onSubmit = async (values: ContactUsFormValues) => {
    console.log('Token====>', localStorage.getItem('access_token'));
    try {
      await axios.post(
        `https://test1.trigan.org/api/v1/mailing-early-access/create?apiKey=ABC123`,
        values,
        {
          withCredentials: true,
          headers: {
            Authorization: `${localStorage.getItem('access_token')}`,
            'Content-Language': `${localStorage.getItem('content-language')}`,
            Session: `${localStorage.getItem('session_key')}`,
          },
        }
      );
      reset();
      toast.success('Message Sent Successfully');
    } catch (e) {
      toast.error('Something Went Wrong');
    }
  };
  return (
    <div className="home_form_input md:mt-5 lg:mt-0">
      <h6 className="py-2 text-center text-xl uppercase md:text-left">
        Leave us a message
      </h6>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-1">
        {/* ... */}
      </form>
    </div>
  );
};