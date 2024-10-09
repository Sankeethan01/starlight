import { create } from 'zustand'
import { currentCart } from '@wix/ecom'
import { WixClient } from '@/context/wixContext';

type CartState = {
  cart:currentCart.Cart;
  isLoading: boolean;
  counter: number;
  isLoggedIn: boolean;
  getCart: (wixClient: WixClient) => void;
  addItem: (wixClient: WixClient, productId: string, variantId: string, quantity: number) => void;
  removeItem: (wixClient: WixClient, itemId: string) => void;
  setLoginStatus: (status: boolean) => void;
  clearCart: (WixClient:WixClient)=>Promise<void>;
}

export const useCartStore = create<CartState>((set) => ({
  cart : { lineItems: [] },
  isLoading: true,
  counter: 0,
  isLoggedIn: false,
  getCart: async (wixClient) => {
    try {
      const cart = await wixClient.currentCart.getCurrentCart();
      set({
        cart: cart || { lineItems: [], subtotal: { amount: 0 } },
        isLoading: false,
        counter: cart?.lineItems.length || 0,
      });
    } catch (err) {
      set((prev) => ({ ...prev, isLoading: false }));
    }

  },
  addItem: async (wixClient, productId, variantId, quantity) => {

    set((prev) => ({ ...prev, isLoading: true }))

    const response = await wixClient.currentCart.addToCurrentCart({
      lineItems: [
        {
          catalogReference: {
            appId: process.env.NEXT_PUBLIC_WIX_APP_ID!,
            catalogItemId: productId,
            ...(variantId && {
              options: {
                variantId
              }
            })
          },
          quantity: quantity,
        }
      ]
    })

    set({
      cart: response.cart,
      counter: response.cart?.lineItems.length,
      isLoading: false
    });

  },

  removeItem: async (wixClient,itemId) => {

    set((prev) => ({ ...prev, isLoading: true }))

    const response = await wixClient.currentCart.removeLineItemsFromCurrentCart([
      itemId
    ])

    set({
      cart: response.cart,
      counter: response.cart?.lineItems.length,
      isLoading: false
    });

  },
  setLoginStatus: (status) => set({ isLoggedIn: status }),

  clearCart: async (wixClient) => {
    set((prev) => ({ ...prev, isLoading: true }));

    try {
      await wixClient.currentCart.deleteCurrentCart();

      set({
        cart: { lineItems: [] }, 
        counter: 0,
        isLoading: false,
      });
    } catch (error) {
      console.error('Error clearing cart:', error);
      set((prev) => ({ ...prev, isLoading: false }));
    }
  },
}));
