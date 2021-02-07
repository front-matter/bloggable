import { getPosts } from './posts'
import nodePandoc from 'node-pandoc'

export async function generateEpub() {
  const posts = await getPosts()
  let src, date, epubArgs, pdfArgs, jatsArgs, callback

  callback = (err, result) => {
    if (err) console.error(err)
    return result
  }

  posts.forEach((post) => {
    src = post.html

    date = new Date(post.published_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })

    // generate ePub
    epubArgs = ['-f', 'html', '-t', 'epub', '-o', './public/epub/' + post.slug + '.epub', '--standalone', '--data-dir', './']
    nodePandoc(src, epubArgs, callback)

    // generate pdf
    pdfArgs = ['-f', 'html', '-t', 'pdf', '-o', './public/pdf/' + post.slug + '.pdf', '--standalone', '--data-dir', './', '--metadata', 'title=' + post.title, '--metadata', 'author=' + post.primary_author.name + ', Gobbledygook', '--metadata', 'date=' + date]
    nodePandoc(src, pdfArgs, callback)

    // generate jats
    const jatsArgs = ['-f', 'html', '-t', 'jats', '-o', './public/jats/' + post.slug + '.xml', '--standalone', '--data-dir', './', '--metadata', 'title=' + post.title, '--metadata', 'author=' + post.primary_author.name, '--metadata', 'date=' + date, '--metadata', 'journal.title=Gobbledygook', '--metadata', 'license.type=Open Access', '--metadata', 'license.link=https://creativecommons.org/licenses/by/4.0/legalcode', '--metadata', 'license.text=Distributed under the terms of the Creative Commons Attribution 4.0 License.',]
    nodePandoc(src, jatsArgs, callback)
  })
}
