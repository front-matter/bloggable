import React from 'react'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRss } from '@fortawesome/free-solid-svg-icons'
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
      <div className="container mx-auto py-8 flex flex-auto items-center justify-between font-sans">
        <div className="mt-8 w-full grid grid-cols-4 gap-8 xl:mt-0">
          <div className="mt-2 md:mt-0">
            <h3 className="text-base font-semibold text-gray-400 tracking-wider uppercase">
              Front Matter
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

                  <Link href="https://discuss.front-matter.io">
                    <a className="text-gray-500 hover:text-gray-400 border-b-0">
                      <span className="sr-only">Discourse</span>
                      <FontAwesomeIcon icon={faDiscourse} />
                    </a>
                  </Link>

                  <Link href="https://front-matter.io/feed.xml">
                    <a className="text-gray-500 hover:text-gray-400 border-b-0">
                      <span className="sr-only">RSS</span>
                      <FontAwesomeIcon icon={faRss} />
                    </a>
                  </Link>

                  <Link href="https://github.com/front-matter">
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
              Features
            </h3>
            <ul className="mt-1 list-none">
              <li>
                <Link href="/features#editor">
                  <a className="text-sm border-b-0 text-gray-500 hover:text-gray-400">
                    Easy-to-use powerful editor
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/features#scientific">
                  <a className="text-sm border-b-0 text-gray-500 hover:text-gray-400">
                    Editing scientific content
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/features#publishing">
                  <a className="text-sm border-b-0 text-gray-500 hover:text-gray-400">
                    Flexible publishing options
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/features#discovery">
                  <a className="text-sm border-b-0 text-gray-500 hover:text-gray-400">
                    Discovery, discussion and reuse
                  </a>
                </Link>
              </li>
            </ul>
          </div>
          <div className="mt-2 md:mt-0">
            <h3 className="text-base font-semibold text-gray-400 tracking-wider uppercase">
              Services
            </h3>
            <ul className="mt-1 list-none">
              <li>
                <Link href="https://discuss.front-matter.io">
                  <a className="text-sm border-b-0 text-gray-500 hover:text-gray-400">
                    Discussion Forum
                  </a>
                </Link>
              </li>
              <li>
                <Link href="https://graphs.front-matter.io">
                  <a className="text-sm border-b-0 text-gray-500 hover:text-gray-400">
                    Graphs Editor
                  </a>
                </Link>
              </li>
              <li>
                <Link href="https://plausible.io/front-matter.io">
                  <a className="text-sm border-b-0 text-gray-500 hover:text-gray-400">
                    Usage Stats
                  </a>
                </Link>
              </li>
            </ul>
          </div>
          <div className="mt-2 md:mt-0">
            <h3 className="text-base font-semibold text-gray-400 tracking-wider uppercase">
              About
            </h3>
            <ul className="mt-1 list-none">
              <li>
                <Link href="/open-source">
                  <a className="text-sm border-b-0 text-gray-500 hover:text-gray-400">
                    Open Source Software
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
