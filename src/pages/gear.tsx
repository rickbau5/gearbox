
import React from 'react'
import Layout from "@/components/Layout"
import { InteractiveItemList, InteractiveItemListSearchBox } from '@/components/InteractiveItemList'
import MockData from '@/utils/mock_data'

const GearPage = () => {
  return (
    <>
      <Layout pageName="My Gear" className="pr-3 mt-0">
        <InteractiveItemList data={MockData()}>
        </InteractiveItemList>
      </Layout>
    </>
  )
}

export default GearPage;