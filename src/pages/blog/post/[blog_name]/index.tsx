import { ReactNode, useEffect, useState } from 'react'
import { BlogPost } from '../../../../types/BlogPost'
import type { NextPage } from 'next'
import useSWR from 'swr'
import { ThemeProvider } from 'next-themes'
import { Title } from '../../../../components/shared/Title'
import GlobalLayout from '../../../../components/layouts/GlobalLayout'
import { useRouter } from 'next/router'
import { wrap } from 'module'
import ReactMarkdown from 'react-markdown'
import moment from 'moment'
import Link from 'next/link'
import { FadeInWhenVisible } from '../../../../components/shared/FadeInWhenVisible'

interface PostProps {
  children?: ReactNode
  post: any
}

const Post: NextPage<PostProps> = ({ post }) => {
  const router = useRouter()
  const [tags, setTags] = useState(0)
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(20)

  const fetcher = (url: string) =>
    fetch(url).then(async (r) => {
      let resPosts = await r.json()
      return resPosts.posts
    })

  const { data, error } = useSWR(
    `https://test1.trigan.org/api/v1/posts?page-size=${pageSize}&page=${page}&apiKey=g436739d6734gd6734`,
    fetcher
  )

  const { blog_name } = router.query

  function b64_to_utf8(char: string) {
    let demo: any

    if (typeof window !== 'undefined') {
      demo = window.atob(char)
    }
    return demo
  }

  return (
    <ThemeProvider attribute="class" enableSystem={true}>
      <GlobalLayout>
        <div
          id={post?.data.id_post}
          className="my-5 px-16  dark:bg-light-grey md:mx-auto "
        >
          <div className="mb-12 mt-[180px] flex w-[100%] flex-wrap justify-center">
            <span
              className={`flex h-[46px] flex-row flex-wrap items-center rounded-full border border-[#fff] bg-[#DC2626] px-7 py-1.5 text-[16px] font-medium capitalize text-white`}
            >
              {post?.data.tags[tags]}
            </span>
          </div>
          <div className="flex">
            <div className="w-3/4">
              <h1
                className={`w-full text-left text-2xl font-semibold capitalize md:text-5xl`}
              >
                <span className="inline-block py-6 font-m_plus_rounded_1c  dark:text-black">
                  {post?.data.title}
                </span>
              </h1>
              <div className="ml-20 flex pb-10 pt-5 text-lg text-white">
                <p className="mr-10">
                  By <span className="font-medium">{post.data.author}</span>
                </p>
                <p className="mr-10">/</p>
                <p className="mr-10">
                  {moment(post.data.date_created).format('LL')}
                </p>
                <p className="mr-10">/</p>
                <p>5 Min read</p>
              </div>
              <h6 className="full-width-container text-lg font-medium leading-loose">
                <ReactMarkdown>{b64_to_utf8(post.data.content)}</ReactMarkdown>
              </h6>
            </div>
            <div className="ml-4 mt-[180px] flex max-h-[900px] w-1/4 flex-col bg-[#212529]">
              <div className="flex flex-col items-center py-16">
                <h6 className=" mb-6 border-b-2 border-[#848484] pb-3 text-2xl">
                  Categories:
                </h6>
                {post.data.tags.map((tag: string, i: any) => {
                  return (
                    <div
                      key={i}
                      className="w-max py-4"
                      onClick={() => setTags(i)}
                    >
                      <span
                        className={`flex flex flex-row flex-wrap items-center px-2 py-1.5 text-xl font-${
                          tags === i ? 'semibold' : 'light'
                        } leading-none text-white hover:cursor-pointer hover:opacity-50`}
                      >
                        {tag}
                      </span>
                    </div>
                  )
                })}
              </div>
              <div className="h-[1px] w-full bg-[#5B5B5B]" />
              <div className="flex flex-col items-center py-16">
                <Link href="/admin/login" passHref as={``}>
                  <h2 className=" py-4 text-xl font-light text-white underline hover:cursor-pointer hover:text-grey">
                    Login/Register
                  </h2>
                </Link>
                <Link href="/post/[id]" passHref as={``}>
                  <h2 className=" py-4 text-xl font-light text-white underline hover:cursor-pointer hover:text-grey">
                    Edit post
                  </h2>
                </Link>
                <Link href="/blog" passHref as={``}>
                  <h2 className=" py-4 text-xl font-light text-white underline hover:cursor-pointer hover:text-grey">
                    Create Post
                  </h2>
                </Link>
              </div>
            </div>
          </div>
          <div className="my-16 flex flex-col items-center">
            <Link href="/blog" passHref as={``}>
              <div className="mr-6 w-max hover:cursor-pointer hover:opacity-50">
                <span
                  className={`border-1 flex h-[46px] flex-row flex-wrap items-center rounded-full border border-[#fff] bg-[#653394] px-7 py-1.5 text-[16px] font-medium capitalize text-white`}
                >
                  <svg
                    width="20"
                    height="18"
                    viewBox="0 0 20 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M17.0761 2.74657C16.6504 2.32074 16.1451 1.98294 15.5889 1.75247C15.0327 1.522 14.4365 1.40338 13.8344 1.40338C13.2323 1.40338 12.6362 1.522 12.0799 1.75247C11.5237 1.98294 11.0184 2.32074 10.5927 2.74657L9.70941 3.6299L8.82608 2.74657C7.96633 1.88683 6.80027 1.40383 5.58441 1.40383C4.36855 1.40383 3.20249 1.88683 2.34274 2.74657C1.483 3.60631 1 4.77237 1 5.98824C1 7.2041 1.483 8.37016 2.34274 9.2299L3.22608 10.1132L9.70941 16.5966L16.1927 10.1132L17.0761 9.2299C17.5019 8.80427 17.8397 8.29891 18.0702 7.7427C18.3006 7.18648 18.4193 6.59031 18.4193 5.98824C18.4193 5.38616 18.3006 4.78999 18.0702 4.23377C17.8397 3.67756 17.5019 3.1722 17.0761 2.74657Z"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  &nbsp; &nbsp;Like this
                </span>
              </div>
            </Link>
            <div className="flex pb-10 pt-5 text-lg text-white">
              <p className="mr-10">{post.data.votes} &nbsp;likes</p>
              <p className="mr-10">/</p>
              <p>{post.data.views} &nbsp;views</p>
            </div>
            <div className="h-[1px] w-3/4 bg-[#5B5B5B]" />
            <div className="flex flex-col items-center">
              <div className="mt-12 flex h-[110px] w-[110px] overflow-hidden rounded-full">
                <img src={post.data.image_url} alt="avatar" />
              </div>
              <h3 className="py-3 text-2xl">{post.data.author}</h3>
              <p className="pb-10 text-xl font-light text-white">
                Role of the writer that what he do
              </p>
            </div>
            <div className="h-[1px] w-1/4 bg-[#5B5B5B]" />
          </div>
          <div className="mt-10">
            <p className="inline-block border-b-2 border-[#5B5B5B] pb-4 text-xl font-medium text-white">
              Other Article related to {post.data.tags[tags]}
            </p>
            <div className="mb-40 flex flex-wrap justify-between">
              {data?.map((BlogPost: any, i: number) => {
                const date = new Date(BlogPost.date_created)
                let tags = BlogPost.tags
                const uniqueTags = tags.filter((e: any, i: any) => {
                  return tags.indexOf(e) === i
                })
                return (
                  <div
                    className={`c mr-4 mt-20 flex grid h-[696px] w-[400px] justify-around overflow-hidden rounded-[15px] bg-[#212529] shadow-md shadow-[#000000] dark:bg-white dark:text-black max-[600px]:justify-center md:flex  md:px-1`}
                  >
                    <FadeInWhenVisible duration={(i + 1) * 0.2}>
                      <div
                        id={BlogPost.id_post.toString()}
                        className="overflow-hidden"
                      >
                        <div>
                          <div className="flex flex-col">
                            <Link
                              href="/blog/post/[blog_name]"
                              passHref
                              as={`/blog/post/${BlogPost.slug_id}`}
                            >
                              <div className="m-auto h-[263px] w-[400px] hover:cursor-pointer">
                                <img
                                  loading="lazy"
                                  src={
                                    BlogPost?.image_url
                                      ? BlogPost.image_url
                                      : 'https://contentsnare.com/wp-content/uploads/2021/12/1964-dummy-text-image-generators-1024x576.jpg'
                                  }
                                  alt="Dummy photo"
                                  className="h-full w-full rounded-[15px] object-cover shadow-lg"
                                />
                              </div>
                            </Link>
                            <div className="flex w-[400px] flex-col gap-2 px-8 py-4">
                              <div className="flex w-full justify-between">
                                <pre className="text-[12px] font-thin text-[#909090]">
                                  {date.toLocaleDateString('en-US')}
                                </pre>
                                <svg
                                  width="21"
                                  height="19"
                                  viewBox="0 0 21 19"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M17.8665 3.2466C17.4409 2.82077 16.9355 2.48297 16.3793 2.2525C15.8231 2.02203 15.2269 1.90341 14.6248 1.90341C14.0227 1.90341 13.4266 2.02203 12.8704 2.2525C12.3141 2.48297 11.8088 2.82077 11.3831 3.2466L10.4998 4.12993L9.61648 3.2466C8.75674 2.38686 7.59068 1.90386 6.37481 1.90386C5.15895 1.90386 3.99289 2.38686 3.13315 3.2466C2.2734 4.10634 1.79041 5.27241 1.79041 6.48827C1.79041 7.70413 2.2734 8.87019 3.13315 9.72993L4.01648 10.6133L10.4998 17.0966L16.9831 10.6133L17.8665 9.72993C18.2923 9.3043 18.6301 8.79894 18.8606 8.24273C19.091 7.68651 19.2097 7.09034 19.2097 6.48827C19.2097 5.88619 19.091 5.29002 18.8606 4.7338C18.6301 4.17759 18.2923 3.67223 17.8665 3.2466Z"
                                    stroke="#909090"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </div>
                              <div>
                                <span className="text-xs font-light text-white">
                                  Tags:
                                </span>
                              </div>
                              <div className="flex w-[400px] flex-row flex-wrap">
                                {uniqueTags.map(
                                  (tag: string, index: number) => {
                                    return (
                                      <div
                                        key={index}
                                        className="mb-2 mr-2 w-max "
                                      >
                                        <span className="flex flex-row flex-wrap items-center rounded-full bg-[#4D5154] px-2 py-1.5 text-xs font-medium uppercase leading-none text-white">
                                          {`#${tag}`}
                                        </span>
                                      </div>
                                    )
                                  }
                                )}
                              </div>
                              <Link
                                href="/blog/post/[blog_name]"
                                passHref
                                as={`/blog/post/${BlogPost.slug_id}`}
                              >
                                <h2 className=" text-2xl font-semibold text-white hover:cursor-pointer hover:text-grey">
                                  {BlogPost.title}
                                </h2>
                              </Link>
                              <p className="flex flex-wrap text-[16px] font-normal text-white">
                                {BlogPost.short_description}
                              </p>
                              <Link href="/blog" passHref as={``}>
                                <h2 className=" text-lg font-normal text-[#DC2626] underline hover:cursor-pointer hover:text-grey">
                                  Read More
                                </h2>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </FadeInWhenVisible>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </GlobalLayout>
    </ThemeProvider>
  )
}

export async function getServerSideProps(context: any) {
  const res = await fetch(
    `https://test1.trigan.org/api/v1/post/get-one/slug/${context.query.blog_name}?apiKey=g436739d6734gd6734`
  )
  const post = await res.json()
  return {
    props: {
      post,
    },
  }
}
export default Post
