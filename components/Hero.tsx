import React from 'react'
import Link from 'next/link'

export default function Hero() {
  return (
    <>
      <div className="relative">
        <div className="shadow-xl sm:rounded-2xl sm:overflow-hidden">
          <div
            className="absolute bg-cover inset-0"
            style={{ backgroundImage: 'url(/img/hero.jpg)' }}
          ></div>
          <div className="relative px-4 mt-48 pt-32 pb-16 sm:px-6 sm:py-24 lg:px-8 justify-center">
            <h1 className="text-center text-4xl font-extrabold tracking-tight">
              <span className="block text-gray-900">
                All Science needs a Front Matter
              </span>
            </h1>
            <p className="mt-1 max-w-sm mx-auto text-center text-2xl font-sans text-gray-900 sm:max-w-3xl">
              Launching soon.
            </p>
            <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
              <div className="rounded-md shadow">
                <Link href="/features">
                  <a className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 font-sans">
                    Learn More
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
