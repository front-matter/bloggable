import React from 'react'

type Props = {
  author: {
    id: string
    name: string
    imageUrl: string
  }
  published: Date
  readingTime: number
}

const Byline: React.FunctionComponent<Props> = ({
  author,
  published,
  readingTime
}) => {
  return (
    <div className="flex flex-row pt-2 pb-4">
      <img
        className="h-10 shadow rounded-full mr-2"
        src={author.imageUrl}
        alt={''}
      />
      <div className="">
        <div className="font-bold font-sans uppercase text-sm">
          {author.name}
        </div>
        <div className="uppercase font-sans text-sm text-gray-600">
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
