import React from 'react'
import Link from 'next/link'

export default function Discord() {
  return (
    <>
      <div className="bg-white">
        <div className="container max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 font-sans min-h-screen">
          <div className="sm:flex sm:flex-col sm:align-center">
            <h1 className="text-5xl font-extrabold text-green-600">
              Front Matter Discord Server
            </h1>
            <div className="mt-5 text-xl text-gray-500">
              <p>
                <Link href="https://discord.gg/9wnkmWwDWx" passHref>
                  <a
                    href="dummy"
                    className="text-gray-500 border-b-0 hover:border-b hover:border-green-600"
                  >
                    Join the Discord server{''}
                  </a>
                </Link>
                for comments and other feedback related to the Front Matter Blog,
                or to contact Front Matter staff.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
