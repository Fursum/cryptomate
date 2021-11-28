import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Provider } from "next-auth/client";
import Layout from '@components/globalLayout';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}
export default MyApp
