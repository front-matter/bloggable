import { Feed } from 'feed'
import { getAllPosts } from './posts'
const fs = require('fs')

export async function generateAtomFeed() {
  const feed = new Feed({
    title: 'Front Matter',
    description: 'Front Matter is a science blogging platform.',
    id: 'https://front-matter.io/',
    link: 'https://front-matter.io/',
    language: 'en',
    copyright:
      'Copyright © 2021 Front Matter. Distributed under the terms of the Creative Commons Attribution 4.0 License.',
    feedLinks: {
      atom: 'https://front-matter.io/feed.xml'
    },
    author: {
      name: 'Martin Fenner',
      email: 'mf@martinfenner.org'
    }
  })

  const posts = await getAllPosts()

  posts.forEach((post) => {
    console.log(post)
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
        'https://front-matter.io/' +
        post.document.blogId +
        '/' +
        post.document.slug,
      description: post.document.description,
      content: post.document.content,
      date: new Date(post.document.published)
    })
  })

  fs.writeFileSync('./public/feed.xml', feed.atom1())
}
