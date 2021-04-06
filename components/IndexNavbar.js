import React from 'react'
import Link from 'next/link'
import { connectSearchBox } from 'react-instantsearch-dom'

export default function Navbar(props) {
  const [navbarOpen, setNavbarOpen] = React.useState(false)

  const SearchBox = ({ currentRefinement, refine }) => (
    <div className="relative flex flex-wrap lg:ml-auto text-base">
      <i className="fas fa-search absolute ml-3 mt-3 text-gray-700"></i>
      <input
        type="search"
        value={currentRefinement}
        onChange={(event) => refine(event.currentTarget.value)}
        className="pl-10 pr-1 py-1 h-10 border border-solid border-gray-600 rounded-lg text-lg text-gray-700 shadow-none outline-none focus:outline-none font-normal flex-1 placeholder-gray-300"
        placeholder="Search..."
      />
    </div>
  )

  const CustomSearchBox = connectSearchBox(SearchBox)

  return (
    <>
      <nav className="container mx-auto flex flex-auto items-center justify-between font-sans">
        <div className="pr-4 justify-between lg:w-auto lg:static lg:block lg:justify-start">
          <Link href="/">
            <a
              className="text-gray-800 text-xl font-bold leading-relaxed inline-block mx-4 py-2 border-b-0 whitespace-no-wrap uppercase"
              href="/"
              data-cy="navbarLink"
            >
              Front Matter
            </a>
          </Link>
        </div>
        <div className="w-full md:w-4/12 mx-3">
          {props.searchBox && <CustomSearchBox />}
        </div>
        <div
          className={
            'lg:flex flex-grow items-center bg-white lg:bg-transparent lg:shadow-none' +
            (navbarOpen ? ' block' : ' hidden')
          }
          id="example-navbar-warning"
        >
          <ul className="flex flex-col lg:flex-row list-none lg:ml-auto mt-4">
            <li className="flex items-center">
              <a
                className="hover:text-gray-600 text-gray-800 px-3 py-8 lg:py-2 flex items-center text-xs uppercase font-bold border-b-0"
                href="https://twitter.com/sens_science"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="text-gray-500 fab fa-twitter text-lg leading-lg " />
                <span className="lg:hidden inline-block ml-2">Tweet</span>
              </a>
            </li>

            <li className="flex items-center">
              <a
                className="hover:text-gray-600 text-gray-800 px-3 py-8 lg:py-2 flex items-center text-xs uppercase font-bold border-b-0"
                href="https://front-matter.io/feed.xml"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="text-gray-500 fas fa-rss text-lg leading-lg " />
                <span className="lg:hidden inline-block ml-2">Feed</span>
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </>
  )
}
