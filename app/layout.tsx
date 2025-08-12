import { PageLayout } from "@/components/page-layout";
import "@/styles/globals.css";
import { Metadata } from "next";
import { Analytics } from '@vercel/analytics/next';
import Script from "next/script";

export const metadata: Metadata = {
  title: "jiito",
  openGraph: {
    title: "benjamin ar",
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
      <body>

        <Analytics/>
        <PageLayout>
          {children}
        </PageLayout>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
              page_path: window.location.pathname,
            });
          `}
        </Script>
      </body>
    </html>
  );
}
