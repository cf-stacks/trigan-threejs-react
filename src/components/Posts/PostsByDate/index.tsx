/* eslint-disable @next/next/no-img-element */
import { ReactNode, useState } from 'react'
import { BlogPost } from '../../../types/BlogPost'
import { FadeInWhenVisible } from '../../shared/FadeInWhenVisible'
import Link from 'next/link'
// import Image from 'next/image'

interface PostsByDateProps {
  children?: ReactNode
  posts: BlogPost
}

export const PostsByDate: React.FC<PostsByDateProps> = ({ posts }) => {
  const [selectedTag, setSelectedTag] = useState(0)
  const mockPosts: any[] = posts.posts ?? []
  const tagsArray: any[] = ['Agriculture', 'Web3', 'Crypto', 'Metavarse']
  return (
    <>
      <div className="mb-8 mt-16 flex w-[100%] flex-wrap justify-center">
        {tagsArray.map((tag, i) => {
          return (
            <div
              key={i}
              className="mr-6 w-max hover:cursor-pointer hover:opacity-50"
              onClick={() => setSelectedTag(i)}
            >
              <span
                className={`border-1 flex flex-row flex-wrap items-center rounded-full border border-[#653394] bg-[${
                  selectedTag === i ? '#653394' : 'none'
                }] h-[46px] px-6 py-1.5 text-[16px] font-medium capitalize text-white`}
              >
                {tag}
              </span>
            </div>
          )
        })}
      </div>
      <div className="m-auto mb-10 flex w-[100%] flex-row flex-wrap justify-center">
        {mockPosts.map((BlogPost, i) => {
          const date = new Date(BlogPost.date_created)
          let tags = BlogPost.tags
          const uniqueTags = tags.filter((e: any, i: any) => {
            return tags.indexOf(e) === i
          })
          return (
            <div
              key={i}
              className={` m-10 mt-10 flex grid h-[696px] w-[400px] justify-around overflow-hidden rounded-[15px] bg-[#212529] shadow-md shadow-[#000000] dark:bg-white dark:text-black max-[600px]:justify-center md:flex  md:px-1`}
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
                          {uniqueTags.map((tag: string, index: number) => {
                            return (
                              <div key={index} className="mb-2 mr-2 w-max ">
                                <span className="flex flex-row flex-wrap items-center rounded-full bg-[#4D5154] px-2 py-1.5 text-xs font-medium uppercase leading-none text-white">
                                  {`#${tag}`}
                                </span>
                              </div>
                            )
                          })}
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
                        <Link
                          href="/blog/post/[blog_name]"
                          passHref
                          as={`/blog/post/${BlogPost.slug_id}`}
                        >
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
    </>
  )
}
