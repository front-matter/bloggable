import React from 'react'
import { parseISO } from 'date-fns'
import Link from 'next/link'
import Byline from './Byline'
import Pagination from './Pagination'
import { sanitizeDescription } from '../lib/helpers'

export default function Tag({ posts }) {
  if (!posts) {
    return null
  }

  return (
    <>
      <div className="relative bg-gray-50 pt-16 pb-16 px-4 sm:px-6 lg:pt-16 lg:pb-16 lg:px-8">
        <div className="container mx-auto flex flex-auto items-center justify-between">
          <div className="absolute inset-0">
            <div className="bg-white h-1/3 sm:h-2/3"></div>
          </div>
          <div className="relative max-w-7xl mx-auto">
            <div className="mt-4 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none">
              {posts.slice(0, 3).map((post) => (
                <div
                  className="flex flex-col rounded-lg shadow-lg overflow-hidden"
                  key={post.id}
                >
                  <div className="flex-shrink-0 bg-white pt-6 px-6">
                    <img
                      className="h-48 w-full object-contain"
                      src={
                        post.feature_image
                          ? post.feature_image
                          : `https://assets.front-matter.io/ghost/news${
                              Math.floor(Math.random() * 3) + 1
                            }.jpg`
                      }
                      alt=""
                    />
                  </div>
                  <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                    <div className="flex-1">
                      <a
                        href={'/mfenner/' + post.slug}
                        className="block mt-2 border-b-0"
                      >
                        <p className="text-xl font-semibold font-sans text-gray-900">
                          {post.title}
                        </p>
                        <p className="mt-3 text-base text-gray-500">
                          {sanitizeDescription(post.html)}
                        </p>
                      </a>
                    </div>
                    <div className="mt-0 flex items-center">
                      <Byline
                        authors={post.authors}
                        published={parseISO(post.published_at)}
                        readingTime={post.reading_time}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-12 max-w-lg mx-auto grid gap-5 grid-cols-1 lg:max-w-none">
              {posts.slice(3, 4).map((post) => (
                <div
                  className="grid gap-5 lg:grid-cols-2 rounded-lg shadow-lg overflow-hidden"
                  key={post.id}
                >
                  <div className="flex-shrink-0 bg-white py-6 px-6">
                    <img
                      className="h-96 w-full object-contain object-left"
                      src={
                        post.feature_image
                          ? post.feature_image
                          : `https://assets.front-matter.io/ghost/news${
                              Math.floor(Math.random() * 3) + 1
                            }.jpg`
                      }
                      alt=""
                    />
                  </div>
                  <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                    <div className="flex-1">
                      <a
                        href={'/mfenner/' + post.slug}
                        className="block mt-2 border-b-0"
                      >
                        <p className="text-xl font-semibold font-sans text-gray-900">
                          {post.title}
                        </p>
                        <p className="mt-3 text-base text-gray-500">
                          {sanitizeDescription(post.html)}
                        </p>
                      </a>
                    </div>
                    <div className="mt-0 flex items-center">
                      <Byline
                        authors={post.authors}
                        published={parseISO(post.published_at)}
                        readingTime={post.reading_time}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none">
              {posts.slice(4, 7).map((post) => (
                <div
                  className="flex flex-col rounded-lg shadow-lg overflow-hidden"
                  key={post.id}
                >
                  <div className="flex-shrink-0 bg-white pt-6 px-6">
                    <img
                      className="h-48 w-full object-contain"
                      src={
                        post.feature_image
                          ? post.feature_image
                          : `https://assets.front-matter.io/ghost/news${
                              Math.floor(Math.random() * 3) + 1
                            }.jpg`
                      }
                      alt=""
                    />
                  </div>
                  <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                    <div className="flex-1">
                      <a
                        href={'/mfenner/' + post.slug}
                        className="block mt-2 border-b-0"
                      >
                        <p className="text-xl font-semibold font-sans text-gray-900">
                          {post.title}
                        </p>
                        <p className="mt-3 text-base text-gray-500">
                          {sanitizeDescription(post.html)}
                        </p>
                      </a>
                    </div>
                    <div className="mt-0 flex items-center">
                      <Byline
                        authors={post.authors}
                        published={parseISO(post.published_at)}
                        readingTime={post.reading_time}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-2 lg:max-w-none">
              {posts.slice(7, 9).map((post) => (
                <div
                  className="flex flex-col rounded-lg shadow-lg overflow-hidden"
                  key={post.id}
                >
                  <div className="flex-shrink-0 bg-white pt-6 px-6">
                    <img
                      className="h-48 w-full object-contain"
                      src={
                        post.feature_image
                          ? post.feature_image
                          : `https://assets.front-matter.io/ghost/news${
                              Math.floor(Math.random() * 3) + 1
                            }.jpg`
                      }
                      alt=""
                    />
                  </div>
                  <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                    <div className="flex-1">
                      <a
                        href={'/mfenner/' + post.slug}
                        className="block mt-2 border-b-0"
                      >
                        <p className="text-xl font-semibold font-sans text-gray-900">
                          {post.title}
                        </p>
                        <p className="mt-3 text-base text-gray-500">
                          {sanitizeDescription(post.html)}
                        </p>
                      </a>
                    </div>
                    <div className="mt-0 flex items-center">
                      <Byline
                        authors={post.authors}
                        published={parseISO(post.published_at)}
                        readingTime={post.reading_time}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-12 max-w-lg mx-auto grid gap-5 grid-cols-1 lg:max-w-none">
              {posts.slice(9, 10).map((post) => (
                <div
                  className="grid gap-5 lg:grid-cols-2 rounded-lg shadow-lg overflow-hidden"
                  key={post.id}
                >
                  <div className="flex-shrink-0 bg-white py-6 px-6">
                    <img
                      className="h-96 w-full object-contain object-left"
                      src={
                        post.feature_image
                          ? post.feature_image
                          : `https://assets.front-matter.io/ghost/news${
                              Math.floor(Math.random() * 3) + 1
                            }.jpg`
                      }
                      alt=""
                    />
                  </div>
                  <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                    <div className="flex-1">
                      <a
                        href={'/mfenner/' + post.slug}
                        className="block mt-2 border-b-0"
                      >
                        <p className="text-xl font-semibold font-sans text-gray-900">
                          {post.title}
                        </p>
                        <p className="mt-3 text-base text-gray-500">
                          {sanitizeDescription(post.html)}
                        </p>
                      </a>
                    </div>
                    <div className="mt-0 flex items-center">
                      <Byline
                        authors={post.authors}
                        published={parseISO(post.published_at)}
                        readingTime={post.reading_time}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
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
                        post.feature_image
                          ? post.feature_image
                          : `https://assets.front-matter.io/ghost/news${
                              Math.floor(Math.random() * 3) + 1
                            }.jpg`
                      }
                      alt=""
                    />
                  </div>
                  <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                    <div className="flex-1">
                      <a
                        href={'/mfenner/' + post.slug}
                        className="block mt-2 border-b-0"
                      >
                        <p className="text-xl font-semibold font-sans text-gray-900">
                          {post.title}
                        </p>
                        <p className="mt-3 text-base text-gray-500">
                          {sanitizeDescription(post.html)}
                        </p>
                      </a>
                    </div>
                    <div className="mt-0 flex items-center">
                      <Byline
                        authors={post.authors}
                        published={parseISO(post.published_at)}
                        readingTime={post.reading_time}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-2 lg:max-w-none">
              {posts.slice(13, 15).map((post) => (
                <div
                  className="flex flex-col rounded-lg shadow-lg overflow-hidden"
                  key={post.id}
                >
                  <div className="flex-shrink-0 bg-white pt-6 px-6">
                    <img
                      className="h-48 w-full object-contain"
                      src={
                        post.feature_image
                          ? post.feature_image
                          : `https://assets.front-matter.io/ghost/news${
                              Math.floor(Math.random() * 3) + 1
                            }.jpg`
                      }
                      alt=""
                    />
                  </div>
                  <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                    <div className="flex-1">
                      <a
                        href={'/mfenner/' + post.slug}
                        className="block mt-2 border-b-0"
                      >
                        <p className="text-xl font-semibold font-sans text-gray-900">
                          {post.title}
                        </p>
                        <p className="mt-3 text-base text-gray-500">
                          {sanitizeDescription(post.html)}
                        </p>
                      </a>
                    </div>
                    <div className="mt-0 flex items-center">
                      <Byline
                        authors={post.authors}
                        published={parseISO(post.published_at)}
                        readingTime={post.reading_time}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Pagination />
          </div>
        </div>
      </div>
    </>
  )
}
