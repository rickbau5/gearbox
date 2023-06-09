import Layout from '@/components/Layout'
import Link from 'next/link'

export default function Home() {
  return (
    <>
      <Layout pageName="Home">
        <div className="flex flex-col h-full mr-3 justify-center items-center">
          <Link href="/gear">
            <span className="underline">view your gear</span> 
            {" "}
            <span className="text-orange">{">"}</span>
            </Link>
        </div>
      </Layout>
    </>
  )
}
