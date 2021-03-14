import { getGhostPosts } from './posts'
import { generateHtml } from './pandoc'
import trimText from './trimText'
import sanitizeHtml from 'sanitize-html'
import reduce from 'awaity/reduce'
const fs = require('fs')

export async function updateIndex() {
  const posts = await getGhostPosts()
  const objects = []

  for (const post of posts) {
    const description = trimText(
      sanitizeHtml(post.html, {
        allowedTags: ['b', 'i', 'em', 'strong']
      }),
      200,
      250,
      300
    )[0]

    const object = {
      objectID: post.uuid,
      blog: {
        id: 'mfenner',
        name: 'Gobbledygook'
      },
      title: post.title,
      slug: post.slug,
      author: {
        id: post.primary_author.website,
        name: post.primary_author.name,
        imageUrl: 'https:' + post.primary_author.profile_image
      },
      description: description + '...',
      content: await generateHtml(post.html),
      readingTime: post.reading_time,
      _tags: post.tags && post.tags.map((tag) => tag.name),
      featureImage: post.feature_image,
      visibility: post.visibility,
      created: post.created_at,
      published: post.published_at,
      updated: post.updated_at,
      schemaOrg: {
        '@context': 'http://schema.org',
        '@type': 'BlogPosting',
        '@id': 'https://sensiblescience.io/' + post.uuid,
        url: 'https://sensiblescience.io/mfenner/' + post.slug,
        name: post.title,
        headline: post.title,
        description: description + '...',
        author: {
          '@type': 'Person',
          '@id': post.primary_author.website,
          name: post.primary_author.name,
          image: post.primary_author.profile_image
            ? 'https:' + post.primary_author.profile_image
            : null
        },
        publisher: { '@type': 'Organization', name: 'Gobbledygook' },
        keywords: post.tags
          ? post.tags.map((tag) => tag.name).join(', ')
          : null,
        inLanguage: 'en',
        license: 'https://creativecommons.org/licenses/by/4.0/legalcode',
        dateCreated: post.created_at,
        dateModified: post.updated_at,
        datePublished: post.published_at
      }
    }
    objects.push(object)
  }

  fs.writeFileSync('./public/algolia.json', JSON.stringify(objects))
}
