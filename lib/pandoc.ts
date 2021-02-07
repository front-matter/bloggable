import { getPosts } from './posts'
import nodePandoc from 'node-pandoc'

export async function generateEpub() {
  const posts = await getPosts()
  let src, date, epubArgs, pdfArgs, callback

  callback = (err, result) => {
    if (err) console.error(err)
    return result
  }

  posts.forEach((post) => {
    // generate ePub
    src = post.html

    date = new Date(post.published_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })

    const epubArgs = ['-f', 'html', '-t', 'epub', '-o', './public/epub/' + post.slug + '.epub', '--standalone', '--data-dir', './']
    nodePandoc(src, epubArgs, callback)

    // generate pdf
    const pdfArgs = ['-f', 'html', '-t', 'pdf', '-o', './public/pdf/' + post.slug + '.pdf', '--standalone', '--data-dir', './', '--metadata', 'title=' + post.title, '--metadata', 'author=' + post.primary_author.name + ', Gobbledygook', '--metadata', 'date=' + date]
    nodePandoc(src, pdfArgs, callback)
  })
}
