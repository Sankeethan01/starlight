"use client";
import { useCartStore } from "@/hooks/useCartStore";
import Image from "next/image";
import { media as cartImg } from "@wix/sdk";
import { useWixClient } from "@/hooks/useWixClient";
import { useRouter } from "next/navigation";

const CartSection = () => {
  const { cart, isLoading, removeItem, isLoggedIn } = useCartStore();
  const wixClient = useWixClient();
  const router = useRouter(); // Initialize router

  const handleCheckout = () => {
    if (isLoggedIn) {
      router.push("/checkout");
    } else {
      router.push("/");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-md shadow-lg">
      {!cart.lineItems ? (
        <div>Cart is empty</div>
      ) : (
        <>
          <h2 className="text-2xl font-semibold mb-6">Your Cart</h2>
          {/* ITEMS LIST */}
          <div className="flex flex-col gap-8">
            {/* ITEM */}
            {cart.lineItems?.map((item) => (
              <div key={item._id} className="flex gap-6">
                {item.image && (
                  <Image
                    src={cartImg.getScaledToFillImageUrl(item.image, 120, 160, {})}
                    alt="cart-image"
                    width={120}
                    height={160}
                    className="rounded-md object-cover"
                  />
                )}
                <div className="flex flex-col justify-between w-full">
                  {/* TOP */}
                  <div className="">
                    {/* TITLE */}
                    <div className="flex justify-between items-center gap-8">
                      <h3 className="font-semibold text-lg">{item.productName?.original}</h3>
                      <div className="p-2 bg-gray-50 rounded-md flex items-center gap-2">
                        {item.quantity && item.quantity > 1 && (
                          <div className="text-sm text-gray-900">{item.quantity} x</div>
                        )}
                        LKR {item.price?.amount}
                      </div>
                    </div>
                    {/* DESCRIPTION */}
                    <div className="text-sm text-gray-500">{item.availability?.status}</div>
                  </div>
                  {/* BOTTOM */}
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Qty: {item.quantity}</span>
                    <span
                      className="text-blue-500 cursor-pointer"
                      style={{ cursor: isLoading ? "not-allowed" : "pointer" }}
                      onClick={() => removeItem(wixClient, item._id!)}
                    >
                      Remove
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* SUBTOTAL */}
          <div className="mt-8">
            <div className="flex items-center justify-between font-semibold text-lg">
              <span>Subtotal</span>
              <span>LKR {cart.subtotal.amount}</span>
            </div>
            <p className="text-gray-500 text-sm mt-2 mb-6">Shipping fees calculated at checkout</p>
            <div className="flex justify-between">
              <div></div>
              <button
                className="rounded-md py-3 px-4 bg-redColor
               text-white disabled:cursor-not-allowed disabled:opacity-30 hover:text-redColor hover:bg-white hover:ring-1 hover:ring-redColor"
                disabled={isLoading}
                onClick={handleCheckout}
              >
                Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CartSection;
