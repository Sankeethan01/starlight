import { wixClientServer } from "@/lib/wixClientServer"
import Image from "next/image"
import Link from "next/link"
import catImg from "@/../../public/category.png"

const CategoryList = async () => {

    const wixClient = await wixClientServer();

    const categories = await wixClient.collections.queryCollections().find();

    return (
        <div className="px-4 overflow-x-scroll scrollbar-hide">
            <div className="flex gap-4 md:gap-8">
                {categories.items.map((category) =>
                (<Link key={category._id} href={`/list?cat=${category.slug}`} className="flex-shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5">
                    <div className="relative bg-slate-100 w-full h-96">
                        <Image src={category.media?.mainMedia?.image?.url || catImg}
                            alt=""
                            fill sizes="20vw" className="object-cover rounded-md"
                        />
                    </div>
                    <h1 className="mt-8 font-light text-clip tracking-wide">{category.name}</h1>
                </Link>))}
            </div>
        </div>
    )
}

export default CategoryList
