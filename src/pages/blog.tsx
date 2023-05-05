import type { GetStaticProps, NextPage } from 'next'
import { ReactNode, useState, useEffect } from 'react'
import React, { lazy, Suspense } from 'react'
import GlobalLayout from '../components/layouts/GlobalLayout'
import Link from 'next/link'

import { SEO } from '../components/shared/SEO'
import { Title } from '../components/shared/Title'
// import SearchBar from '../components/shared/SearchBar'
// import { newApi } from '../util/newApi'
import { ThemeProvider } from 'next-themes'
import { BlogPost } from '../types/BlogPost'
//import PostsByDate from '../components/Posts/PostsByDate'
// import PostSearch from '../components/Posts/PostSearch'
// import { TextInputField } from '../components/shared/Forms/TextInputField'
import { useRouter } from 'next/router'
// import axios from 'axios'
// import { FadeInWhenVisible } from '../components/shared/FadeInWhenVisible'
// import PostSearchFront from '../components/Posts/PostSearchFront'

// andrey edits
import BlogHeader from '../components/BlogHeader'
import PostSearch from '../components/Posts/PostSearch'
import dynamic from 'next/dynamic'
import { useFrame } from '@react-three/fiber'
import { Head } from 'next/document'
import useSWR from 'swr'
import { AnimationBlob } from '../components/shared/AnimationBlob'
import { RoundProgressBar } from '../components/shared/RoundProgessBar'

const VideoHeader = dynamic(
  () => import('../components/home/HeroSection/VideoHeader')
)

// interface BlogProps {
//   posts: BlogPost
// }

const PostsByDateNoSSR: any = dynamic(
  () => import('../components/Posts/PostsByDate'),
  { ssr: false }
)

const Blog: NextPage<BlogProps> = ({ posts }) => {
  const router = useRouter()
  const [page, setPage] = useState(1)
  const [allPosts, setAllPosts] = useState(posts)
  const [isLoading, setIsloading] = useState(false)
  const [countLoad, setCountLoad] = useState(0)

  // const handleSearch = async (title: string) => {
  //   await router.push('/PostSearch')
  // }

  //is of type string if parameters are properly included
  const { tag, cat } = router.query

  //filter posts based on tag or category in URL
  if (posts && typeof tag === 'string' && typeof cat === 'string') {
    //if both tag and category are supplied, only keep matching posts
    posts.posts = handleQuery(posts, tag, cat)
  } else if (posts && typeof tag === 'string') {
    //if tag parameter is supplied, only keep matching posts
    posts.posts = handleTagQuery(posts, tag)
  } else if (posts && typeof cat === 'string') {
    //if category parameter is supplied, only keep matching posts
    posts.posts = handleCatQuery(posts, cat)
  } else {
    console.log('incorrect query')
  }

  const loadMore = async (e) => {
    e.preventDefault()
    setCountLoad((prev) => prev + 1)
    setIsloading(true)
    let data = null
    //change 3 = (total posts - 5)'i am assuming 8 posts have been given to me'
    if (page === 3) {
      setPage(1)
    } else {
      setPage((prev) => prev + 1)
    }

    try {
      const res = await fetch(
        `https://test1.trigan.org/api/v1/posts?page-size=5&page=${
          page + 1
        }&apiKey=g436739d6734gd6734`
      )

      data = await res.json()
      setAllPosts(data)
    } catch (e) {
      console.log(e)
    } finally {
      setIsloading(false)
    }
  }

  return (
    <div className="relative">
      <VideoHeader isScroll={false} />
      <div className="dark:bg-white ">
        <div
          id="blog"
          className="relative mt-[100px] flex w-full flex-col items-center gap-20"
        >
          <SEO title="Blog" description="Trigan Blog" />
          <GlobalLayout>
            <h1
              className={`w-full text-center text-2xl font-semibold capitalize md:text-5xl`}
            >
              <span className="inline-block border-b-2 border-light p-2 font-m_plus_rounded_1c dark:text-black">
                Blog
              </span>
            </h1>
            {/* <PostSearchFront /> */}
            <PostSearch />
            <div className="mt-20 flex w-full items-center justify-center">
              <div className="h-[1px] w-2/4 bg-[#5B5B5B]" />
            </div>
            {!posts ? (
              <section className="Imgpart_center mx-auto max-w-6xl items-center px-4 py-36 text-slate-100 2xl:max-w-3xl">
                <div className="paragraphStyle m-auto flex w-[90%] flex-wrap rounded-md bg-white/[.1] py-2 text-lg font-extralight md:py-5 md:text-xl">
                  <div className="m-auto flex w-[320px] max-w-screen-sm flex-col text-[25px] md:m-5 md:m-auto md:w-[100%] lg:w-[60%]">
                    <p className="m-10 mt-10 text-lg font-extralight md:text-xl">
                      No posts yet
                    </p>
                  </div>
                </div>
              </section>
            ) : (
              <PostsByDateNoSSR posts={allPosts} />
            )}

            <div className="mb-20 mt-10 flex w-[100%] flex-wrap justify-center">
              <Link href="/blog" passHref as={``}>
                <div
                  className="mr-6 w-max hover:cursor-pointer hover:opacity-50"
                  onClick={(e) => loadMore(e)}
                >
                  <span
                    className={`border-1 flex h-fit flex-row flex-wrap items-center rounded-full border border-[#fff] bg-[#DC2626] px-7 py-1.5 text-[16px] font-medium capitalize text-white`}
                  >
                    {isLoading ? <RoundProgressBar /> : 'Load More'}
                  </span>
                </div>
              </Link>
            </div>

            {/* check which functionality of this blogHeader component, which will render the post cards will be this component or <PostsByDate posts={posts} />. Or should you render the 2? what's the difference, because they seem to be the same content*/}
            {/* <BlogHeader /> */}
          </GlobalLayout>
        </div>
      </div>
    </div>
  )
}

function handleQuery(posts: BlogPost, tag: string, cat: string) {
  //filter through received posts to find those with tag
  return posts.posts.filter((post: BlogPost) => {
    //if any tags on a post match the received tag, include in array
    if (post.tags.includes(tag) && post.categories.includes(cat)) {
      return true
    }
  })
}

function handleTagQuery(posts: BlogPost, tag: string) {
  //filter through received posts to find those with tag
  return posts.posts.filter((post: BlogPost) => {
    //if any tags on a post match the received tag, include in array
    return post.tags.includes(tag)
  })
}

function handleCatQuery(posts: BlogPost, cat: string) {
  //filter through received posts to find those with tag
  return posts.posts.filter((post: BlogPost) => {
    //if any tags on a post match the received tag, include in array
    return post.categories.includes(cat)
  })
}

export async function getServerSideProps() {
  let posts = null

  try {
    const res = await fetch(
      'https://test1.trigan.org/api/v1/posts?page-size=5&page=1&apiKey=g436739d6734gd6734'
      /* `${process.env.URL}posts?&apiKey=${process.env.GET_API_KEY}`*/
    )

    posts = await res.json()
  } catch (e) {
    console.log(e)
  }

  return {
    props: {
      posts: posts,
    },
  }
}

export default Blog
