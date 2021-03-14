import type { NextApiRequest, NextApiResponse } from 'next'
import Cors from 'cors'
import omit from 'lodash/omit'
import { getPosts } from '../../lib/posts'
import { initMiddleware } from '../../lib/helpers'

// Initialize the cors middleware
const cors = initMiddleware(
  Cors({
    methods: ['GET', 'POST', 'OPTIONS']
  })
)

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Run cors
  await cors(req, res)

  const posts = await getPosts(
    req.query['query'] as string,
    req.query['page'] as any,
    req.query['hitsPerPage'] as any
  )

  // if there is an error
  if (posts && posts.name) {
    // don't show transporterStackTrace object in API
    const response = omit(posts, 'transporterStackTrace')
    res.status(400).json(response)
  } else {
    const response = posts.map((post) => omit(post, '_highlightResult'))
    res.status(200).json(response)
  }
}
