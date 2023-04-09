import { ReactNode, useState } from 'react'
import Link from 'next/link'

interface PostSearchProps {
  children?: ReactNode
}

const PostSearch: React.FC<PostSearchProps> = () => {
  const [value, setValue] = useState('')
  return (
    <>
      <section className="mt-10 flex place-content-center">
        <div className="relative">
          <input
            id="search_input"
            placeholder="Search blog here"
            className=" border-paragraph h-[48px] w-[556px] rounded-full bg-white px-8 py-1 align-middle font-light outline-none focus:border-primary  dark:focus:border-primary max-[600px]:w-[250px] md:py-1.5 md:font-medium"
            value={value}
            onChange={(e) => {
              setValue(e.currentTarget.value)
            }}
          />
          <div className="absolute right-0 top-0">
            <Link
              href={{
                pathname: '/postsearch/[searchresult]',
                query: { searchresult: value },
              }}
            >
              <button className="mr-8 mt-3">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z"
                    stroke="#6D6D6D"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M21 21L16.65 16.65"
                    stroke="#6D6D6D"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

export default PostSearch
