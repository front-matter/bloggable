import React from 'react'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { connectSearchBox } from 'react-instantsearch-dom'

export default function Navbar(props) {
  // const SearchBox = ({ currentRefinement, refine }) => (
  //   <div className="relative flex flex-wrap lg:ml-auto text-base">
  //     <i className="fas fa-search absolute ml-3 mt-3 text-gray-700"></i>
  //     <input
  //       type="search"
  //       value={currentRefinement}
  //       onChange={(event) => refine(event.currentTarget.value)}
  //       className="pl-10 pr-1 py-1 h-10 border border-solid border-gray-600 rounded-lg text-lg text-gray-700 shadow-none outline-none focus:outline-none font-normal flex-1 placeholder-gray-300"
  //       placeholder="Search..."
  //     />
  //   </div>
  // )

  // const CustomSearchBox = connectSearchBox(SearchBox)

  return (
    <>
      <nav className="bg-white shadow">
        <div className="container mx-auto flex flex-auto items-center justify-between font-sans">
          <div className="flex justify-between h-16">
            <div className="flex px-2 lg:px-0">
              <div className="flex-shrink-0 flex items-center">
                <Link href="/">
                  <a className="text-green-600 border-b-0 flex">
                    <img
                      className="block lg:hidden h-8 w-auto"
                      src="/img/logo.svg"
                      alt="Sensible Science"
                    />
                    <img
                      className="hidden lg:block h-8 w-auto"
                      src="/img/logo.svg"
                      alt="Sensible Science"
                    />
                    <span className="text-lg font-semibold pl-1 pt-1">
                      Sensible Science
                    </span>
                  </a>
                </Link>
              </div>
              <div className="hidden lg:ml-6 lg:flex lg:space-x-8">
                <Link href="/posts">
                  <a className="text-gray-500 border-b-0 hover:text-gray-400 inline-flex items-center px-1 pt-1 border-b-0 text-sm font-medium">
                    Posts
                  </a>
                </Link>
                <Link href="/features">
                  <a className="text-gray-500 border-b-0 hover:text-gray-400 inline-flex items-center px-1 pt-1 border-b-0 text-sm font-medium">
                    Features
                  </a>
                </Link>
              </div>
            </div>
            <div className="flex-1 flex items-center justify-center px-2 lg:ml-6">
              <div className="max-w-lg w-full lg:max-w-xs">
                <label htmlFor="search" className="sr-only">
                  Search
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FontAwesomeIcon icon={faSearch} />
                  </div>
                  <input
                    id="search"
                    name="search"
                    className="block w-full pl-10 pr-3 py-2 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-green-600 focus:border-green-600 sm:text-sm"
                    placeholder="Search"
                    type="search"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:hidden" id="mobile-menu">
          <div className="pt-2 pb-3 space-y-1">
            <Link href="/features">
              <a className="text-gray-500 border-b-0 hover:text-gray-400 inline-flex items-center px-1 pt-1 border-b-0 text-sm font-medium">
                Features
              </a>
            </Link>
          </div>
        </div>
      </nav>
    </>
  )
}
