import React from 'react'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import next from 'next'

export default function Pricing() {
  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-24 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold text-green-600">
            Open source software
          </h2>
          <p className="mt-4 text-lg text-gray-500">
            Front Matter is built with open source software, including the
            following key components:
          </p>
        </div>
        <dl className="mt-12 space-y-10 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-12 lg:grid-cols-4 lg:gap-x-8">
          <div className="relative">
            <dt>
              <Link href="https://github.com/TryGhost/Ghost">
                <a
                  className="ml-9 text-xl leading-6 font-bold font-sans text-green-600 border-b-0"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ghost
                </a>
              </Link>
            </dt>
            <dd className="mt-0 ml-9 text-base text-gray-500">
              Ghost is a blogging platform, designed to simplify the process of
              online publishing.
              <p className="mt-2 text-sm font-sans">
                Original authors John O'Nolan, Hannah Wolfe
              </p>
            </dd>
          </div>

          <div className="relative">
            <dt>
              <Link href="https://github.com/TryGhost/Ghost">
                <a
                  className="ml-9 text-xl leading-6 font-bold font-sans text-green-600 border-b-0"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Discourse
                </a>
              </Link>
            </dt>
            <dd className="mt-0 ml-9 text-base text-gray-500">
              Discourse is the discussion platform built for the next decade of
              the Internet.
              <p className="mt-2 text-sm font-sans">
                Original authors Jeff Atwood, Robin Ward, Sam Saffron
              </p>
            </dd>
          </div>

          <div className="relative">
            <dt>
              <Link href="https://github.com/vercel/next.js/">
                <a
                  className="ml-9 text-xl leading-6 font-bold font-sans text-green-600 border-b-0"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Next.js
                </a>
              </Link>
            </dt>
            <dd className="mt-0 ml-9 text-base text-gray-500">
              A front-end development web framework that enables server-side
              rendering and generating static websites.
              <p className="mt-2 text-sm font-sans">
                Original author Guillermo Rauch
              </p>
            </dd>
          </div>

          <div className="relative">
            <dt>
              <Link href="https://github.com/jgm/pandoc">
                <a
                  className="ml-9 text-xl leading-6 font-bold font-sans text-green-600 border-b-0"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Pandoc
                </a>
              </Link>
            </dt>
            <dd className="mt-0 ml-9 text-base text-gray-500">
              The universal markup converter is a library for converting from
              one markup format to another.
              <p className="mt-2 text-sm font-sans">
                Original author John MacFarlane
              </p>
            </dd>
          </div>

          <div className="relative">
            <dt>
              <Link href="https://github.com/rawgraphs/rawgraphs-app">
                <a
                  className="ml-9 text-xl leading-6 font-bold font-sans text-green-600 border-b-0"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  RAWGraphs
                </a>
              </Link>
            </dt>
            <dd className="mt-0 ml-9 text-base text-gray-500">
              RAWGraphs is an open web tool to create custom vector-based
              visualizations on top of the amazing d3.js library.
            </dd>
          </div>

          <div className="relative">
            <dt>
              <Link href="https://github.com/citation-style-language/styles">
                <a
                  className="ml-9 text-xl leading-6 font-bold font-sans text-green-600 border-b-0"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  CSL
                </a>
              </Link>
            </dt>
            <dd className="mt-0 ml-9 text-base text-gray-500">
              Citation Style Language (CSL) automates the formatting of
              citations and bibliographies.
              <p className="mt-2 text-sm font-sans">
                Original authors Bruce D'Arcus, Frank Bennett, Rintze Zelle
              </p>
            </dd>
          </div>

          <div className="relative">
            <dt>
              <Link href="https://github.com/typesense/typesense">
                <a
                  className="ml-9 text-xl leading-6 font-bold font-sans text-green-600 border-b-0"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Typesense
                </a>
              </Link>
            </dt>
            <dd className="mt-0 ml-9 text-base text-gray-500">
              Typesense is a fast, typo-tolerant search engine for building
              delightful search experiences.
              <p className="mt-2 text-sm font-sans">
                Original authors Jason Bosco, Kishore Nallan
              </p>
            </dd>
          </div>

          <div className="relative">
            <dt>
              <Link href="https://github.com/plausible/hosting">
                <a
                  className="ml-9 text-xl leading-6 font-bold font-sans text-green-600 border-b-0"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Plausible
                </a>
              </Link>
            </dt>
            <dd className="mt-0 ml-9 text-base text-gray-500">
              Plausible provides all website traffic metrics at a glance in a
              simple and modern web analytics dashboard.
              <p className="mt-2 text-sm font-sans">
                Original authors Marko Saric, Uku Täht
              </p>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  )
}
