import React from 'react'
// import Link from 'next/link'
import { fromUnixTime } from 'date-fns'
import useSWR from 'swr'
import fetch from 'unfetch'
import Byline from './Byline'
import { useQueryState } from 'next-usequerystate'

const fetcher = (url) => fetch(url).then((r) => r.json())

export default function Tag({ tag }) {
  const [queryString] = useQueryState('query')
  const [pageIndex, setPageIndex] = useQueryState('page')

  // The API URL includes pageIndex, which is a React state.
  const filter = tag.slug ? '&filter_by=tags:' + tag.slug : ''
  const query = queryString ? 'q=' + queryString + '&query_by=tags,title,content,authors&sort_by=_text_match:desc,published:desc' : 'q=*&sort_by=published:desc'
  const page = pageIndex ? '&page=' + pageIndex : ''
  const typesenseQuery = `https://${process.env.NEXT_PUBLIC_TYPESENSE_HOST_0}/collections/${process.env.NEXT_PUBLIC_TYPESENSE_COLLECTION}/documents/search/?${query}${filter}&per_page=15${page}&x-typesense-api-key=${process.env.NEXT_PUBLIC_TYPESENSE_API_KEY}`
  const { data } = useSWR(typesenseQuery, fetcher)

  // ... handle loading and error states
  if (!data) {
    return null
  }

  // duplication from lib/posts
  const pages = Math.ceil(data.found / 15)
  const posts = data.hits.map((hit) => hit.document)
  const pagination = {
    page: data.page,
    pages: pages,
    total: data.found,
    prev: data.page > 1 ? data.page - 1 : null,
    next: data.page < pages ? data.page + 1 : null
  }

  return (
    <>
      <div className="relative bg-gray-50 py-0 md:py-4 px-4 lg:px-8">
        <div className="container mx-auto flex flex-auto items-center justify-between">
          <div className="relative max-w-7xl mx-auto">
            <div className="mt-6 max-w-lg mx-auto grid gap-5 grid-cols-1 lg:max-w-none">
              {posts.slice(0, 1).map((post) => (
                <div
                  className="grid gap-5 lg:grid-cols-2 bg-white rounded-lg shadow-lg overflow-hidden"
                  key={post.id}
                >
                  <div className="flex-shrink-0 py-6 px-6">
                    <img
                      className="h-48 md:h-96 w-full object-contain lg:object-left"
                      src={
                        post.featureImage
                          ? post.featureImage
                          : `https://assets.front-matter.io/1/news${
                              Math.floor(Math.random() * 5) + 1
                            }.jpg`
                      }
                      alt=""
                    />
                  </div>
                  <div className="flex-1 p-6 flex flex-col justify-between">
                    <div className="flex-1">
                      <a
                        href={'/posts/' + post.slug}
                        className="block mt-2 border-b-0"
                      >
                        <p className="text-xl font-semibold font-sans text-gray-900">
                          {post.title}
                        </p>
                        <p className="mt-3 text-base text-gray-500">
                          {post.description}
                        </p>
                      </a>
                    </div>
                    <div className="mt-0 flex items-center">
                      <Byline
                        authors={post.authors !== undefined ? post.authors.map((author, idx) => ({
                          name: author,
                          slug: post.author_ids[idx],
                          website: null,
                          profile_image: null
                        })) : []}
                        published={fromUnixTime(post.published)}
                        doi={post.doi}
                        readingTime={post.readingTime}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {posts.length > 1 && (
              <div className="mt-4 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none">
                {posts.slice(1, 4).map((post) => (
                  <div
                    className="flex flex-col rounded-lg shadow-lg overflow-hidden"
                    key={post.id}
                  >
                    <div className="flex-shrink-0 bg-white pt-6 px-6">
                      <img
                        className="h-48 w-full object-contain"
                        src={
                          post.featureImage
                            ? post.featureImage
                            : `https://assets.front-matter.io/1/news${
                                Math.floor(Math.random() * 5) + 1
                              }.jpg`
                        }
                        alt=""
                      />
                    </div>
                    <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                      <div className="flex-1">
                        <a
                          href={'/posts/' + post.slug}
                          className="block mt-2 border-b-0"
                        >
                          <p className="text-xl font-semibold font-sans text-gray-900">
                            {post.title}
                          </p>
                          <p className="mt-3 text-base text-gray-500">
                            {post.description}
                          </p>
                        </a>
                      </div>
                      <div className="mt-0 flex items-center">
                        <Byline
                          authors={post.authors !== undefined ? post.authors.map((author, idx) => ({
                            name: author,
                            slug: post.author_ids[idx],
                            website: null,
                            profile_image: null
                          })) : []}
                          published={fromUnixTime(post.published)}
                          doi={post.doi}
                          readingTime={post.readingTime}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {posts.length > 4 && (
              <div className="mt-4 max-w-lg mx-auto grid gap-5 bg-white lg:grid-cols-2 lg:max-w-none">
                {posts.slice(4, 6).map((post) => (
                  <div
                    className="flex flex-col rounded-lg shadow-lg overflow-hidden"
                    key={post.id}
                  >
                    <div className="flex-shrink-0 pt-6 px-6">
                      <img
                        className="h-48 w-full object-contain"
                        src={
                          post.featureImage
                            ? post.featureImage
                            : `https://assets.front-matter.io/1/news${
                                Math.floor(Math.random() * 5) + 1
                              }.jpg`
                        }
                        alt=""
                      />
                    </div>
                    <div className="flex-1 p-6 flex flex-col justify-between">
                      <div className="flex-1">
                        <a
                          href={'/posts/' + post.slug}
                          className="block mt-2 border-b-0"
                        >
                          <p className="text-xl font-semibold font-sans text-gray-900">
                            {post.title}
                          </p>
                          <p className="mt-3 text-base text-gray-500">
                            {post.description}
                          </p>
                        </a>
                      </div>
                      <div className="mt-0 flex items-center">
                        <Byline
                          authors={post.authors !== undefined ? post.authors.map((author, idx) => ({
                            name: author,
                            slug: post.author_ids[idx],
                            website: null,
                            profile_image: null
                          })) : []}
                          published={fromUnixTime(post.published)}
                          doi={post.doi}
                          readingTime={post.readingTime}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {posts.length > 6 && (
              <div className="mt-12 max-w-lg mx-auto grid gap-5 grid-cols-1 lg:max-w-none">
                {posts.slice(6, 7).map((post) => (
                  <div
                    className="grid gap-5 lg:grid-cols-2 bg-white rounded-lg shadow-lg overflow-hidden"
                    key={post.id}
                  >
                    <div className="flex-shrink-0 py-6 px-6">
                      <img
                        className="h-48 md:h-96 w-full object-contain lg:object-left"
                        src={
                          post.featureImage
                            ? post.featureImage
                            : `https://assets.front-matter.io/1/news${
                                Math.floor(Math.random() * 5) + 1
                              }.jpg`
                        }
                        alt=""
                      />
                    </div>
                    <div className="flex-1 p-6 flex flex-col justify-between">
                      <div className="flex-1">
                        <a
                          href={'/posts/' + post.slug}
                          className="block mt-2 border-b-0"
                        >
                          <p className="text-xl font-semibold font-sans text-gray-900">
                            {post.title}
                          </p>
                          <p className="mt-3 text-base text-gray-500">
                            {post.description}
                          </p>
                        </a>
                      </div>
                      <div className="mt-0 flex items-center">
                        <Byline
                          authors={post.authors !== undefined ? post.authors.map((author, idx) => ({
                            name: author,
                            slug: post.author_ids[idx],
                            website: null,
                            profile_image: null
                          })) : []}
                          published={fromUnixTime(post.published)}
                          doi={post.doi}
                          readingTime={post.readingTime}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {posts.length > 7 && (
              <div className="mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none">
                {posts.slice(7, 10).map((post) => (
                  <div
                    className="flex flex-col rounded-lg shadow-lg overflow-hidden"
                    key={post.id}
                  >
                    <div className="flex-shrink-0 bg-white pt-6 px-6">
                      <img
                        className="h-48 w-full object-contain"
                        src={
                          post.featureImage
                            ? post.featureImage
                            : `https://assets.front-matter.io/1/news${
                                Math.floor(Math.random() * 5) + 1
                              }.jpg`
                        }
                        alt=""
                      />
                    </div>
                    <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                      <div className="flex-1">
                        <a
                          href={'/posts/' + post.slug}
                          className="block mt-2 border-b-0"
                        >
                          <p className="text-xl font-semibold font-sans text-gray-900">
                            {post.title}
                          </p>
                          <p className="mt-3 text-base text-gray-500">
                            {post.description}
                          </p>
                        </a>
                      </div>
                      <div className="mt-0 flex items-center">
                        <Byline
                          authors={post.authors !== undefined ? post.authors.map((author, idx) => ({
                            name: author,
                            slug: post.author_ids[idx],
                            website: null,
                            profile_image: null
                          })) : []}
                          published={fromUnixTime(post.published)}
                          doi={post.doi}
                          readingTime={post.readingTime}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {posts.length > 10 && (
              <div className="mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none">
                {posts.slice(10, 13).map((post) => (
                  <div
                    className="flex flex-col rounded-lg shadow-lg overflow-hidden"
                    key={post.id}
                  >
                    <div className="flex-shrink-0 bg-white pt-2 px-6">
                      <img
                        className="h-48 w-full object-contain"
                        src={
                          post.featureImage
                            ? post.featureImage
                            : `https://assets.front-matter.io/1/news${
                                Math.floor(Math.random() * 5) + 1
                              }.jpg`
                        }
                        alt=""
                      />
                    </div>
                    <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                      <div className="flex-1">
                        <a
                          href={'/posts/' + post.slug}
                          className="block mt-2 border-b-0"
                        >
                          <p className="text-xl font-semibold font-sans text-gray-900">
                            {post.title}
                          </p>
                          <p className="mt-3 text-base text-gray-500">
                            {post.description}
                          </p>
                        </a>
                      </div>
                      <div className="mt-0 flex items-center">
                        <Byline
                          authors={post.authors !== undefined ? post.authors.map((author, idx) => ({
                            name: author,
                            slug: post.author_ids[idx],
                            website: null,
                            profile_image: null
                          })) : []}
                          published={fromUnixTime(post.published)}
                          doi={post.doi}
                          readingTime={post.readingTime}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {posts.length > 13 && (
              <div className="mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-2 lg:max-w-none">
                {posts.slice(13, 16).map((post) => (
                  <div
                    className="flex flex-col rounded-lg shadow-lg overflow-hidden"
                    key={post.id}
                  >
                    <div className="flex-shrink-0 bg-white pt-6 px-6">
                      <img
                        className="h-48 w-full object-contain shadow-lg rounded-lg"
                        src={
                          post.featureImage
                            ? post.featureImage
                            : `https://assets.front-matter.io/1/news${
                                Math.floor(Math.random() * 5) + 1
                              }.jpg`
                        }
                        alt=""
                      />
                    </div>
                    <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                      <div className="flex-1">
                        <a
                          href={'/posts/' + post.slug}
                          className="block mt-2 border-b-0"
                        >
                          <p className="text-xl font-semibold font-sans text-gray-900">
                            {post.title}
                          </p>
                          <p className="mt-3 text-base text-gray-500">
                            {post.description}
                          </p>
                        </a>
                      </div>
                      <div className="mt-0 flex items-center">
                        <Byline
                          authors={post.authors !== undefined ? post.authors.map((author, idx) => ({
                            name: author,
                            slug: post.author_ids[idx],
                            website: null,
                            profile_image: null
                          })) : []}
                          published={fromUnixTime(post.published)}
                          doi={post.doi}
                          readingTime={post.readingTime}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <nav
              className="mx-0 px-6 py-4 mb-20 flex items-center justify-between"
              aria-label="Pagination"
            >
              <div className="hidden sm:block">
                <p className="text-sm text-gray-700">
                  Showing{' '}
                  <span className="font-medium">page {pagination.page}</span>{' '}
                  out of <span className="font-medium">{pagination.pages}</span>{' '}
                  total pages for {pagination.total} posts.
                </p>
              </div>
              <div className="flex-1 flex justify-between sm:justify-end space-x-1">
                {pagination.prev && (
                  <button onClick={() => setPageIndex(pagination.prev.toString())}>
                    <a className="relative inline-flex items-center h-8 px-4 py-1 border border-gray-300 text-sm font-medium rounded-md text-gray-700 hover:text-green-600 hover:border-green-600 active:text-green-600 active:border-green-600">
                      Previous
                    </a>
                  </button>
                )}
                {pagination.next && (
                  <button onClick={() => setPageIndex(pagination.next.toString())}>
                    <a className="relative inline-flex items-center h-8 px-4 py-1 border border-gray-300 text-sm font-medium rounded-md text-gray-700 hover:text-green-600 hover:border-green-600 active:text-green-600 active:border-green-600">
                      Next
                    </a>
                  </button>
                )}
              </div>
            </nav>
          </div>
        </div>
      </div>
    </>
  )
}
