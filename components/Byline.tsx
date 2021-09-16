import React from 'react'

type Props = {
  authors: Author[]
  published: Date
  readingTime: number
}

interface Author {
  website: string
  name: string
  profile_image: string
}

const Byline: React.FunctionComponent<Props> = ({
  authors,
  published,
  readingTime
}) => {
  return (
    <div className="flex flex-row pt-2 pb-4">
      <div className="">
        <div className="font-bold font-sans uppercase text-sm">
          {authors.map((author) => author.name).join(', ')}
        </div>
        <div className="font-sans text-sm text-gray-600">
          {published.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}{' '}
          &bull; {readingTime} min read
        </div>
      </div>
    </div>
  )
}

export default Byline
