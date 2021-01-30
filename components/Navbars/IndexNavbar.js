import React from 'react'
import Link from 'next/link'

export default function Navbar(props) {
  const [navbarOpen, setNavbarOpen] = React.useState(false)
  return (
    <>
      <nav className="top-0 fixed z-50 w-full flex flex-wrap items-center justify-between px-2 navbar-expand-lg bg-white shadow">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <Link
              href="/"
              as={
                (process.env.NODE_ENV === 'production' ? '/notus-nextjs' : '') +
                '/'
              }
            >
              <a
                className="text-gray-800 text-xl font-bold leading-relaxed inline-block mr-4 py-2 border-b-0 whitespace-no-wrap uppercase"
                href="/"
                data-cy="navbarLink"
              >
                Gobbledygook
              </a>
            </Link>
          </div>
          <div
            className={
              'lg:flex flex-grow items-center bg-white lg:bg-transparent lg:shadow-none' +
              (navbarOpen ? ' block' : ' hidden')
            }
            id="example-navbar-warning"
          >
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
              <li className="flex items-center">
                <a
                  className="hover:text-gray-600 text-gray-800 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold border-b-0"
                  href="https://twitter.com/mfenner"
                  target="_blank"
                >
                  <i className="text-gray-500 fab fa-twitter text-lg leading-lg " />
                  <span className="lg:hidden inline-block ml-2">Tweet</span>
                </a>
              </li>

              <li className="flex items-center">
                <a
                  className="hover:text-gray-600 text-gray-800 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold border-b-0"
                  href="https://feedly.com/i/subscription/feed/https://martinfenner.ghost.io/rss/"
                  target="_blank"
                >
                  <i className="text-gray-500 fas fa-rss text-lg leading-lg " />
                  <span className="lg:hidden inline-block ml-2">Feed</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}
