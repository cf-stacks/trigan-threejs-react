/* eslint-disable @next/next/no-img-element */
import { ReactNode } from 'react'
import { BlogPost } from '../../../types/BlogPost'
import { FadeInWhenVisible } from '../../shared/FadeInWhenVisible'
import Link from 'next/link'
// import Image from 'next/image'

interface PostsByDateProps {
  children?: ReactNode
  posts: BlogPost
}

export const PostsByDate: React.FC<PostsByDateProps> = ({ posts }) => {
  const mockPosts: any[] = posts.posts

  return (
    <div className="m-auto mb-10 flex w-[100%] flex-row flex-wrap justify-center hover:cursor-pointer ">
      {mockPosts.map((BlogPost, i) => {
        const date = new Date(BlogPost.date_created)
        return (
          <div
            key={i}
            className={`c m-10 mt-10 flex grid h-[600px] w-[450px]  justify-around rounded-[5px] border-[1px] border-solid border-indigo-600 bg-white/[.9] shadow-md shadow-[#000000] dark:bg-white dark:text-black max-[600px]:justify-center md:flex md:px-1`}
          >
            <FadeInWhenVisible duration={(i + 1) * 0.2}>
              <div id={BlogPost.id_post.toString()} className="overflow-hidden">
                <div>
                  <div className="flex flex-col">
                    <Link
                      href="/post/[id]"
                      passHref
                      as={`/post/${BlogPost.id_post}`}
                    >
                      <div className="m-auto mt-5 h-[250px] w-[420px]">
                        <img
                          loading="lazy"
                          src="https://contentsnare.com/wp-content/uploads/2021/12/1964-dummy-text-image-generators-1024x576.jpg"
                          alt="Dummy photo"
                          className="h-full w-full object-cover shadow-lg"
                        />
                      </div>
                    </Link>
                    <div className="flex h-[320px] w-[420px] flex-col gap-2 p-2">
                      <pre className="text-xs font-thin">
                        {date.toDateString().toUpperCase()}
                      </pre>
                      <Link
                        href="/post/[id]"
                        passHref
                        as={`/post/${BlogPost.id_post}`}
                      >
                        <h2 className="cursor-pointer text-2xl font-semibold text-primary hover:text-dark">
                          {BlogPost.title}
                        </h2>
                      </Link>
                      <p className="mt-2 flex h-[340px] flex-wrap">
                        {BlogPost.description}
                      </p>
                      <div className="flex h-[50px] w-[400px] flex-row flex-wrap">
                        {BlogPost.tags.map((tag: string) => {
                          return (
                            <div key={BlogPost.tags.id} className="ml-2 w-max ">
                              <span className="flex flex flex-row flex-wrap items-center rounded-full bg-primary px-2 py-1.5 text-xs font-medium uppercase leading-none text-white">
                                 {`#${tag}`}
                              </span>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </FadeInWhenVisible>
          </div>
        )
      })}
    </div>
  )
}
