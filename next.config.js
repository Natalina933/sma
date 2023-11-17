/** @type {import('next').NextConfig} */


const nextConfig = {
    experimental: {
      // experimental options here
    },
    webpack: (config, { isServer }) => {
      config.resolve.alias = {
        ...config.resolve.alias,
        '@/pages': path.resolve(__dirname, 'src/pages'),
        '@/modules': path.resolve(__dirname, 'src/modules'),
      };
      return config;
    },
  };