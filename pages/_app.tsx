import "../styles/globals.css";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
    return <>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-0Z52XETCEJ"></script>
        <script>
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-0Z52XETCEJ');
        </script>
        <Component {...pageProps} /></>;
}

export default MyApp;
