import React from 'react'

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
                Science Blogging Reimagined
              </span>
            </h1>
            <p className="mt-1 max-w-sm mx-auto text-center text-2xl font-sans text-gray-900 sm:max-w-3xl">
              A better way of communicating Science, launching soon.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
