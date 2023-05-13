  /* eslint-disable @next/next/no-img-element */
import { ReactNode, useLayoutEffect, useState } from 'react'
import { BlogPost } from '../../../types/BlogPost'
import { FadeInWhenVisible } from '../../shared/FadeInWhenVisible'
import Link from 'next/link'
import router, { useRouter } from 'next/router'
interface PostsByDateProps {
  children?: ReactNode
  posts: BlogPost
}

const PostsByDate: React.FC<PostsByDateProps> = ({ posts }) => {
  // console.log('allPosts = ', posts)
  const router = useRouter()
  const [selectedTag, setSelectedTag] = useState(0)
  const [sidebarShow, setSidebarShow] = useState(false)
  const mockPosts: any[] = posts.posts ?? []
  const tagsArray: any[] = ['Agriculture', 'Web3', 'Crypto', 'Metavarse']
  const [allPosts, setPosts] = useState(null)

  const maxTags = 2;

  //on load, all posts are fetched directly from api and set to state so sidebar can show all tags
  useLayoutEffect(() => {
    fetch('https://test1.trigan.org/api/v1/posts?apiKey=g436739d6734gd6734', {
      headers: {
        Session: `${localStorage.getItem('session_key')}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setPosts(data))
      .catch((error) => console.error(error))
  }, [])

  let catsArrayPosts: any[] = []
  let tagsArrayPosts: any[] = []

  if (allPosts !== null) {
    //if data has been fetched, tags from all posts are shown
    const { t, c }: { t: string[]; c: string[] } = removeDuplicates(allPosts)
    catsArrayPosts = [...c]
    tagsArrayPosts = [...t]
  } else {
    //if data hasn't been fetched yet, show tags for current post
    const { t, c }: { t: string[]; c: string[] } = removeDuplicates(posts)
    catsArrayPosts = [...c]
    tagsArrayPosts = [...t]
  }

  return (
    <>
      <div className={`tags mb-8 mt-16 flex w-full flex-wrap justify-center`}>
        {tagsArray.map((tag, i) => {
          return (
            <div
              key={i}
              className="mr-6 w-max hover:cursor-pointer hover:opacity-50"
              onClick={() => setSelectedTag(i)}
            >
              <span
                className={`border-1 flex flex-row flex-wrap items-center rounded-full border border-[#653394] bg-[${selectedTag === i ? '#653394' : 'none'
                  }] h-[46px] px-6 py-1.5 text-[16px] font-medium capitalize text-white`}
              >
                {tag}
              </span>
            </div>
          );
        })}
      </div>


      <button
        title="Show sidebar"
        className="mobileButton"
        onClick={(e) => setSidebarShow(!sidebarShow)}
      >
        <img alt="image" src="https://cdn.shopify.com/s/files/1/2439/4751/products/Arrow-450x200.jpg?v=1608697847&width=600" />
      </button>
      <div className="check flex justify-center mx-auto lg:ml-8">
        <div
          className={`col-span-4  mb-1 flex w-2/3 flex-row flex-wrap justify-center ${
            !sidebarShow ? `postSec` : `hideit`
          } `}
        >
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            
            {mockPosts.length === 0 ? (
              <div className="text-[16px] text-white text-center">No posts to display</div>
            ) : (  
              mockPosts.map((BlogPost, i) => {
                return (
                  <div
                    key={i}
                    className="post lg:h-[36rem] rounded-[15px] lg:pb-5 pb-8  bg-[#212529] shadow-md shadow-[#000000] dark:bg-white dark:text-black mr-2"
                  >
                    <Link
                      href="/blog/post/[blog_name]"
                      passHref
                      as={`/blog/post/${BlogPost.slug_id}`}
                      >
                      <div className="cursor-pointer">
                        <img
                          loading="lazy"
                          src={
                            BlogPost?.image_url
                            ? BlogPost.image_url
                            : 'https://contentsnare.com/wp-content/uploads/2021/12/1964-dummy-text-image-generators-1024x576.jpg'
                          }
                          alt="Dummy photo"
                          className="h-64  w-full rounded-t-[15px] object-cover shadow-lg"
                        />
                      </div>
                    </Link>
                    <div className="lg:p-4 mx-2">
                      <pre className="font lg:px-3 px-1 text-[12px] font-thin text-[#909090]">
                        {new Date(BlogPost.date_created).toLocaleDateString('en-US')}
                      </pre>
                      <div className="mt-2">
                        <span className="lg:px-3 px-1 font tag text-xs font-light text-white">
                          Tags:
                        </span>
                      </div>

                      <div className={`lg:px-3 px-1 font justify-start flex flex-row flex-wrap mt-1 max-h-6 overflow-hidden ${BlogPost.tags.length > maxTags ? 'line-clamp-1' : ''}`}>
                        {BlogPost.tags.slice(0, maxTags).map((tag: any, index: number) => (
                          <div key={index} className="mb-2 mr-2">
                            <span className="flex flex-row items-center rounded-full bg-[#4D5154] px-2 py-1.5 text-xs font-medium uppercase leading-none text-white">
                              {`#${tag}`}
                            </span>
                          </div>
                        ))}
                        {BlogPost.tags.length > maxTags && <span className="text-white font-bold text-md">..</span>}
                      </div>

                      <Link
                        href="/blog/post/[blog_name]"
                        passHref
                        as={`/blog/post/${BlogPost.slug_id}`}
                      >
                        <h2 className="text-2xl truncate lg:px-3 px-1 font-semibold text-white mt-4 hover:cursor-pointer hover:text-grey">
                          {BlogPost.title}
                        </h2>
                      </Link>
                      <p className="wrap font lg:px-3 px-1 text-[16px] font-normal text-white mt-2 line-clamp-3">
                        {BlogPost.short_description}
                      </p>
                      <Link
                        href="/blog/post/[blog_name]"
                        passHref
                        as={`/blog/post/${BlogPost.slug_id}`}
                        >
                        <h2 className="text-lg font-normal text-[#DC2626] underline mt-2 hover:cursor-pointer hover:text-grey">
                          Read More
                        </h2>
                      </Link>
                    </div>
                  </div>
              
              
              );
            })
            )}
          </div>
        </div>

        <div
          className={`flex w-1/3 justify-center ${
            sidebarShow ? `media` : `hideit`
          }`}
        >
          {/*UX dynamic sidebar width for when there are less than 2 posts*/}
          <div
            className={`ml-4 mt-[40px] flex  h-fit w-[${
              mockPosts.length < 2 ? '100%' : '70%'
            }]  flex-col bg-[#212529]`}
          >
            <div className="flex flex-col items-center py-16">
              <h6 className=" font mb-6 border-b-2 border-[#848484] pb-3 text-2xl">
                Categories:
              </h6>
              {catsArrayPosts.map((cat: string, i: any) => {
                return (
                  <div
                    key={i}
                    className="font w-max  py-4"
                    onClick={() => {
                      router.push({
                        pathname: '/blog',
                        query: { cat: cat },
                      })
                    }}
                  >
                    <span
                      className={`font flex  flex-row flex-wrap items-center px-2 py-1.5 text-xl font-light leading-none text-white hover:cursor-pointer hover:opacity-50`}
                    >
                      {cat}
                    </span>
                  </div>
                )
              })}
            </div>

            <div className="flex flex-col items-center py-16">
              <h6 className=" font mb-6 border-b-2 border-[#848484] pb-3 text-2xl">
                Tags:
              </h6>
              {tagsArrayPosts.map((tag: string, i: any) => {
                return (
                  <div
                    key={i}
                    className="font w-max py-4"
                    onClick={() => {
                      router.push({
                        pathname: '/blog',
                        query: { tag: tag },
                      })
                    }}
                  >
                    <span
                      className={`font  flex flex-row flex-wrap items-center px-2 py-1.5 text-xl font-light leading-none text-white hover:cursor-pointer hover:opacity-50`}
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
                <h2 className="font py-4 text-xl font-light text-white underline hover:cursor-pointer hover:text-grey">
                  Login/Register
                </h2>
              </Link>
              <Link href="/post/[id]" passHref as={``}>
                <h2 className=" font py-4 text-xl font-light text-white underline hover:cursor-pointer hover:text-grey">
                  Edit post
                </h2>
              </Link>
              <Link href="/blog" passHref as={``}>
                <h2 className=" font py-4 text-xl font-light text-white underline hover:cursor-pointer hover:text-grey">
                  Create Post
                </h2>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

//makes sure tags and categories aren't duplicated for showing in sidebar
function removeDuplicates(data: BlogPost) {
  let tagsArrayPosts: any[] = []
  let catsArrayPosts: any[] = []

  data?.posts?.forEach((post: BlogPost) => {
    for (let i = 0; i < post.tags.length; i++) {
      tagsArrayPosts.push(post.tags[i])
    }

    for (let i = 0; i < post.categories.length; i++) {
      catsArrayPosts.push(post.categories[i])
    }
  })

  tagsArrayPosts = tagsArrayPosts.filter(
    (tag: any, index: number) => tagsArrayPosts.indexOf(tag) === index
  )
  catsArrayPosts = catsArrayPosts.filter(
    (cat: any, index: number) => catsArrayPosts.indexOf(cat) === index
  )

  return { t: tagsArrayPosts, c: catsArrayPosts }
}

export default PostsByDate
