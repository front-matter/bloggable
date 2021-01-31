// import React from 'react'
// import Axios from 'axios'

// export async function getStaticProps(context) {
//   // fetch your RSS data from Ghost
//   const feed = await Axios.get(
//     'https://feedly.com/i/subscription/feed/https://martinfenner.ghost.io/rss/'
//   )

//   return {
//     props: { feed }
//   }
// }

function Rss(props) {
  return props.feed
}

export default Rss
