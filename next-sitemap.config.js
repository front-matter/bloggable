/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: process.env.SITE_URL || 'https://blog.front-matter.io',
  generateRobotsTxt: true,
  exclude: [
    '/features',
    '/pricing',
    '/resources',
    '/open-source',
    '/support',
    '/team',
    '/categories/*'
  ],
}
