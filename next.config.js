/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  output: "export",

  images: { unoptimized: true },

  // Optional: Change links `/me` -> `/me/` and emit `/me.html` -> `/me/index.html`
  // trailingSlash: true,

  // Optional: Prevent automatic `/me` -> `/me/`, instead preserve `href`
  // skipTrailingSlashRedirect: true,

  // Optional: Change the output directory `out` -> `dist`
  // distDir: 'dist',

  webpack: (config, options) => {
    console.log(config.module.rules);
    config.module.rules.push({
      test: /\.(jpe?g|png|svg|gif|ico|eot|ttf|woff|woff2|mp4|pdf|webm|txt)$/,
      type: "asset/resource",
      generator: {
        filename: "static/chunks/[path][name].[hash][ext]",
      },
    });

    // remove nextJsImageLoader
    config.module.rules = config.module.rules.filter(
      (rule) => rule.loader !== "next-image-loader",
    );

    return config;
  },
};

module.exports = nextConfig;
