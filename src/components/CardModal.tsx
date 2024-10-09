"use client"
import { useCartStore } from "@/hooks/useCartStore";
import Image from "next/image";
import { media as cartImg } from "@wix/sdk";
import { useWixClient } from "@/hooks/useWixClient";
import { useRouter } from "next/navigation";

const CardModal = ({cartOpen}:{cartOpen:(isCartOpen: boolean) => void}) => {

  const { cart, isLoading ,removeItem, isLoggedIn } = useCartStore();
  const wixClient = useWixClient();
  const router = useRouter(); // Initialize router
  const currentCart = wixClient.currentCart.getCurrentCart();

  const handleCheckout = () => {
    cartOpen(false);
    if(isLoggedIn)
    {
      router.push("/checkout");
    }
    else
    {
      router.push("/");
    }
    
  };

  const handleCartSection = () => {
    cartOpen(false);
    if(isLoggedIn)
    {
      router.push("/cart");
    }
    else
    {
      router.push("/");
    }
  }

  const subtotal = cart.lineItems?.reduce((acc, item) => {
    const priceAmount = Number(item.price?.amount) || 0;
    const quantity = Number(item.quantity) || 1;
    
    return acc + (priceAmount * quantity);
  }, 0);

  return (
    <div className="w-max absolute p-4 rounded-md shadow-[0_3px_10px_rgb(0,0,0,0.2)] bg-white top-12 right-0 flex flex-col gap-6 z-20">
      {!cart.lineItems ? (
        <div>Cart is empty</div>
      ) : (
        <>
          <h2 className="text-xl">Shopping Cart</h2>
          {/* ITEMS LIST */}
          <div className="flex flex-col gap-8">
            {/* ITEM */}
            {cart.lineItems?.map((item) => (
              <div key={item._id} className="flex gap-4">
                {item.image && <Image src={cartImg.getScaledToFillImageUrl(item.image, 72, 96, {})}
                  alt="cart-image"
                  width={72}
                  height={96}
                  className="rounded-md object-cover"
                />}
                <div className="flex flex-col justify-between w-full">
                  {/* TOP */}
                  <div className="">
                    {/* TITLE */}
                    <div className="flex justify-between items-center gap-8">
                      <h3 className="font-semibold">{item.productName?.original}</h3>
                      <div className="p-1 bg-gray-50 rounded-sm flex items-center gap-2">
                        {item.quantity && item.quantity > 1 && <div className="text-xs text-gray-900">{item.quantity} x </div>}
                        LKR {item.price?.amount}</div>
                    </div>
                    {/* DESCRIPTION */}
                    <div className="text-sm text-gray-500">{item.availability?.status}</div>
                  </div>
                  {/* BOTTOM */}
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Qty: {item.quantity}</span>
                    <span className="text-blue-500"
                     style={{cursor : isLoading ? "not-allowed" : "pointer"}}
                    onClick={()=>removeItem(wixClient,item._id!)}>Remove</span>
                  </div>
                </div>
              </div>))}

          </div>

          {/* SUBTOTAL */}
          <div className="">
            <div className="flex items-center justify-between font-semibold">
              <span className="">Subtotal</span>
              <span className="">LKR {subtotal}</span>
            </div>
            <p className="text-gray-500 text-sm mt-2 mb-4">Shipping fees calculated at checkout</p>
            <div className="flex justify-between text-sm">
              <button className="rounded-md py-3 px-4 ring-1 ring-gray-300 "
              onClick={handleCartSection}
              >View Cart</button>
              <button 
              className="rounded-md py-3 px-4 bg-redColor
               text-white disabled:cursor-not-allowed disabled:opacity-30 hover:text-redColor hover:bg-white hover:ring-1 hover:ring-redColor" 
               disabled={isLoading}
               onClick={handleCheckout}
               >Checkout</button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default CardModal
