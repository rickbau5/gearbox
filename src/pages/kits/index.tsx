import Layout from '@/components/Layout'
import Link from 'next/link'

export default function Home() {
  return (
    <>
      <Layout pageName="Kits">
        <div className="flex flex-col h-full mr-3 justify-center items-center">
          <Link href="/kits/build">
            <span className="underline">build a new kit</span> 
            {" "}
            <span className="text-orange">{">"}</span>
            </Link>
        </div>
      </Layout>
    </>
  )
}
