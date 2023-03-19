import Head from 'next/head'
import ListPage from './list_page'

export default function Home() {
  return (
    <>
      <Head>
        <title>gearbox</title>
        <meta name="description" content="Gearbox for your gear" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable-0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-wrap bg-blue w-full h-screen">
        <div className="h-20 w-full bg-red-50">
          <div>hello</div>
        </div>
        <div className="w-1/6 min-h-full bg-red-500">

        </div>
          <div className="flex flex-col w-5/6 h-5/6 p-3 ">
            <ListPage/>
          </div>
      </main>
    </>
  )
}
