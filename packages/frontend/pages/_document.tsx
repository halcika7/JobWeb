import React from 'react';
import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from 'next/document';
import { ServerStyleSheet } from 'styled-components';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props => sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);

      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <meta name="theme-color" content="#000000" />
          <meta name="description" content="Web site" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="application-name" content="djina-sopo" />
          <meta name="apple-mobile-web-app-title" content="djina-sopo" />
          <meta name="msapplication-starturl" content="/" />
          <meta
            name="google-site-verification"
            content="hRUfAvhiBOAuxFvXZfZIiLYb16VrCJCjVUml9GPR_XE"
          />
          <meta name="keywords" content="job, jobs, find jobs" />
          <meta name="description" content="150 words" />
          <meta name="subject" content="Find/Post jobs" />
          <meta name="copyright" content="DBS" />
          <meta name="language" content="EN" />
          <meta name="robots" content="index,follow" />
          <meta name="Classification" content="Business" />
          <meta name="author" content="Haris Beslic" />
          <meta name="copyright" content="DBS" />
          <meta name="owner" content="Haris Beslic" />
          <meta name="url" content="https://djinasopo.netlify.app" />
          <meta name="identifier-URL" content="https://djinasopo.netlify.app" />
          <meta name="coverage" content="Worldwide" />
          <meta name="distribution" content="Global" />
          <meta name="revisit-after" content="7 days" />

          <meta name="og:type" content="job" />
          <meta name="og:image" content="/logo192.png" />
          <meta name="og:site_name" content="DBS" />

          <meta name="og:email" content="me@example.com" />
          <meta name="og:phone_number" content="650-123-4567" />
          <meta name="og:fax_number" content="+1-415-123-4567" />

          <meta name="og:latitude" content="37.416343" />
          <meta name="og:longitude" content="-122.153013" />
          <meta name="og:street-address" content="Marsala Tita 2" />
          <meta name="og:locality" content="Sarajevo" />
          <meta name="og:region" content="BA" />
          <meta name="og:postal-code" content="71000" />
          <meta name="og:country-name" content="BA" />

          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="black" />
          <meta name="format-detection" content="telephone=no" />
          <link rel="apple-touch-startup-image" href="/logo192.png" />
          <link rel="apple-touch-icon" href="/logo192.png" />

          <link rel="canonical" href="https://djinasopo.netlify.app" />
          <link rel="manifest" href="/manifest.json" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link rel="preconnect" href="https://storage.googleapis.com" />
          <link rel="manifest" href="/manifest.json" />
        </Head>
        <body>
          <noscript>You need to enable JavaScript to run this app.</noscript>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
