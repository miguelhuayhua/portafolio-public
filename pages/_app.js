import '../styles/applications.scss'
import { store, wrapper } from '../redux'
import { Provider } from 'react-redux';
import { SSRProvider } from 'react-bootstrap'
import { CookiesProvider, withCookies } from 'react-cookie';
import Head from 'next/head';
function MyApp({ Component, pageProps}) {
  return <SSRProvider>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>

  </SSRProvider>
}

export default wrapper.withRedux(withCookies(MyApp))
