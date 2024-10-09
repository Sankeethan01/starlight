import AddQuantity from '@/components/AddQuantity'
import CustomizedProduct from '@/components/CustomizedProduct'
import ProductImages from '@/components/ProductImages'
import { wixClientServer } from '@/lib/wixClientServer'
import { notFound } from 'next/navigation'

const SinglePage = async ({ params }: { params: { slug: string } }) => {

  const wixClient = await wixClientServer();

  const products = await wixClient.products.queryProducts().eq("slug", params.slug).find();

  if (!products.items[0])
    return notFound();

  const product = products.items[0];

  return (
    <div className='mt-10 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 flex
     flex-col lg:flex-row gap-16'>
      {/* Image Section  */}
      <div className='w-full lg:w-1/2 lg:sticky top-20 h-max'>
        <ProductImages images={product.media?.items} />
      </div>
      {/* Rest of the Section  */}
      <div className='w-full lg:w-1/2 flex flex-col gap-6'>
        <h1 className='text-4xl font-medium'>{product.name}</h1>
        <p className='text-gray-500 text-justify'>
          {product.description}
        </p>
        <div className='h-[2px] bg-gray-100' />
        {product.priceData?.discountedPrice === product.priceData?.price ? (
          <div className='flex items-center gap-4'>
            <h2 className='font-medium text-2xl'>LKR {product.priceData?.discountedPrice}</h2>
          </div>
        ) : (
          <div className='flex items-center gap-4'>
            <h3 className='text-xl text-gray-500 line-through'>LKR {product.priceData?.price}</h3>
            <h2 className='font-medium text-2xl'>LKR {product.priceData?.discountedPrice}</h2>
          </div>
        )}
        <div className='h-[2px] bg-gray-100' />
        {/* Customization */}
        {product.variants
          && product.productOptions
          && <CustomizedProduct
            productID={product._id!}
            productVariants={product.variants}
            productOptions={product.productOptions}
          />}
        <div className='h-[2px] bg-gray-100' />
        {/* More Information */}
        {product.additionalInfoSections?.map((info, index) =>
        (
          <div key={index} className='text-sm'>
            <h4 className='font-medium'>{info.title}</h4>
            <p>{info.description}
            </p>
          </div>))}
      </div>
    </div>
  )
}

export default SinglePage
