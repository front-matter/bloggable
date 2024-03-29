import React from "react";
import Link from "next/link";

export default function Authors({ authors }) {
  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto py-2 md:py-12 px-4 text-center sm:px-6 lg:px-8 lg:py-8">
        <div className="space-y-8 sm:space-y-12">
          <div className="space-y-5 sm:mx-auto sm:max-w-xl sm:space-y-4 lg:max-w-5xl">
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              The Front Matter authors
            </h2>
            <p className="text-xl text-gray-500">
              Reach out to the{" "}
              <Link href={"/team"} passHref>
                <a className="text-force-blue border-b-0" href="dummy">
                  Front Matter Team
                </a>
              </Link>{" "}
              if you are interested in becoming a guest author.
            </p>
          </div>
          <ul
            role="list"
            className="mx-auto list-none grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-4 md:gap-x-6 lg:max-w-5xl lg:gap-x-8 lg:gap-y-12 xl:grid-cols-6 md:min-h-screen"
          >
            {authors.map((author) => (
              <li key={author.slug}>
                <div className="space-y-4">
                  <img
                    className="mx-auto h-20 w-20 rounded-full lg:w-24 lg:h-24"
                    src={author.profile_image ? author.profile_image : null}
                    alt=""
                  />
                  <div className="space-y-2">
                    <div className="text-xs font-medium lg:text-sm">
                      <Link href={"/authors/" + author.slug} passHref>
                        <a
                          href="dummy"
                          className="text-gray-500 text-base font-medium font-sans border-b-0 hover:border-b hover:border-green-600"
                        >
                          {author.name}
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
