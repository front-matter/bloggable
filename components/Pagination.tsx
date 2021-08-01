import React from 'react'
import Link from 'next/link'

export default function Pagination({
  currentRefinement = null,
  nbPages = 1,
  showFirst = false
}) {
  if (nbPages === 1) return null

  return (
    <nav
      className="bg-white mx-0 py-8 mt-4 flex items-center justify-between"
      aria-label="Pagination"
    >
      <div className="hidden sm:block">
        <p className="text-sm text-gray-700">
          Showing <span className="font-medium">1</span> of{' '}
          <span className="font-medium">{nbPages}</span> pages
        </p>
      </div>
      <div className="flex-1 flex justify-between sm:justify-end">
        {showFirst && (
          <Link href="#">
            <a
              href="/dummy"
              className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              Previous
            </a>
          </Link>
        )}
        <Link href="#">
          <a
            href="/dummy"
            className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            Next
          </a>
        </Link>
      </div>
    </nav>
  )
}
