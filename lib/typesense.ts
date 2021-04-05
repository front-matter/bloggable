import { Client } from 'typesense'
import { getGhostPosts } from './posts'
import { generateHtml } from './pandoc'
import trimText from './trimText'
import sanitizeHtml from 'sanitize-html'
import { getTime, parseISO } from 'date-fns'
const fs = require('fs')

export async function updateIndex() {
  const posts = await getGhostPosts()
  let documents = ''

  for (const post of posts) {
    const description = trimText(
      sanitizeHtml(post.html, {
        allowedTags: ['b', 'i', 'em', 'strong']
      }),
      200,
      250,
      300
    )[0]

    const document = {
      id: post.uuid,
      blogId: 'mfenner',
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
      created: getTime(parseISO(post.created_at)) * 0.001,
      published: getTime(parseISO(post.published_at)) * 0.001,
      updated: getTime(parseISO(post.updated_at)) * 0.001,
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
        dateCreated: getTime(parseISO(post.created_at)) * 0.001,
        dateModified: getTime(parseISO(post.updated_at)) * 0.001,
        datePublished: getTime(parseISO(post.published_at)) * 0.001
      }
    }
    // ignore null values
    let cleanedDocument = Object.fromEntries(
      Object.entries(document).filter(([_, v]) => v != null)
    )
    documents += JSON.stringify(cleanedDocument) + '\n'
  }

  await fs.writeFileSync('./public/typesense.json', documents)

  let client = new Client({
    nodes: [
      {
        host: process.env.NEXT_PUBLIC_TYPESENSE_HOST_1,
        port: '443',
        protocol: 'https'
      }
    ],
    apiKey: process.env.NEXT_PUBLIC_TYPESENSE_ADMIN_API_KEY,
    connectionTimeoutSeconds: 2
  })

  if (!client.collections('sensible-science').retrieve()) {
    let schema = {
      name: 'sensible-science',
      fields: [
        {
          name: 'id',
          type: 'string',
          facet: false
        },
        {
          name: 'blogId',
          type: 'string',
          facet: true
        },
        {
          name: 'title',
          type: 'string',
          facet: false
        },
        {
          name: 'slug',
          type: 'string',
          facet: false
        },
        {
          name: 'description',
          type: 'string',
          facet: false
        },
        {
          name: 'content',
          type: 'string',
          facet: false
        },
        {
          name: 'readingTime',
          type: 'int32',
          facet: true
        },
        {
          name: '_tags',
          type: 'string[]',
          facet: true
        },
        {
          name: 'featureImage',
          type: 'string',
          facet: true
        },
        {
          name: 'visibility',
          type: 'string',
          facet: true
        },
        {
          name: 'created',
          type: 'int32',
          facet: false
        },
        {
          name: 'published',
          type: 'int32',
          facet: true
        },
        {
          name: 'updated',
          type: 'int32',
          facet: true
        }
      ],
      default_sorting_field: 'published'
    }

    client
      .collections()
      .create(schema)
      .then(function (data) {
        console.log(data)
      })
      .catch((err) => {
        console.error(err)
      })
  }

  // client
  //   .collections('sensible-science')
  //   .documents()
  //   .import(documents, { action: 'upsert' })
  //   .then(function (data) {
  //     console.log(data)
  //   })
  //   .catch((err) => {
  //     console.error(err)
  //   })
}
