import React from 'react'
import Link from 'next/link'
// components

import IndexDropdown from 'components/Dropdowns/IndexDropdown.js'

export default function Navbar(props) {
  const [navbarOpen, setNavbarOpen] = React.useState(false)
  return (
    <>
      <nav className="top-0 fixed z-50 w-full flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg bg-white shadow">
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
                className="text-gray-800 text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-no-wrap uppercase"
                href="/"
                data-cy="navbarLink"
              >
                Gobbledygook
              </a>
            </Link>
            <button
              className="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <i className="fas fa-bars"></i>
            </button>
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
                  className="hover:text-gray-600 text-gray-800 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                  href="https://twitter.com/mfenner"
                  target="_blank"
                >
                  <i className="text-gray-500 fab fa-twitter text-lg leading-lg " />
                  <span className="lg:hidden inline-block ml-2">Tweet</span>
                </a>
              </li>

              <li className="flex items-center">
                <a
                  className="hover:text-gray-600 text-gray-800 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                  href="https://feedly.com/i/subscription/feed/https://blog.martinfenner.org/rss/"
                  target="_blank"
                >
                  <i className="text-gray-500 fas fa-rss text-lg leading-lg " />
                  <span className="lg:hidden inline-block ml-2">Feed</span>
                </a>
              </li>

              <li className="flex items-center">
                <a
                  className="inline-block text-white bg-gray-800 active:bg-gray-700 text-xs font-bold uppercase px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none lg:mr-1 lg:mb-0 ml-3 mb-3 ease-linear transition-all duration-150"
                  href="https://www.creative-tim.com/product/notus-nextjs?ref=nnjs-index"
                  target="_blank"
                >
                  <i class="fas fa-arrow-alt-circle-down"></i> Download
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}
