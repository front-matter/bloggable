import { getPosts } from './posts'
import nodePandoc from 'node-pandoc-promise'

// export async function generateHtml() {
//   const posts = await getPosts()
//   let src, date, htmlArgs

//   await posts.forEach((post) => {
//     src = post.html

//     date = new Date(post.published_at).toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric'
//     })

//     // generate HTML with Pandoc post-processing
//     htmlArgs = [
//       '-f',
//       'html',
//       '-t',
//       'html',
//       // '--filter',
//       // './node_modules/pandoc-url2cite/dist/pandoc-url2cite.js',
//       // '--citeproc',
//       // '--csl',
//       // './lib/apa.csl',
//       '-o',
//       `./public/html/${post.slug}.html`,
//       '--data-dir',
//       './',
//       '--metadata',
//       'title=' + post.title,
//       '--metadata',
//       'author=' + post.primary_author.name,
//       '--metadata',
//       'date=' + date,
//       '--metadata',
//       'url2cite=all-links',
//       '--metadata',
//       'journal.title=Gobbledygook',
//       '--metadata',
//       'license.type=Open Access',
//       '--metadata',
//       'license.link=https://creativecommons.org/licenses/by/4.0/legalcode',
//       '--metadata',
//       'license.text=Distributed under the terms of the Creative Commons Attribution 4.0 License.'
//     ]
//     nodePandoc(src, htmlArgs)
//   })
// }

export async function generateEpub() {
  const posts = await getPosts()
  let src, date, epubArgs

  await posts.forEach((post) => {
    src = post.html

    date = new Date(post.published_at).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })

    // generate ePub
    epubArgs = [
      '-f',
      'html',
      '-t',
      'epub',
      '-o',
      './public/epub/' + post.slug + '.epub',
      '--standalone',
      '--data-dir',
      './'
    ]
    nodePandoc(src, epubArgs)
  })
}

export async function generatePdf() {
  const posts = await getPosts()
  let src, date, pdfArgs

  await posts.forEach((post) => {
    src = post.html

    date = new Date(post.published_at).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })

    // generate pdf
    pdfArgs = [
      '-f',
      'html',
      '-t',
      'pdf',
      '-o',
      './public/pdf/' + post.slug + '.pdf',
      '--standalone',
      '--data-dir',
      './',
      '--metadata',
      'title=' + post.title,
      '--metadata',
      'author=' + post.primary_author.name + ', Gobbledygook',
      '--metadata',
      'date=' + date
    ]
    nodePandoc(src, pdfArgs)
  })
}

export async function generateJats() {
  const posts = await getPosts()
  let src, date, jatsArgs

  await posts.forEach((post) => {
    src = post.html

    date = new Date(post.published_at).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })

    // generate jats
    jatsArgs = [
      '-f',
      'html',
      '-t',
      'jats',
      '-o',
      './public/jats/' + post.slug + '.xml',
      '--standalone',
      '--data-dir',
      './',
      '--metadata',
      'title=' + post.title,
      '--metadata',
      'author=' + post.primary_author.name,
      '--metadata',
      'author.orcid=' + post.primary_author.website,
      '--metadata',
      'date=' + date,
      '--metadata',
      'journal.publisher-id=Gobbledygook',
      '--metadata',
      'journal.title=Gobbledygook',
      '--metadata',
      'license.type=Open Access',
      '--metadata',
      'license.link=https://creativecommons.org/licenses/by/4.0/legalcode',
      '--metadata',
      'license.text=Distributed under the terms of the Creative Commons Attribution 4.0 License.'
    ]
    nodePandoc(src, jatsArgs)
  })
}
