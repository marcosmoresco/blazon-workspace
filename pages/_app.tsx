import React from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import { useRouter } from "next/router";
import { IntlProvider } from "react-intl";
import { ApolloProvider } from "@apollo/client";
import apolloClient from "@utils/apollo-client";
import CssBaseline from "@material-ui/core/CssBaseline";
import Layout from "../src/Layout";
import "../styles/globals.css";
import type { LocalesType } from "../src/locales/types";
import { PortalLocalesPt, PortalLocalesEn } from "../src/portal/locales";

import { ModulesLocalesPt, ModulesLocalesEn } from "../src/modules/locales";

import messages_en from "../src/locales/en.json";
import messages_pt from "../src/locales/pt.json";

const messages: LocalesType = {
  en: {
    ...messages_en,
    ...PortalLocalesEn,
    ...ModulesLocalesEn,
  },
  pt: {
    ...messages_pt,
    ...PortalLocalesPt,
    ...ModulesLocalesPt,
  },
};

//Redux
import { storeWrapper } from "../src/store";

function App(props: any) {
  const { Component, pageProps } = props;
  const router = useRouter();
  const { locale = "en", defaultLocale } = router;

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles?.parentElement?.removeChild(jssStyles);
    }
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>Blazon Workspace</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <ApolloProvider client={apolloClient}>
        <IntlProvider
          locale={locale}
          defaultLocale={defaultLocale}
          messages={messages[locale]}
        >
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </IntlProvider>
      </ApolloProvider>
    </React.Fragment>
  );
}

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};

export default storeWrapper.withRedux(App);
