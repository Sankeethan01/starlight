import { wixClientServer } from "@/lib/wixClientServer";
import { products } from "@wix/stores";
import Image from "next/image"
import Link from "next/link"
import productImage from '@../../../public/product.png'
import Pagination from "./Pagination";

const PRODUCT_PER_PAGE = 24;

const ProductList = async ({ categoryID, limit, searchParams }: {
    categoryID: string;
    limit?: number;
    searchParams?: any;
}) => {

    const WixClient = await wixClientServer();
    const Query = WixClient
        .products
        .queryProducts()
        .gt("priceData.price", searchParams?.min || 0)
        .lt("priceData.price", searchParams?.max || 900000)
        .eq("collectionIds", categoryID)
        .limit(limit || PRODUCT_PER_PAGE)
        .skip(searchParams?.page ? parseInt(searchParams.page) * (limit || PRODUCT_PER_PAGE) : 0)

    if (searchParams?.sort) {
        console.log("Sort Parameter:", searchParams.sort);
        const [sortType, sortBy] = searchParams.sort.split(" ");

        if (sortType === "asc") {
            Query.ascending(sortBy);
        }
        if (sortType === 'desc') {
            Query.descending(sortBy);
        }
    }

    const response = await Query.find();

    const searchText = searchParams?.searchText

    const filteredProducts = searchText
        ? response.items.filter((product: products.Product) =>
            product.name?.toLowerCase().includes(searchParams?.searchText)
        )
        : response.items;

    if (filteredProducts.length === 0 ) {
        return (
            <div className="mt-12 text-center">
                <p className="text-lg font-semibold">No items found</p>
            </div>
        );
    }


    
        return (
        
            <div className="mt-12 flex gap-x-8 gap-y-16 justify-between flex-wrap">
                {filteredProducts.map((product: products.Product) =>
                (
                    <Link key={product._id} href={`/${product.slug}`} className="w-full flex flex-col gap-4 sm:w-[45%] lg:w-[22%]">
                        <div className="relative w-full h-80">
                            <Image
                                src={product.media?.mainMedia?.image?.url || productImage}
                                alt="product"
                                fill
                                sizes="25vw"
                                className="absolute object-cover rounded-md z-10 hover:opacity-0 transition-opacity easy duration-500"
                            />
                            {product.media?.items && (<Image
                                src={product.media?.items[1].image?.url || productImage}
                                alt="product"
                                fill
                                sizes="25vw"
                                className="absolute object-cover rounded-md"
                            />)}
                        </div>
                        <div className="flex justify-between">
                            <span className="font-medium">{product.name}</span>
                            <span className="font-semibold">LKR {product.priceData?.price}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <button className="rounded-md hover:ring-1 hover:ring-redColor hover:text-redColor w-max py-2 px-4 text-sm hover:bg-white text-white bg-redColor">View Product</button>
                            {product.stock?.quantity! > 0 ? (
                                <p className="text-black">In Stock</p>
                            ) : (
                                <p className="text-gray-400">Out of Stock</p>
                            )}
                        </div>
                    </Link>
                ))
                }
                {/* Pagination */}
                {searchParams?.cat || searchParams?.name ?  
                (
                    <Pagination
                    currentPage={response.currentPage || 0}
                    hasPrev={response.hasPrev()}
                    hasNext={response.hasNext()} />
                ) : null}
                
            </div>
        )  
    }
   


export default ProductList
