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
// import { PostsByDate } from '../components/Posts/PostsByDate'
// import PostSearch from '../components/Posts/PostSearch'
// import { TextInputField } from '../components/shared/Forms/TextInputField'
import { useRouter } from 'next/router'
// import axios from 'axios'
// import { FadeInWhenVisible } from '../components/shared/FadeInWhenVisible'
// import PostSearchFront from '../components/Posts/PostSearchFront'

// andrey edits
import BlogHeader from '../components/BlogHeader'
import PostSearch from '../components/Posts/PostSearch'
import { PostsByDate } from '../components/Posts/PostsByDate'
import dynamic from 'next/dynamic'
import { useFrame } from '@react-three/fiber'
import { Head } from 'next/document'

const VideoHeader = dynamic(
  () => import('../components/home/HeroSection/VideoHeader')
)

interface BlogProps {
  children?: ReactNode
  posts: BlogPost
}

const Blog: NextPage<BlogProps> = ({ posts }) => {
  const router = useRouter()

  const handleSearch = async (title: string) => {
    await router.push('/PostSearch')
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
              <span className="inline-block border-b-2 border-light p-2 font-m_plus_rounded_1c  dark:text-black">
                Blog
              </span>
            </h1>
            {/* <PostSearchFront /> */}
            <PostSearch />
            <div className='flex w-full justify-center items-center mt-20'>
              <div className="h-[1px] w-2/4 bg-[#5B5B5B]" />
            </div>
            <PostsByDate posts={posts} />
            <div className="mt-10 mb-20 flex w-[100%] flex-wrap justify-center">
              <Link href="/blog" passHref as={``}>
                <div className="mr-6 w-max hover:cursor-pointer hover:opacity-50">
                  <span
                    className={`border-1 flex h-[46px] flex-row flex-wrap items-center rounded-full border border-[#fff] bg-[#DC2626] px-7 py-1.5 text-[16px] font-medium capitalize text-white`}
                  >
                    Load More
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

export async function getServerSideProps() {
  const res = await fetch(
    'https://test1.trigan.org/api/v1/posts?page-size=5&page=1&apiKey=g436739d6734gd6734'
    /* `${process.env.URL}posts?&apiKey=${process.env.GET_API_KEY}`*/
  )

  let posts = await res.json()
  console.log(posts, 'postss resjson !!')

  return {
    props: {
      posts,
    },
  }
}

export default Blog
