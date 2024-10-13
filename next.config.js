/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  output: "export",

  // Optional: Change links `/me` -> `/me/` and emit `/me.html` -> `/me/index.html`
  // trailingSlash: true,

  // Optional: Prevent automatic `/me` -> `/me/`, instead preserve `href`
  // skipTrailingSlashRedirect: true,

  // Optional: Change the output directory `out` -> `dist`
  // distDir: 'dist',

  webpack: (
    /** @type {import('webpack').Configuration} */
    webpackConfig,
    { isServer },
  ) => {
    /** @type {import('webpack').RuleSetRule[]} */ (
      /** @type {import('webpack').ModuleOptions} */
      (webpackConfig.module).rules
    ).push({
      test: /\.jpg$/,
      use: [
        {
          loader: "file-loader",
          options: {
            publicPath: "/_next/static/media/",
            outputPath: `${isServer ? "../" : ""}static/media/`,
            name: "[name].[hash].[ext]",
          },
        },
      ],
    });

    return webpackConfig;
  },
};

module.exports = nextConfig;
