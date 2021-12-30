import React from 'react'
import Link from 'next/link'
import { fromUnixTime } from 'date-fns'
import useSWR from 'swr'
import fetch from 'unfetch'
import Byline from './Byline'
// import { useQueryState } from 'next-usequerystate'
import { useAtom} from "jotai"
import { queryAtom } from '../lib/atoms'
import { pageAtom } from '../lib/atoms'

const fetcher = (url) => fetch(url).then((r) => r.json())

export default function Tag({ tag }) {
  // const [queryString] = useQueryState('query')
  // const [pageIndex] = useQueryState('page')

  const [queryString] = useAtom(queryAtom)
  const [pageIndex] = useAtom(pageAtom)

  console.log(queryString)
  console.log(pageIndex)

  // The API URL includes pageIndex, which is a React state.
  const filter = tag.slug ? '&filter_by=tags:' + tag.slug : ''
  const query = queryString ? queryString + '&query_by=tags,title,content' : '*'
  const page = pageIndex ? pageIndex : 1
  const typesenseQuery = `https://${process.env.NEXT_PUBLIC_TYPESENSE_HOST_0}/collections/${process.env.NEXT_PUBLIC_TYPESENSE_COLLECTION}/documents/search/?q=${query}${filter}&sort_by=published:desc&per_page=15&page=${page}&x-typesense-api-key=${process.env.NEXT_PUBLIC_TYPESENSE_API_KEY}`
  const { data } = useSWR(typesenseQuery, fetcher)
  console.log(typesenseQuery)

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
      <div className="relative bg-gray-50 pt-8 pb-8 px-4 sm:px-6 lg:pt-16 lg:pb-16 lg:px-8">
        <div className="container mx-auto flex flex-auto items-center justify-between">
          <div className="absolute inset-0">
            <div className="bg-white h-1/3 sm:h-2/3"></div>
          </div>
          <div className="relative max-w-7xl mx-auto">
            <div className="mt-12 max-w-lg mx-auto grid gap-5 grid-cols-1 lg:max-w-none">
              {posts.slice(0, 1).map((post) => (
                <div
                  className="grid gap-5 lg:grid-cols-2 rounded-lg shadow-lg overflow-hidden"
                  key={post.id}
                >
                  <div className="flex-shrink-0 bg-white py-6 px-6">
                    <img
                      className="h-96 w-full object-contain object-left"
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
                        doi={null}
                        readingTime={post.readingTime}
                        readabilityScore={post.readabilityScore}
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
                          doi={null}
                          readingTime={post.readingTime}
                          readabilityScore={post.readabilityScore}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {posts.length > 4 && (
              <div className="mt-4 max-w-lg mx-auto grid gap-5 lg:grid-cols-2 lg:max-w-none">
                {posts.slice(4, 6).map((post) => (
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
                          doi={null}
                          readingTime={post.readingTime}
                          readabilityScore={post.readabilityScore}
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
                    className="grid gap-5 lg:grid-cols-2 rounded-lg shadow-lg overflow-hidden"
                    key={post.id}
                  >
                    <div className="flex-shrink-0 bg-white py-6 px-6">
                      <img
                        className="h-96 w-full object-contain object-left"
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
                          doi={null}
                          readingTime={post.readingTime}
                          readabilityScore={post.readabilityScore}
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
                          doi={null}
                          readingTime={post.readingTime}
                          readabilityScore={post.readabilityScore}
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
                          doi={null}
                          readingTime={post.readingTime}
                          readabilityScore={post.readabilityScore}
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
                          doi={null}
                          readingTime={post.readingTime}
                          readabilityScore={post.readabilityScore}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <nav
              className="mx-0 px-6 py-4 flex items-center justify-between"
              aria-label="Pagination"
            >
              <div className="hidden sm:block">
                <p className="text-sm text-gray-700">
                  Showing{' '}
                  <span className="font-medium">page {pagination.page}</span>{' '}
                  out of <span className="font-medium">{pagination.pages}</span>{' '}
                  total pages
                </p>
              </div>
              <div className="flex-1 flex justify-between sm:justify-end">
                {pagination.prev && (
                  <Link href={"/?page=" + pagination.prev} passHref>
                    <a href="dummy" className="relative inline-flex items-center h-8 px-4 py-1 border border-gray-300 text-sm font-medium rounded-md text-gray-700 hover:text-green-600 hover:border-green-600 active:text-green-600 active:border-green-600">
                      Previous
                    </a>
                  </Link>
                )}
                {pagination.next && (
                  <Link href={"/?page=" + pagination.next}  passHref>
                    <a href="dummy" className="relative inline-flex items-center h-8 px-4 py-1 border border-gray-300 text-sm font-medium rounded-md text-gray-700 hover:text-green-600 hover:border-green-600 active:text-green-600 active:border-green-600">
                      Next
                    </a>
                  </Link>
                )}
              </div>
            </nav>
          </div>
        </div>
      </div>
    </>
  )
}
