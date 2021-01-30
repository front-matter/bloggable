import React from 'react'

type Props = {
  post: {
    id: string
    primary_author: any
    published_at: Date
    reading_time: Number
  }
}

const Byline: React.FunctionComponent<Props> = ({ post }) => {
  return (
    <div className="flex flex-row pt-2 pb-4">
      <img
        className="h-10 shadow rounded-full mr-2"
        src={post.primary_author.profile_image}
      />
      <div className="">
        <div className="font-bold font-sans uppercase text-sm">
          {post.primary_author.name}
        </div>
        <div className="uppercase font-sans text-sm text-gray-600">
          {new Date(post.published_at).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}{' '}
          &bull; {post.reading_time} min read
        </div>
      </div>
    </div>
  )
}

export default Byline
