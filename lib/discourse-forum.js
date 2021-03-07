// https://dev.to/shahbaz17/discourse-thread-integration-on-a-react-website-4369
import { useEffect } from 'react'

export default function DiscourseForum(slug) {
  useEffect(() => {
    window.DiscourseEmbed = {
      discourseUrl: 'https://discuss.sensiblescience.io/',
      discourseEmbedUrl: 'https://blog.sensiblescience.io/posts/' + slug
    }

    const d = document.createElement('script')
    d.type = 'text/javascript'
    d.async = true
    d.src = window.DiscourseEmbed.discourseUrl + 'javascripts/embed.js'
    ;(
      document.getElementsByTagName('head')[0] ||
      document.getElementsByTagName('body')[0]
    ).appendChild(d)
  }, [])

  return (
    <div>
      <h2 className="my-4">Comments</h2>
      <div id="discourse-comments"></div>
    </div>
  )
}
