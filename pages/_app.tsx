import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { RecoilRoot } from 'recoil';
import Layout from '../components/Layout/Layout';
import '../styles/globals.css';
function MyApp({ Component, pageProps }) {
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);
  return (
    <RecoilRoot>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </RecoilRoot>
  );
}

export default MyApp;
