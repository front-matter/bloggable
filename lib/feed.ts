import { Feed } from 'feed'
import { getAllPosts } from './posts'
import { fromUnixTime } from 'date-fns'
const fs = require('fs')

export async function generateAtomFeed() {
  const feed = new Feed({
    title: 'Front Matter',
    description: 'Front Matter is a science blogging platform.',
    id: 'https://blog.front-matter.io/',
    link: 'https://blog.front-matter.io/',
    language: 'en',
    copyright:
      'Copyright © 2021 Front Matter. Distributed under the terms of the Creative Commons Attribution 4.0 License.',
    feedLinks: {
      atom: 'https://blog.front-matter.io/feed.xml'
    },
    author: {
      name: 'Martin Fenner',
      email: 'martin@front-matter.io'
    }
  })

  const posts = await getAllPosts()

  posts.forEach((post) => {
    feed.addItem({
      title: post.document.title,
      author: [
        {
          name: post.document.author.name,
          link: post.document.author.id
        }
      ],
      id: post.document.id,
      link:
        'https://blog.front-matter.io/' +
        post.document.blogId +
        '/' +
        post.document.slug,
      description: post.document.description,
      content: post.document.content,
      date: fromUnixTime(post.document.published)
    })
  })

  fs.writeFileSync('./public/feed.xml', feed.atom1())
}
