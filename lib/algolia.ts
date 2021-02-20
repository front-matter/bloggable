import { getPosts } from './posts'
import trimText from './trimText'
import sanitizeHtml from 'sanitize-html'
const fs = require('fs')

export async function updateIndex() {
  const posts = await getPosts()
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
      published: currentValue.published_at,
      updated: currentValue.updated_at
    })
    return accumulator
  }, [])

  fs.writeFileSync('./public/algolia.json', JSON.stringify(objects))
}
