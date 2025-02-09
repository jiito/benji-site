import "../styles/globals.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "jiito",
  openGraph: {
    title: "Ben Allan-Rahill (jiito)",
    images: [
      "https://www.benji.ar/_next/image?url=%2Fblue_spheres.png&w=3840&q=75",
    ],
    url: "https://benji.ar",
  },
  twitter: {
    card: "summary_large_image",
    images: [
      "https://www.benji.ar/_next/image?url=%2Fblue_spheres.png&w=3840&q=75",
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
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
      </head>
      <body>{children}</body>
    </html>
  );
}
