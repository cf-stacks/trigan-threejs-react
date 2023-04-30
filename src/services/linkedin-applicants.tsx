import axios, { AxiosError } from 'axios'
import { TEST_API_URL } from '../util/constants'

export interface ApplicantListOptionsType {
  id?: string
  pageIndex?: number
  pageSize?: number
  search?: string
}

export interface ApplicantPDFOptionsType {
  url: string
}

export const fetchApplicants = async (options?: ApplicantListOptionsType) => {
  let params = {}

  if (options) {
    const { id, pageIndex: page, pageSize: page_size, search } = options

    params = search
      ? { search }
      : {
          page,
          page_size,
          linkedin_job_post_id: id,
        }
  }

  try {
    const response: any = await axios.get(
      `${TEST_API_URL}/linkedin-applicant/get`,
      {
        withCredentials: true,
        headers: {
          Authorization: `${localStorage.getItem('access_token')}`,
          'Content-Language': `${localStorage.getItem('content-language')}`,
          Session: `${localStorage.getItem('session_key')}`,
        },
        params,
      }
    )
    return response.data
  } catch (error) {
    console.log(error)
    return error as AxiosError
  }
}

export const fetchPdf = async (options: ApplicantPDFOptionsType) => {
  const { url } = options

  try {
    const response: any = await axios({
      method: 'GET',
      url,
      responseType: 'arraybuffer',
    })
    return response.data
  } catch (error) {
    console.log(error)
    throw error as AxiosError
  }
}
