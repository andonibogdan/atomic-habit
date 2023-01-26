import Layout from 'components/layout'
import '../styles/globals.css'

export default function App({ Component, pageProps }) {
  return <Layout childeren={<Component {...pageProps} />} />
}
