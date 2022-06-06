/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  webp: {
    preset: "default",
    quality: 100,
  },
  images: {
    domains: ['cdn.pixabay.com', 'scontent.flpb2-2.fna.fbcdn.net', 'server-miguel.herokuapp.com', 'localhost'],
    formats: ['image/avif', 'image/webp'],
    loader: 'akamai',
    path: '',
  },
}

module.exports = nextConfig
