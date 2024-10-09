"use client"

import { useCartStore } from "@/hooks/useCartStore";
import { useWixClient } from "@/hooks/useWixClient";
import { useState } from "react"

const AddQuantity = (
    {
        productId,
        variantId,
        stockNumber,
    }: {
        productId: string;
        variantId: string;
        stockNumber: number;
    }
) => {

    const [quantity, setQuantity] = useState(1);
    const wixClient = useWixClient();

    const handleQuantity = (type: "-" | "+") => {
        if (type === '-' && quantity > 1)
            setQuantity((prev) => prev - 1)
        if (type === '+' && quantity < stockNumber)
            setQuantity((prev) => prev + 1)
    }

    const { addItem, isLoading } = useCartStore();

    return (
        <div className="flex flex-col gap-4">
            <h4 className="font-medium">Add Quantity</h4>
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="bg-gray-100 py-2 px-4 rounded-3xl flex items-center justify-between w-32">
                        <button className="cursor-pointer text-2xl" onClick={() => handleQuantity("-")}>-</button>
                        {quantity}
                        <button className="cursor-pointer text-2xl" onClick={() => handleQuantity("+")}>+</button>
                    </div>
                    {stockNumber < 1 ? (
                        <div className="text-xl text-redColor">
                            Out Of Stock
                        </div>
                    ) : (
                        <div className="text-xs">Only <span className="text-redColor">{stockNumber} items</span> left</div>
                    )}

                </div>
                {
                    stockNumber < 1 ? (
                         ""
                    ) : (
                            <button className = "rounded-xl hover:ring-1 hover:ring-redColor hover:bg-white hover:text-redColor w-max py-2 px-6 test-xs bg-redColor text-white cursor-pointer" disabled={isLoading} onClick={() => addItem(wixClient, productId, variantId, quantity)} >
                             Add to Cart
                          </button> )
            
                }

        </div>
        </div >
    )
}

export default AddQuantity
