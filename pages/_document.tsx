import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        {/* Global Site Tag (gtag.js) - Google Analytics */}
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
              page_path: window.location.pathname,
            });
          `,
          }}
        />
        <meta property="og:title" content="Ben Allan-Rahill (jiito)" />
        <meta
          property="og:image"
          content="https://www.benji.ar/_next/image?url=%2Fblue_spheres.png&w=3840&q=75"
        />
        <meta property="og:url" content="https://benji.ar" />
        <meta
          name="twitter:card"
          content="https://www.benji.ar/_next/image?url=%2Fblue_spheres.png&w=3840&q=75"
        />
      </Head>
      <title>jiito</title>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
