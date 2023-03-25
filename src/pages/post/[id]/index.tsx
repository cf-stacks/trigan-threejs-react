import { ReactNode } from 'react'
import { BlogPost } from '../../../types/BlogPost'
import type { NextPage } from 'next'
import { ThemeProvider } from 'next-themes'
import { Title } from '../../../components/shared/Title'
import GlobalLayout from '../../../components/layouts/GlobalLayout'

interface PostProps {
  children?: ReactNode
  singlepost: BlogPost
}

const Post: NextPage<PostProps> = ({ singlepost }) => {
  const post = singlepost?.posts[0]
  const createdDate = new Date(post.date_created).toLocaleString()
  const updatedDate = new Date(post.date_updated).toLocaleString()

  return (
    <ThemeProvider attribute="class" enableSystem={true}>
      <GlobalLayout>
        <div
          id={post.id_post}
          className="my-5 mx-5  dark:bg-light-grey md:mx-auto "
        >
          <Title padding="py-3" title={post.title} />
          <div className="grid items-center gap-5 overflow-hidden px-10 py-5 md:grid-cols-4">
            <div className="col-span-3 pt-3">
              <h6 className="font-medium">
                Created: {createdDate}, Updated:
                {updatedDate}
              </h6>
              <h6 className="font-medium">
                Categories:
                {post.categories.map((category: string) => {
                  return (
                    <div key={post.categories.id} className="ml-2 w-max ">
                      <span className="flex flex flex-row flex-wrap items-center rounded-full bg-primary px-2 py-1.5 text-xs font-medium uppercase leading-none text-white">
                        {category}
                      </span>
                    </div>
                  )
                })}
              </h6>
              <h6 className="font-medium">
                Tags:
                {post.tags.map((tag: string) => {
                  return (
                    <div key={post.tags.id} className="ml-2 w-max ">
                      <span className="flex flex flex-row flex-wrap items-center rounded-full bg-primary px-2 py-1.5 text-xs font-medium uppercase leading-none text-white">
                        {`#${tag}`}
                      </span>
                    </div>
                  )
                })}
              </h6>
              <p className="py-2 text-sm">{post.content}</p>
              <h6 className="font-medium">
                Views:
                <p className="py-2 text-sm">{post.views}</p>
              </h6>
              <h6 className="font-medium">
                Votes:
                <p className="py-2 text-sm">{post.votes}</p>
              </h6>
            </div>
          </div>
        </div>
      </GlobalLayout>
    </ThemeProvider>
  )
}

export async function getServerSideProps({ query }: any) {
  const { id } = query
  console.log('id', id)
  const res = await fetch(
    `${process.env.URL}posts?page-size=5&page=1&id_post=${id}&apiKey=${process.env.GET_API_KEY}`
  )
  let singlepost = await res.json()
  console.log('singlepost', singlepost)
  return {
    props: {
      singlepost,
    },
  }
}

export default Post
