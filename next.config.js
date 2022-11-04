/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = {
  images: {
    domains: ["links.papareact.com", "img.icons8.com", "avatars.dicebear.com"],
  },
};
