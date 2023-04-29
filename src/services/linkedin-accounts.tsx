import axios, { AxiosError } from 'axios'
import { TEST_API_URL } from '../util/constants'

export interface AccountsOptionsType {
  pageIndex?: number
  pageSize?: number
  search?: string
}

export const fetchAccounts = async (options?: AccountsOptionsType) => {
  let params = {}

  if (options) {
    const { pageIndex: page, pageSize: page_size, search } = options

    params = search
      ? { search }
      : {
          page,
          page_size,
        }
  }
  try {
    const response: any = await axios.get(
      `${TEST_API_URL}/linkedin-account/get`,
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
    throw error as AxiosError
  }
}
