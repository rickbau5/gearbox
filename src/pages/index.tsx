import Head from 'next/head'
import ListPage from './list_page'
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <>
      <Head>
        <title>gearbox</title>
        <meta name="description" content="Gearbox for your gear" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable-0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col bg-blue">
        <div className={`${styles.header} bg-red-50`}>
          <div>hello</div>
        </div>
        <div className="flex flex-row">
          <div className={`${styles.sidebar} bg-red-500`}>

          </div>
          <div className="w-full p-3">
            <ListPage/>
          </div>
        </div>
      </main>
    </>
  )
}
