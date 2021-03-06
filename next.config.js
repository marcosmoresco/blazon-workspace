module.exports = {
  reactStrictMode: false,
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
  env: {
    customKey: 'my-value',
  },
  serverRuntimeConfig: {   
    graphqlUrl: process.env.NEXT_PUBLIC_GRAPHQL_SERVER,
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
    graphqlUrl: process.env.NEXT_PUBLIC_GRAPHQL_SERVER,
  },
}