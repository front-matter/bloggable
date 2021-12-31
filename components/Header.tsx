import React from 'react'
import { Disclosure } from '@headlessui/react'
import { SearchIcon } from '@heroicons/react/solid'
import { MenuIcon, XIcon } from '@heroicons/react/outline'
import Link from 'next/link'
import Image from 'next/image'
import logo from '../public/img/logo.svg'
import { useQueryState } from 'next-usequerystate'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const Header = ({ tags, tag }) => {
  const [query, setQuery] = useQueryState('query')

  const onSubmit = (event) => {
    setQuery(event.currentTarget.value)
  }

  const onKeyDown = (event) => {
    if (event.key === 'Enter') {
      onSubmit(event.currentTarget.value)
    }
  }

  const onSearchChange = (event: React.FormEvent<HTMLInputElement>): void => {
    setQuery(event.currentTarget.value)
  }

  // const onSearchClear = () => {
  //   setQuery('')
  // }

  return (
    <Disclosure as="header" className="bg-white shadow">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:divide-y lg:divide-gray-200 lg:px-8">
            <div className="relative h-16 flex justify-between">
              <div className="relative z-10 px-2 flex lg:px-0">
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
                      <span className="text-lg font-semibold font-sans pl-1 pt-1">
                        Front Matter Blog
                      </span>
                    </a>
                  </Link>
                </div>
              </div>
              <div className="relative z-0 flex-1 px-2 flex items-center justify-center sm:absolute sm:inset-0">
                {tag && tag.name &&  
                  (<div className="w-full sm:max-w-xs">
                    <label htmlFor="search" className="sr-only">
                      Search
                    </label>
                    <div className="relative">
                      <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                        <SearchIcon
                          className="h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                      </div>
                      <input
                        id="search"
                        name="search"
                        className="block w-full bg-white border border-gray-300 rounded-md py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:outline-none focus:text-gray-900 focus:placeholder-gray-400 focus:ring-1 focus:ring-green-600 focus:border-green-600 sm:text-sm font-sans"
                        placeholder="Search..."
                        type="search"
                        value={query}
                        onChange={onSearchChange}
                        onSubmit={onSubmit}
                        onKeyDown={onKeyDown}
                      />
                    </div>
                  </div>
                )}
              </div>
              <div className="relative z-10 flex items-center lg:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                  <span className="sr-only">Open menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
            {tags && tags.length > 0 && tag.name && (
              <nav
                className="hidden py-2 space-x-6 lg:block"
                aria-label="Global"
              >
                {tags.map((item) => (
                  <a
                    key={item.name}
                    href={'?tag=' + item.slug}
                    className={classNames(
                      item.slug == tag.slug
                        ? 'text-gray-600 font-semibold'
                        : 'text-green-600 border-b-0 hover:border-b hover:border-green-600',
                      'text-base font-medium border-b-0'
                    )}
                    aria-current={item.current ? 'page' : undefined}
                  >
                    {item.name}
                  </a>
                ))}
              </nav>
            )}
          </div>

          <Disclosure.Panel as="nav" className="lg:hidden" aria-label="Global">
            {tags && tags.length > 0 && (
              <div className="pt-2 pb-3 px-2 space-y-1">
                {tags.map((item) => (
                  <a
                    key={item.name}
                    href={'?tag=' + item.slug}
                    className={classNames(
                      item.slug == tag.slug
                        ? 'text-gray-600 font-semibold'
                        : 'text-green-600 hover:text-green-500',
                      'block py-2 px-3 text-base font-medium border-b-0'
                    )}
                    aria-current={item.current ? 'page' : undefined}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            )}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}

export default Header
