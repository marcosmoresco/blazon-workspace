module.exports = {
  reactStrictMode: true,
  distDir: 'build',
  i18n: {
    // These are all the locales you want to support in
    // your application
    locales: ["en", "pt"],
    // This is the default locale you want to be used when visiting
    // a non-locale prefixed path e.g. `/hello`
    defaultLocale: "en",
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ["i.ibb.co", "localhost"],
  },
}