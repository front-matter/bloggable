import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import logo from '../public/img/logo.svg'

export default function Navbar() {
  return (
    <>
      <nav className="bg-white">
        <div className="container flex flex-auto items-center justify-between font-sans">
          <div className="flex justify-between h-16">
            <div className="flex mx-2 px-2 lg:px-0">
              <div className="flex-shrink-0 flex items-center">
                <Link href="/" passHref>
                  <a href="dummy" className="text-green-600 border-b-0 flex">
                    <Image
                      className="block lg:hidden h-8 w-auto"
                      src={logo}
                      alt="Front Matter"
                      height={32}
                      width={32}
                    />
                    <span className="text-lg font-semibold pl-1 pt-1">
                      Front Matter
                    </span>
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}
