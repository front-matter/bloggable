import React from 'react'

type Props = {
  authors: Author[]
  published: Date
  doi: string
  readingTime: number
  readabilityScore: number
}

interface Author {
  // slug: string
  // website: string
  name: string
  //  profile_image: string
}

const Byline: React.FunctionComponent<Props> = ({
  authors,
  published,
  doi,
  readingTime,
  readabilityScore
}) => {
  return (
    <>
      <div className="flex flex-row pt-2 pb-4">
        <div className="">
          <div className="font-bold font-sans uppercase text-sm">
            {authors.map((author, idx) => (
              <>
                {author && author.name}
                {idx + 1 < authors.length ? ", " : ""}
              </>
            ))}
          </div>
          <div className="font-sans text-sm text-gray-600">
            {published.toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}{' '}
            &bull; {readingTime} min read &bull;{' '}
            <a
              className="border-b-0 hover:border-b hover:border-force-blue"
              href="https://blog.front-matter.io/posts/on-readability"
              target="_blank"
              rel="noopener noreferrer"
            >
              readability score {readabilityScore.toFixed(1)}
            </a>
            {doi && (
              <>
                {' '}
                &bull; <br />
                <a
                  className="border-b-0 hover:border-b hover:border-green-600"
                  href={doi}
                >
                  {doi}
                </a>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Byline
