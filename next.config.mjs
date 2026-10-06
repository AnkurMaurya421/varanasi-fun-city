/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  async redirects() {
    return [
      // "Wedding venue" and "wedding lawn" describe the same physical space —
      // consolidated onto one page instead of publishing duplicate content.
      {
        source: "/wedding-venue-varanasi",
        destination: "/wedding-lawn-varanasi/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
