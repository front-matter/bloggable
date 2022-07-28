import React from 'react'
import Link from 'next/link'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDiscord
} from "@fortawesome/free-brands-svg-icons";

export default function Discord() {
  return (
    <>
      <div className="bg-white">
        <div className="container max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 font-sans min-h-screen">
          <div className="sm:flex sm:flex-col sm:align-center">
            <h1 className="text-5xl font-extrabold text-green-600">
              Discord
            </h1>
            <div className="mt-5 text-xl text-gray-500">
              <p>
                <span className="text-lg text-gray-900 mr-0.5">
                    <FontAwesomeIcon icon={faDiscord} />
                  </span>
                Discord is a popular instant messaging social platform.{' '}
                <Link href="https://discord.gg/9wnkmWwDWx" passHref>
                  <a
                    href="dummy"
                    className="text-gray-500 border-b border-green-600 hover:border-green-800"
                  >
                    Join the Front Matter Discord server{' '}
                  </a>
                </Link>
                for comments and other feedback related to the Front Matter Blog,
                or to contact Front Matter staff.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
