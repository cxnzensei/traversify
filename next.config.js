/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = {
  nextConfig,
  images: {
    domains: ['http://books.google.com', 'https://books.google.com', 'books.google.com']
  },
}
