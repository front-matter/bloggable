import React from 'react'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRss, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import {
  faGithub,
  faTwitter,
  faDiscourse
} from '@fortawesome/free-brands-svg-icons'

export default function Footer() {
  return (
    <footer className="bg-gray-200" aria-labelledby="footerHeading">
      <h2 id="footerHeading" className="sr-only">
        Footer
      </h2>
      <div className="max-w-7xl mx-auto py-6 lg:py-8 flex flex-auto items-center justify-between font-sans">
        <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-2 lg:gap-8 xl:mt-0">
          <div className="mx-4 md:mx-auto mt-2 md:mt-0">
            <h3 className="text-base font-semibold text-gray-400 tracking-wider uppercase">
              Front Matter
            </h3>
            <p className="text-sm text-gray-500 mt-2">
              Kleimannstrasse 10
              <br /> 48149 Münster
              <br />
              Germany
            </p>
            <ul className="mt-1 list-none">
              <li>
                <div className="flex space-x-3 mb-3">
                  <Link href="mailto:info@front-matter.io" passHref>
                    <a
                      href="dummy"
                      className="text-gray-500 hover:text-gray-400 border-b-0"
                    >
                      <span className="sr-only">Email</span>
                      <FontAwesomeIcon icon={faEnvelope} />
                    </a>
                  </Link>

                  <Link href="https://twitter.com/front__matter" passHref>
                    <a
                      href="dummy"
                      className="text-gray-500 hover:text-gray-400 border-b-0"
                    >
                      <span className="sr-only">Twitter</span>
                      <FontAwesomeIcon icon={faTwitter} />
                    </a>
                  </Link>

                  <Link href="https://blog.front-matter.io/feed.xml" passHref>
                    <a
                      href="dummy"
                      className="text-gray-500 hover:text-gray-400 border-b-0"
                    >
                      <span className="sr-only">RSS</span>
                      <FontAwesomeIcon icon={faRss} />
                    </a>
                  </Link>

                  <Link href="https://github.com/front-matter" passHref>
                    <a
                      href="dummy"
                      className="text-gray-500 hover:text-gray-400 border-b-0"
                    >
                      <span className="sr-only">GitHub</span>
                      <FontAwesomeIcon icon={faGithub} />
                    </a>
                  </Link>
                </div>
              </li>
            </ul>
          </div>
          <div className="mt-2 mx-6 md:mt-0">
            <h3 className="text-base font-semibold text-gray-400 tracking-wider uppercase">
              Services
            </h3>
            <ul className="mt-1 list-none">
              <li>
                <Link href="https://blog.front-matter.io" passHref>
                  <a
                    href="dummy"
                    className="text-sm border-b-0 text-gray-500 hover:text-gray-400"
                  >
                    Blog
                  </a>
                </Link>
              </li>
              <li>
                <Link href="https://plausible.io/blog.front-matter.io" passHref>
                  <a
                    href="dummy"
                    className="text-sm border-b-0 text-gray-500 hover:text-gray-400"
                  >
                    Usage Stats
                  </a>
                </Link>
              </li>
            </ul>
          </div>
          <div className="mt-2 mx-6 md:mt-0">
            <h3 className="text-base font-semibold text-gray-400 tracking-wider uppercase">
              About
            </h3>
            <ul className="mt-1 list-none">
              <li>
                <Link href="/team" passHref>
                  <a
                    href="dummy"
                    className="text-sm border-b-0 text-gray-500 hover:text-gray-400"
                  >
                    Team
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/open-source" passHref>
                  <a
                    href="dummy"
                    className="text-sm border-b-0 text-gray-500 hover:text-gray-400"
                  >
                    Open Source Software
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/pages/privacy-policy" passHref>
                  <a
                    href="dummy"
                    className="text-sm border-b-0 text-gray-500 hover:text-gray-400"
                  >
                    Privacy Policy
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
