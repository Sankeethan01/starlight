"use client"
import Image from "next/image"
import { useState } from "react"

const ProductImages = ({images}:{images:any}) => {

    const [imageIndex, setImageIndex] = useState(0);

    return (
        <div className="">
            {/* Big Image */}
            <div className="h-[500px] relative">
                <Image src={images[imageIndex]?.image?.url}
                    alt="" fill sizes="50vw" className="object-cover rounded-md" />
            </div>
            {/* Small Images */}
            <div className="flex justify-between items-center gap-4 mt-6">
                {images.map((item:any, index:number) => (
                    <div key={item._id} className="w-1/4 h-32 relative gap-4 mt-8 cursor-pointer">
                        <Image src={item.image?.url}
                            alt=""
                            fill
                            sizes="30vw"
                            className="object-cover rounded-md"
                            onClick={()=>setImageIndex(index)}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ProductImages
