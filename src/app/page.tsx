
import CategoryList from "@/components/CategoryList"
import ProductList from "@/components/ProductList"
import Skeleton from "@/components/Skeleton"
import Slider from "@/components/Slider"
import { WixClientContext } from "@/context/wixContext"
import { useWixClient } from "@/hooks/useWixClient"
import { wixClientServer } from "@/lib/wixClientServer"
import { Suspense, useEffect } from "react"

const HomePage = async () => {

  // const WixClient = await wixClientServer();
  // const response = await WixClient.products.queryProducts().find();
  // console.log(response);

  // useEffect(() => {
  //   const getProducts = async () => {
  //     const response = await WixClient.products.queryProducts().find();
  //     console.log(response);
  //   };

  //   getProducts();
  // }, [WixClient])

  return (
    <div>
      <Slider />
      <div className="mt-24 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
        <h1 className="text-2xl">
          Featured Products
        </h1>
        <Suspense fallback={<Skeleton />}>
          <ProductList categoryID={process.env.FEATURED_PRODUCTS_CATEGORY_ID!} limit={4} />
        </Suspense>
      </div>
      <div className="mt-24">
        <h1 className="text-2xl px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 mb-12">
          Categories
        </h1>
        <Suspense fallback={<Skeleton />}>
          <CategoryList />
        </Suspense>
      </div>
      <div className="mt-24 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
        <h1 className="text-2xl">
          New Products
        </h1>
        {/* <ProductList /> */}
        <ProductList categoryID={process.env.COLLECTION_PRODUCTS_CATEGORY_ID!} limit={4}/>
      </div>
    </div>
  )
}

export default HomePage