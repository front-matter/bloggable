import { Feed } from 'feed'
import { getPosts } from './posts'
const fs = require('fs')

export async function generateAtomFeed() {
  const feed = new Feed({
    title: 'Sensible Science',
    description: 'Sensible Science is a science blogging platform.',
    id: 'https://sensiblescience.io/',
    link: 'https://sensiblescience.io/',
    language: 'en',
    copyright:
      'Copyright © 2007-' +
      new Date().getFullYear() +
      ' Sensible Science. Distributed under the terms of the Creative Commons Attribution 4.0 License.',
    feedLinks: {
      atom: 'https://sensiblescience.io/feed.xml'
    },
    author: {
      name: 'Martin Fenner',
      email: 'mf@martinfenner.org'
    }
  })

  const posts = await getPosts('')

  posts.forEach((post) => {
    feed.addItem({
      title: post.title,
      author: [
        {
          name: post.author.name,
          link: post.author.id
        }
      ],
      id: post.objectID,
      link: 'https://sensiblescience.io/' + post.blog.id + '/' + post.slug,
      description: post.description,
      content: post.content,
      date: new Date(post.published)
    })
  })

  fs.writeFileSync('./public/feed.xml', feed.atom1())
}
