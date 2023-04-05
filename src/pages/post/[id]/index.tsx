import { ReactNode, useState } from 'react'
import { BlogPost } from '../../../types/BlogPost'
import type { NextPage } from 'next'
import { ThemeProvider } from 'next-themes'
import { Title } from '../../../components/shared/Title'
import GlobalLayout from '../../../components/layouts/GlobalLayout'
import { useRouter } from 'next/router'
import { wrap } from 'module'
import ReactMarkdown from 'react-markdown'

interface PostProps {
  children?: ReactNode
  post: any
}

const Post: NextPage<PostProps> = ({ post }) => {
  const router = useRouter()

  const { id } = router.query
  console.log('ROUTERID', id)

  const createdDate = new Date(post.data.date_created).toLocaleString()
  const updatedDate = new Date(post.data.date_updated).toLocaleString()

function b64_to_utf8(char:string) {
  let demo : any;
  
  if (typeof window !== 'undefined') {
    demo = window.atob(char);
  }
  return demo;
  // console.log("kjdfkjndf",window.atob(char))
  
  //  return decodeURIComponent(escape(window.atob( char )));
  // const buff = Buffer.from(char, "base64");
  // console.log("kjknnlklk",buff.toString("utf8"))
  // return buff.toString("utf8");
}

  return (
    <ThemeProvider attribute="class" enableSystem={true}>
      <GlobalLayout>
        <div
          id={post.data.id_post}
          className="my-5 mx-5  dark:bg-light-grey md:mx-auto "
        >
          <Title padding="py-3" title={post.data.title} />
          <div className="grid items-center gap-5 overflow-hidden px-10 py-5 md:grid-cols-4">
            <div className="col-span-3 pt-3">
              <h6 className="font-medium">
                Created: {createdDate}, Updated:
                {updatedDate}
              </h6>
              <h6 className="font-medium">
                Categories:
                {post.data.categories.map((category: string,i:any) => {
                  return (
                    <div key={i} className="ml-2 w-max ">
                      <span className="flex flex flex-row flex-wrap items-center rounded-full bg-primary px-2 py-1.5 text-xs font-medium uppercase leading-none text-white">
                        {category}
                      </span>
                    </div>
                  )
                })}
              </h6>
              <h6 className="font-medium">
                Tags:
                {post.data.tags.map((tag: string,i:any) => {
                  return (
                    <div key={i} className="ml-2 w-max ">
                      <span className="flex flex flex-row flex-wrap items-center rounded-full bg-primary px-2 py-1.5 text-xs font-medium uppercase leading-none text-white">
                        {`#${tag}`}
                      </span>
                    </div>
                  )
                })}
              </h6>
              <h6 className="font-medium">
                Content:
                {/* <p className="py-2 text-sm" style={{wordWrap:'break-word'}}>{b64_to_utf8(post.data.content)}</p> */}
              <ReactMarkdown>{b64_to_utf8(post.data.content)}</ReactMarkdown>
              </h6>
              <h6 className="font-medium">
                Views:
                <p className="py-2 text-sm">{post.data.views}</p>
              </h6>
              <h6 className="font-medium">
                Votes:
                <p className="py-2 text-sm">{post.data.votes}</p>
              </h6>
            </div>
          </div>
        </div>
      </GlobalLayout>
    </ThemeProvider>
  )
}

export async function getServerSideProps(context: any) {
  // console.log('id', context.params.id)
  const res = await fetch(
    `https://test1.trigan.org/api/v1/post/get-one/${context.params.id}?apiKey=g436739d6734gd6734`
  )
  let post = await res.json()
  // console.log('post', post)
  return {
    props: {
      post,
    },
  }
}

export default Post
