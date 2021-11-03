import type { NextApiRequest, NextApiResponse } from 'next'
import Cors from 'cors'
import { getIndexedPosts } from '../../lib/posts'
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

  const posts = await getIndexedPosts('*')
  const response = posts
  res.status(200).json(response)
}
