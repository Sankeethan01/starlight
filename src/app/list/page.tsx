import CategoryList from '@/components/CategoryList'
import Filter from '@/components/Filter'
import ProductList from '@/components/ProductList'
import Skeleton from '@/components/Skeleton'
import { wixClientServer } from '@/lib/wixClientServer'
import React, { Suspense } from 'react'

const ListPage = async ({searchParams}:{searchParams:any}) => {

  const wixClient = await wixClientServer();

    const productList = await wixClient.collections.getCollectionBySlug(searchParams.cat || "all-products");

  return (
    <div className='px-4 md:px-4 lg:px-10 xl:px-28 2xl:px-60 mt-12'>
      {/* Category List */}
      <Suspense fallback={<Skeleton  />}>
      <CategoryList />
      </Suspense>
      {/* Filter Component */}
      <Filter />
      {/* Products Section */}
      <h1 className='mt-12 text-2xl font-semibold'>{productList.collection?.name}</h1>
      <Suspense fallback={<Skeleton />}>
      <ProductList 
      categoryID={productList.collection?._id || "00000000-000000-000000-000000000001"}
      searchParams={searchParams}/>
      </Suspense>
    </div>
  )
}

export default ListPage




