import { ReactElement } from "react";
import "../styles/globals.css";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps): ReactElement {
  const AnyComponent = Component as any;
  return <AnyComponent {...pageProps} />;
}
export default MyApp;
