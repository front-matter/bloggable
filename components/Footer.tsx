import React from 'react'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faGithub,
  faTwitter,
  faYoutube,
  faDiscourse
} from '@fortawesome/free-brands-svg-icons'

export default function Footer() {
  return (
    <footer className="bg-gray-200" aria-labelledby="footerHeading">
      <h2 id="footerHeading" className="sr-only">
        Footer
      </h2>
      <div className="container mx-auto py-8 flex flex-auto items-center justify-between font-sans">
        <div className="mt-8 w-full grid grid-cols-4 gap-8 xl:mt-0">
          <div className="mt-2 md:mt-0">
            <h3 className="text-base font-semibold text-gray-400 tracking-wider uppercase">
              Sensible Science
            </h3>
            <ul className="mt-1 list-none">
              <li>
                <div className="flex space-x-3 mb-3">
                  <Link href="https://twitter.com/sens_science">
                    <a className="text-gray-500 hover:text-gray-400 border-b-0">
                      <span className="sr-only">Twitter</span>
                      <FontAwesomeIcon icon={faTwitter} />
                    </a>
                  </Link>

                  <Link href="https://discuss.sensiblescience.io">
                    <a className="text-gray-500 hover:text-gray-400 border-b-0">
                      <span className="sr-only">Discourse</span>
                      <FontAwesomeIcon icon={faDiscourse} />
                    </a>
                  </Link>

                  <Link href="https://github.com/sensible-science">
                    <a className="text-gray-500 hover:text-gray-400 border-b-0">
                      <span className="sr-only">GitHub</span>
                      <FontAwesomeIcon icon={faGithub} />
                    </a>
                  </Link>
                </div>
              </li>
            </ul>
          </div>
          <div className="mt-2 md:mt-0">
            <h3 className="text-base font-semibold text-gray-400 tracking-wider uppercase">
              Solutions
            </h3>
            <ul className="mt-1 list-none">
              <li>
                <a
                  href="#"
                  className="text-sm border-b-0 text-gray-500 hover:text-gray-400"
                >
                  Marketing
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="text-sm border-b-0 text-gray-500 hover:text-gray-400"
                >
                  Analytics
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="text-sm border-b-0 text-gray-500 hover:text-gray-400"
                >
                  Commerce
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="text-sm border-b-0 text-gray-500 hover:text-gray-400"
                >
                  Insights
                </a>
              </li>
            </ul>
          </div>
          <div className="mt-2 md:mt-0">
            <h3 className="text-base font-semibold text-gray-400 tracking-wider uppercase">
              Support
            </h3>
            <ul className="mt-1 list-none">
              <li>
                <a
                  href="#"
                  className="text-sm border-b-0 text-gray-500 hover:text-gray-400"
                >
                  Pricing
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="text-sm border-b-0 text-gray-500 hover:text-gray-400"
                >
                  Documentation
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="text-sm border-b-0 text-gray-500 hover:text-gray-400"
                >
                  Guides
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-base font-semibold text-gray-400 tracking-wider uppercase">
              Company
            </h3>
            <ul className="mt-1 list-none">
              <li>
                <a
                  href="#"
                  className="text-sm border-b-0 text-gray-500 hover:text-gray-400"
                >
                  About
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="text-sm border-b-0 text-gray-500 hover:text-gray-400"
                >
                  Blog
                </a>
              </li>

              <li>
                <Link href="/privacy">
                  <a className="text-sm border-b-0 text-gray-500 hover:text-gray-400">
                    Privacy Policy
                  </a>
                </Link>
              </li>

              <li>
                <Link href="/terms">
                  <a className="text-sm border-b-0 text-gray-500 hover:text-gray-400">
                    Terms
                  </a>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}
