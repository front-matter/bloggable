import { Client } from 'typesense'
import { getAllPosts } from './posts'
import { generateHtml } from './pandoc'
import { sanitizeDescription } from './helpers'
import { getTime, parseISO } from 'date-fns'

const typesenseCollection = process.env.NEXT_PUBLIC_TYPESENSE_COLLECTION

export async function refreshIndex() {
  const client = new Client({
    nearestNode: {
      host: process.env.NEXT_PUBLIC_TYPESENSE_HOST_0,
      port: 443,
      protocol: 'https'
    },
    nodes: [
      {
        host: process.env.NEXT_PUBLIC_TYPESENSE_HOST_1,
        port: 443,
        protocol: 'https'
      },
      {
        host: process.env.NEXT_PUBLIC_TYPESENSE_HOST_2,
        port: 443,
        protocol: 'https'
      },
      {
        host: process.env.NEXT_PUBLIC_TYPESENSE_HOST_3,
        port: 443,
        protocol: 'https'
      }
    ],
    apiKey: process.env.NEXT_PUBLIC_TYPESENSE_ADMIN_API_KEY,
    connectionTimeoutSeconds: 10
  })

  const posts = await getAllPosts()
  const documents = []

  for (const post of posts) {
    const description = sanitizeDescription(post.html)
    const doi = post.canonical_url

    const document = {
      id: post.id,
      title: post.title,
      slug: post.slug,
      doi: doi,
      author_ids: post.authors && post.authors.map((author) => author.slug),
      authors: post.authors && post.authors.map((author) => author.name),
      description: description + '',
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
        '@id': doi,
        url: 'https://blog.front-matter.io/posts/' + post.slug,
        name: post.title,
        headline: post.title,
        description: description + '',
        author: {
          '@type': 'Person',
          '@id': post.primary_author.website,
          name: post.primary_author.name,
          image: post.primary_author.profile_image
            ? 'https:' + post.primary_author.profile_image
            : null
        },
        isPartOf: {
          '@type': 'Blog',
          name: 'Front Matter',
          issn: process.env.NEXT_PUBLIC_ISSN
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
      .collections(typesenseCollection)
      .documents()
      .delete({ filter_by: 'visibility:true' })
      .catch((err) => {
        console.error(err)
      })

    // insert new documents
    await client
      .collections(typesenseCollection)
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
    name: typesenseCollection,
    fields: [
      {
        name: 'id',
        type: 'string',
        facet: false,
        optional: false
      },
      {
        name: 'title',
        type: 'string',
        facet: false,
        optional: false
      },
      {
        name: 'slug',
        type: 'string',
        facet: false,
        optional: false
      },
      {
        name: 'doi',
        type: 'string',
        facet: false,
        optional: true
      },
      {
        name: 'description',
        type: 'string',
        facet: false,
        optional: false
      },
      {
        name: 'content',
        type: 'string',
        facet: false,
        optional: false
      },
      {
        name: 'readingTime',
        type: 'int32',
        facet: true,
        optional: false
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
        facet: false,
        optional: false
      },
      {
        name: 'created',
        type: 'int32',
        facet: false,
        optional: false
      },
      {
        name: 'published',
        type: 'int32',
        facet: true,
        optional: false
      },
      {
        name: 'updated',
        type: 'int32',
        facet: false,
        optional: false
      }
    ],
    default_sorting_field: 'published'
  }

  const client = new Client({
    nearestNode: {
      host: process.env.NEXT_PUBLIC_TYPESENSE_HOST_0,
      port: 443,
      protocol: 'https'
    },
    nodes: [
      {
        host: process.env.NEXT_PUBLIC_TYPESENSE_HOST_1,
        port: 443,
        protocol: 'https'
      },
      {
        host: process.env.NEXT_PUBLIC_TYPESENSE_HOST_2,
        port: 443,
        protocol: 'https'
      },
      {
        host: process.env.NEXT_PUBLIC_TYPESENSE_HOST_3,
        port: 443,
        protocol: 'https'
      }
    ],
    apiKey: process.env.NEXT_PUBLIC_TYPESENSE_ADMIN_API_KEY,
    connectionTimeoutSeconds: 10
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
