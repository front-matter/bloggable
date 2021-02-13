import { getPosts } from './posts'
import nodePandoc from 'node-pandoc-promise'

export async function generateEpub() {
  const posts = await getPosts()
  let src, date, epubArgs, pdfArgs, jatsArgs

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
      'date=' + date,
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
