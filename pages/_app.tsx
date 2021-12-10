import App from "next/app";
import type { AppContext, AppProps } from "next/app";
import { Provider as AuthProvider } from "next-auth/client";

import Layout from "@components/globalLayout";

import "../styles/globals.css";

//@ts-ignore
function MyApp({ Component, pageProps, cookies }: AppProps) {
  return (
    <AuthProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  );
}
export default MyApp;
