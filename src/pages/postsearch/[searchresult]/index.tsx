import { ReactNode } from 'react'
import type { NextPage } from 'next'
import { ThemeProvider } from 'next-themes'
import { Title } from '../../../components/shared/Title'
import GlobalLayout from '../../../components/layouts/GlobalLayout'
import { SEO } from '../../../components/shared/SEO'
import PostSearch from '../../../components/Posts/PostSearch'
import { BlogPost } from '../../../types/BlogPost'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'

interface SearchResultProps {
  children?: ReactNode
  posts: BlogPost
}
const PostsByDateNoSSR: any = dynamic(() => import('../../../components/Posts/PostsByDate'), { ssr: false })

export async function getServerSideProps(context: any) {
  console.log("context value", context.params.searchresult)
  const res = await fetch(
    `https://test1.trigan.org/api/v1/posts/search?apiKey=g436739d6734gd6734&search=${context.params.searchresult}`,
    {
      headers: {
        Session: `${sessionStorage.getItem('session_key')}`
      }
    }
  )
  let posts = await res.json()
  console.log(posts, 'postss resjson !!')
  return {
    props: {
      posts,
    },
  }
}

const SearchResult: NextPage<SearchResultProps> = ({ posts }) => {
  const router = useRouter()
  const { searchresult } = router.query

  return (
    <ThemeProvider attribute="class" enableSystem={true}>
      <div id="postsearch" className='relative mt-[100px] flex w-full flex-col items-center gap-20'>
        <SEO title="Posts Search Results" description="Trigan Blog" />
        <GlobalLayout>
          <Title padding="py-3" title="Search Results" />
          <PostSearch />
          <PostsByDateNoSSR posts={posts} />
        </GlobalLayout>
      </div>
    </ThemeProvider>
  )
}

export default SearchResult
