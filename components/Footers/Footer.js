import React from 'react'

export default function Footer() {
  return (
    <>
      <footer className="relative bg-gray-300 py-4 mt-12">
        <div
          className="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20 h-20"
          style={{ transform: 'translateZ(0)' }}
        >
          <svg
            className="absolute bottom-0 overflow-hidden"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            version="1.1"
            viewBox="0 0 2560 100"
            x="0"
            y="0"
          >
            <polygon
              className="text-gray-300 fill-current"
              points="2560 0 2560 100 0 100"
            ></polygon>
          </svg>
        </div>
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap md:justify-between justify-center">
            <div className="w-auto md:w-6/12 mx-auto">
              <div className="text-gray-600 py-1" data-cy="copyright">
                Copyright © 2007-{new Date().getFullYear()} Martin Fenner.
                <p>
                  Distributed under the terms of the{' '}
                  <a
                    className="border-b-0"
                    href="https://creativecommons.org/licenses/by/4.0/legalcode"
                  >
                    Creative Commons Attribution 4.0 License.
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
