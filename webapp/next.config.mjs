/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Product artwork in public/products is our own generated SVG.
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
