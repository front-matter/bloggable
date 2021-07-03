import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'

export default function Pricing() {
  return (
    <>
      <div className="bg-white">
        <div className="container max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 font-sans">
          <div className="sm:flex sm:flex-col sm:align-center">
            <h1 className="text-5xl font-extrabold text-green-600 sm:text-center">
              Pricing Plans
            </h1>
            <p className="mt-5 text-xl text-gray-500 sm:text-center">
              Start building for free, then add a site plan to go live. Account
              plans unlock additional features.
            </p>
            <div className="relative self-center mt-6 bg-gray-100 rounded-lg p-0.5 flex sm:mt-8">
              <button
                type="button"
                className="relative w-1/2 bg-white border-gray-200 rounded-md shadow-sm py-2 text-sm font-medium text-gray-700 whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:z-10 sm:w-auto sm:px-8"
              >
                Monthly billing
              </button>
              <button
                type="button"
                className="ml-0.5 relative w-1/2 border border-transparent rounded-md py-2 text-sm font-medium text-gray-700 whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:z-10 sm:w-auto sm:px-8"
              >
                Yearly billing
              </button>
            </div>
          </div>
          <div className="mt-12 space-y-4 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:mx-0 xl:grid-cols-3">
            <div className="border border-gray-200 rounded-lg shadow-sm divide-y divide-gray-200">
              <div className="p-6">
                <h2 className="text-xl leading-6 font-large text-gray-900">
                  Individual
                </h2>
                <p className="mt-4 text-sm text-gray-500">
                  All the basics for starting a new business
                </p>
                <p className="mt-8">
                  <span className="text-4xl font-extrabold text-gray-900">
                    $12
                  </span>
                  <span className="text-base font-medium text-gray-500">
                    /mo
                  </span>
                </p>
                <a
                  href="/"
                  className="mt-8 block w-full bg-gray-800 border border-gray-800 rounded-md py-2 text-sm font-semibold text-white text-center hover:bg-gray-900"
                >
                  Sign up for Invidual
                </a>
              </div>
              <div className="pt-6 pb-8 px-6">
                <h3 className="text-xs font-medium text-gray-900 tracking-wide uppercase">
                  What&apos;s included
                </h3>
                <ul className="mt-6 space-y-4">
                  <li className="flex space-x-3 text-sm text-gray-500">
                    <FontAwesomeIcon icon={faCheck} />
                    <span className="text-sm text-gray-500">
                      25k views/month
                    </span>
                  </li>

                  <li className="flex space-x-3">
                    <FontAwesomeIcon icon={faCheck} />
                    <span className="text-sm text-gray-500">1 staff user</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg shadow-sm divide-y divide-gray-200">
              <div className="p-6">
                <h2 className="text-xl leading-6 font-medium text-gray-900">
                  Team
                </h2>
                <p className="mt-4 text-sm text-gray-500">
                  All the basics for starting a new business
                </p>
                <p className="mt-8">
                  <span className="text-4xl font-extrabold text-gray-900">
                    $24
                  </span>
                  <span className="text-base font-medium text-gray-500">
                    /mo
                  </span>
                </p>
                <a
                  href="/"
                  className="mt-8 block w-full bg-gray-800 border border-gray-800 rounded-md py-2 text-sm font-semibold text-white text-center hover:bg-gray-900"
                >
                  Sign up for Team
                </a>
              </div>
              <div className="pt-6 pb-8 px-6">
                <h3 className="text-xs font-medium text-gray-900 tracking-wide uppercase">
                  What&apos;s included
                </h3>
                <ul className="mt-6 space-y-4">
                  <li className="flex space-x-3">
                    <FontAwesomeIcon icon={faCheck} />
                    <span className="text-sm text-gray-500">
                      100k views/month
                    </span>
                  </li>

                  <li className="flex space-x-3">
                    <FontAwesomeIcon icon={faCheck} />
                    <span className="text-sm text-gray-500">5 staff users</span>
                  </li>

                  <li className="flex space-x-3">
                    <FontAwesomeIcon icon={faCheck} />
                    <span className="text-sm text-gray-500">
                      Donec mauris sit in eu tincidunt etiam.
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg shadow-sm divide-y divide-gray-200">
              <div className="p-6">
                <h2 className="text-xl leading-6 font-medium text-gray-900">
                  Organization
                </h2>
                <p className="mt-4 text-sm text-gray-500">
                  All the basics for starting a new business
                </p>
                <p className="mt-8">
                  <span className="text-4xl font-extrabold text-gray-900">
                    $32
                  </span>
                  <span className="text-base font-medium text-gray-500">
                    /mo
                  </span>
                </p>
                <a
                  href="/"
                  className="mt-8 block w-full bg-gray-800 border border-gray-800 rounded-md py-2 text-sm font-semibold text-white text-center hover:bg-gray-900"
                >
                  Sign up for Organization
                </a>
              </div>
              <div className="pt-6 pb-8 px-6">
                <h3 className="text-xs font-medium text-gray-900 tracking-wide uppercase">
                  What&apos;s included
                </h3>
                <ul className="mt-6 space-y-4">
                  <li className="flex space-x-3">
                    <FontAwesomeIcon icon={faCheck} />
                    <span className="text-sm text-gray-500">
                      500k views/month
                    </span>
                  </li>

                  <li className="flex space-x-3">
                    <FontAwesomeIcon icon={faCheck} />
                    <span className="text-sm text-gray-500">
                      10 staff users
                    </span>
                  </li>

                  <li className="flex space-x-3">
                    <FontAwesomeIcon icon={faCheck} />
                    <span className="text-sm text-gray-500">
                      Donec mauris sit in eu tincidunt etiam.
                    </span>
                  </li>

                  <li className="flex space-x-3">
                    <FontAwesomeIcon icon={faCheck} />
                    <span className="text-sm text-gray-500">
                      Faucibus volutpat magna.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
