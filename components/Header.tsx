import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { connectSearchBox } from 'react-instantsearch-dom'
import logo from '../public/img/logo.svg'

export default function Navbar(props) {
  const SearchBox = ({ currentRefinement, refine }) => (
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
            type="search"
            value={currentRefinement}
            onChange={(event) => refine(event.currentTarget.value)}
            className="pl-10 pr-1 py-1 h-10 border border-solid border-green-600 rounded-lg text-lg text-gray-700 shadow-none focus:ring-green-600 focus:border-green-600 font-normal flex-1 placeholder-gray-300"
            placeholder="Search..."
          />
        </div>
      </div>
    </div>
  )

  const CustomSearchBox = connectSearchBox(SearchBox)

  return (
    <>
      <nav className="bg-white">
        <div className="container flex flex-auto items-center justify-between font-sans">
          <div className="flex justify-between h-16">
            <div className="flex mx-2 px-2 lg:px-0">
              <div className="flex-shrink-0 flex items-center">
                <Link href="/" passHref>
                  <a href="dummy" className="text-green-600 border-b-0 flex">
                    <Image
                      className="block lg:hidden h-8 w-auto"
                      src={logo}
                      alt="Front Matter"
                      height={32}
                      width={32}
                    />
                    <span className="text-lg font-semibold pl-1 pt-1">
                      Front Matter
                    </span>
                  </a>
                </Link>
              </div>
              <div className="hidden lg:ml-6 lg:flex lg:space-x-8">
                <Link href="/posts" passHref>
                  <a
                    href="dummy"
                    className="text-gray-500 border-b-0 hover:text-gray-400 inline-flex items-center px-1 pt-1 text-sm font-medium"
                  >
                    Posts
                  </a>
                </Link>
              </div>
            </div>
            {props.searchBox && <CustomSearchBox />}
          </div>
        </div>
      </nav>
    </>
  )
}
