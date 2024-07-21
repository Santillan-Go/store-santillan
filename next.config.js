/** @type {import('next').NextConfig} */
// const nextConfig = {};

module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "fakestoreapi.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};
// module.exports = {
//   images: {
//     domains: ["fakestoreapi.com"],
//   },
// };

// module.exports = {
//   images: {
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: "fakestoreapi.com",
//         port: "",
//         pathname: "/products/**",
//       },
//     ],
//   },
// };
// export default nextConfig;
// module.exports = nextConfig;
