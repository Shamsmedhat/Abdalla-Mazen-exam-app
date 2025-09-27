/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["exam.elevateegy.com"],
  },
  // redirects: async () => {
  //   return [{ source: "/", destination: "/dashboard", permanent: true }];
  // },
};

export default nextConfig;
