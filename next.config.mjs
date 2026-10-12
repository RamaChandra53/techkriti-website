/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: { unoptimized: true },
  async redirects() {
    return [
      { source: "/events/image-prompting", destination: "/events/brand-o-ween", permanent: true },
      { source: "/events/tech-treasure-hunt", destination: "/events/treasure-hunt-exe", permanent: true },
      { source: "/events/risk-poly", destination: "/events/corpse-to-corporation", permanent: true },
      { source: "/events/valo-and-codm", destination: "/events/esports", permanent: true },
      { source: "/events/period-cramps-simulator", destination: "/events/period-cramps", permanent: true },
    ];
  },
};

export default nextConfig;
