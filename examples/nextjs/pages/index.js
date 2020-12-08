import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useIntercom } from 'react-use-intercom'

export default function Home() {
  const { boot } = useIntercom(); 

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <button onClick={() => boot()}>Boot</button>
      </main>
    </div>
  )
}
