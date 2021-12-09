import React from 'react'
import Link from 'next/link'

export default function Support() {
  return (
    <>
      <div className="bg-white">
        <div className="container max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 font-sans min-h-screen">
          <div className="sm:flex sm:flex-col sm:align-center">
            <h1 className="text-5xl font-extrabold text-green-600">
              Support Front Matter
            </h1>
            <div className="mt-5 text-xl text-gray-500">
              <p>
                Support of the Front Matter Blog by a one-time donation or
                regular membership via <strong>Buy me a Coffee</strong> has been
                discontinued on December 9, 2021. Instead, you can sign up for
                free Front Matter membership via a signup form on the{' '}
                <Link href="/" passHref>
                  <a
                    href="dummy"
                    className="text-gray-500 border-b-0 hover:border-b hover:border-green-600"
                  >
                    blog homepage
                  </a>
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
