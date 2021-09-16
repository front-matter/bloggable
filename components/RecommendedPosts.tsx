import React from 'react'
import { sanitizeDescription } from '../lib/helpers'
import { parseISO } from 'date-fns
import Byline from './Byline'

export default function RecommendedPosts({ posts }) {
  if (!posts) return null

  return (
    <>
      <div className="relative bg-gray-50 pt-16 pb-16 px-4 sm:px-6 lg:pt-16 lg:pb-16 lg:px-8">
        <div className="container mx-auto flex flex-auto items-center justify-between">
          <div className="absolute inset-0">
            <div className="bg-white h-1/3 sm:h-2/3"></div>
          </div>
          <div className="relative max-w-7xl mx-auto">
            <div className="text-center">
              <h2 className="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl">
                Recommended for You
              </h2>
            </div>
            <div className="mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none">
              {posts.map((post) => (
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
                      key={post.id}
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
          </div>
        </div>
      </div>
    </>
  )
}
