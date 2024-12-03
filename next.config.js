/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
      domains: ['sparetrade-bucket.s3.ap-south-1.amazonaws.com'],
    },
}

module.exports = nextConfig
