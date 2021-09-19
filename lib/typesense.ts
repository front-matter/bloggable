import { Client } from 'typesense'
import { getAllPosts } from './posts'
import { generateHtml } from './pandoc'
import { uuid2base32, sanitizeDescription } from './helpers'
import { getTime, parseISO } from 'date-fns'

export async function refreshIndex() {
  const client = new Client({
    nearestNode: {
      host: process.env.NEXT_PUBLIC_TYPESENSE_HOST_0,
      port: '443',
      protocol: 'https'
    },
    nodes: [
      {
        host: process.env.NEXT_PUBLIC_TYPESENSE_HOST_1,
        port: '443',
        protocol: 'https'
      },
      {
        host: process.env.NEXT_PUBLIC_TYPESENSE_HOST_2,
        port: '443',
        protocol: 'https'
      },
      {
        host: process.env.NEXT_PUBLIC_TYPESENSE_HOST_3,
        port: '443',
        protocol: 'https'
      }
    ],
    apiKey: process.env.NEXT_PUBLIC_TYPESENSE_ADMIN_API_KEY,
    connectionTimeoutSeconds: 5
  })

  const posts = await getAllPosts()
  const documents = []

  for (const post of posts) {
    const description = sanitizeDescription(post.html)
    const id = uuid2base32(post.uuid)

    const document = {
      id: id,
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
      tags: post.tags && post.tags.map((tag) => tag.slug),
      featured: post.featured,
      featureImage: post.feature_image,
      visibility: post.visibility,
      created: getTime(parseISO(post.created_at)) * 0.001,
      published: getTime(parseISO(post.published_at)) * 0.001,
      updated: getTime(parseISO(post.updated_at)) * 0.001,
      schemaOrg: {
        '@context': 'http://schema.org',
        '@type': 'BlogPosting',
        '@id': 'https://blog.front-matter.io/' + id,
        url: 'https://blog.front-matter.io/mfenner/' + post.slug,
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
        publisher: { '@type': 'Organization', name: 'Front Matter' },
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
    const cleanedDocument = Object.fromEntries(
      Object.entries(document).filter(([, v]) => v != null)
    )

    // empty index
    await client
      .collections('front-matter')
      .documents()
      .delete({ filter_by: 'visibility:true' })
      .catch((err) => {
        console.error(err)
      })

    // insert new documents
    await client
      .collections('front-matter')
      .documents()
      .upsert(cleanedDocument)
      .catch((err) => {
        console.error(err)
      })
    documents.push(JSON.stringify(cleanedDocument))
  }
}

export async function updateSchema() {
  const schema = {
    name: 'front-matter',
    fields: [
      {
        name: 'id',
        type: 'string',
        facet: false
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
        name: 'tags',
        type: 'string[]',
        facet: true,
        optional: true
      },
      {
        name: 'featureImage',
        type: 'string',
        facet: false,
        optional: true
      },
      {
        name: 'featured',
        type: 'bool',
        facet: true,
        optional: true
      },
      {
        name: 'visibility',
        type: 'string',
        facet: false
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
        facet: false
      }
    ],
    default_sorting_field: 'published'
  }

  const client = new Client({
    nearestNode: {
      host: process.env.NEXT_PUBLIC_TYPESENSE_HOST_0,
      port: '443',
      protocol: 'https'
    },
    nodes: [
      {
        host: process.env.NEXT_PUBLIC_TYPESENSE_HOST_1,
        port: '443',
        protocol: 'https'
      },
      {
        host: process.env.NEXT_PUBLIC_TYPESENSE_HOST_2,
        port: '443',
        protocol: 'https'
      },
      {
        host: process.env.NEXT_PUBLIC_TYPESENSE_HOST_3,
        port: '443',
        protocol: 'https'
      }
    ],
    apiKey: process.env.NEXT_PUBLIC_TYPESENSE_ADMIN_API_KEY,
    connectionTimeoutSeconds: 2
  })

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
