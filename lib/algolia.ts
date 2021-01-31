import { getPosts } from './posts'
import truncate from 'lodash/truncate'
const fs = require('fs')

export async function updateIndex() {
  const posts = await getPosts()
  const objects = posts.reduce((accumulator, currentValue) => {
    accumulator.push({
      objectID: currentValue.uuid,
      title: currentValue.title,
      slug: currentValue.slug,
      author: {
        id: currentValue.primary_author.website,
        name: currentValue.primary_author.name,
        imageUrl: 'https:' + currentValue.primary_author.profile_image
      },
      description: truncate(currentValue.html, {
        length: 500,
        omission: '***'
      }),
      content: currentValue.html,
      readingTime: currentValue.reading_time,
      _tags: currentValue.tags.map((tag) => tag.name),
      published: currentValue.published_at,
      updated: currentValue.updated_at
    })
    return accumulator
  }, [])

  fs.writeFileSync('./public/algolia.json', JSON.stringify(objects))
}
