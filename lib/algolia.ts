import { getGhostPosts } from './posts'
import trimText from './trimText'
import sanitizeHtml from 'sanitize-html'
const fs = require('fs')

export async function updateIndex() {
  const posts = await getGhostPosts()
  const objects = posts.reduce((accumulator, currentValue) => {
    const description = trimText(
      sanitizeHtml(currentValue.html, {
        allowedTags: ['b', 'i', 'em', 'strong']
      }),
      200,
      250,
      300
    )[0]

    accumulator.push({
      objectID: currentValue.uuid,
      blog: {
        id: 'mfenner',
        name: 'Gobbledygook'
      },
      title: currentValue.title,
      slug: currentValue.slug,
      author: {
        id: currentValue.primary_author.website,
        name: currentValue.primary_author.name,
        imageUrl: 'https:' + currentValue.primary_author.profile_image
      },
      description: description + '...',
      content: currentValue.html,
      readingTime: currentValue.reading_time,
      _tags: currentValue.tags && currentValue.tags.map((tag) => tag.name),
      featureImage: currentValue.feature_image,
      visibility: currentValue.visibility,
      created: currentValue.created_at,
      published: currentValue.published_at,
      updated: currentValue.updated_at,
      schemaOrg: {
        '@context': 'http://schema.org',
        '@type': 'BlogPosting',
        '@id': 'https://sensiblescience.io/' + currentValue.uuid,
        url: 'https://sensiblescience.io/mfenner/' + currentValue.slug,
        name: currentValue.title,
        headline: currentValue.title,
        description: description + '...',
        author: {
          '@type': 'Person',
          '@id': currentValue.primary_author.website,
          name: currentValue.primary_author.name,
          image: currentValue.primary_author.profile_image
            ? 'https:' + currentValue.primary_author.profile_image
            : null
        },
        publisher: { '@type': 'Organization', name: 'Gobbledygook' },
        keywords: currentValue.tags
          ? currentValue.tags.map((tag) => tag.name).join(', ')
          : null,
        inLanguage: 'en',
        license: 'https://creativecommons.org/licenses/by/4.0/legalcode',
        dateCreated: currentValue.created,
        dateModified: currentValue.updated,
        datePublished: currentValue.published
      }
    })
    return accumulator
  }, [])

  fs.writeFileSync('./public/algolia.json', JSON.stringify(objects))
}
