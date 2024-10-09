"use client"
import cartImg from '@/../../public/cart.png';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import CardModal from './CardModal';
import { useWixClient } from '@/hooks/useWixClient';
import Cookies from 'js-cookie';
import { useCartStore } from '@/hooks/useCartStore';

const NavIcons = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter();
  const wixClient = useWixClient();

  const { cart, getCart, counter, isLoggedIn, setLoginStatus } = useCartStore();
  

  console.log(cart)


  const handleProfile = async () => {

    const wixedLogin = async () => {
      try {
        const loginRequestData = wixClient.auth.generateOAuthData(
          "https://starlightonlineshopping.vercel.app/oAuth-callback",
        ); // Pointing to the callback URL

        localStorage.setItem("oAuthRedirectData", JSON.stringify(loginRequestData));

        const { authUrl } = await wixClient.auth.getAuthUrl(loginRequestData);
        window.location.href = authUrl; // Redirects to Wix for login

      } catch (error) {
        console.error("Error during login process:", error);
        alert("An error occurred while trying to log in.");
      }
    };

    if (!isLoggedIn) {
      await wixedLogin();
      setLoginStatus(true); // Set login status in Zustand
    } 

  };

  const handleCartOpen = async () => {
    if(isLoggedIn)
    {
      setIsCartOpen((prev) => !prev);
    }
    handleProfile();
  }

  useEffect(() => {
    if (isLoggedIn) {
      getCart(wixClient); 
    }
    router.push("/");
  }, [isLoggedIn, getCart, wixClient]);


  const handleLogout = async () => {
    setIsLoading(true);
    Cookies.remove("refreshToken");
    const { logoutUrl } = await wixClient.auth.logout(window.location.href);
    setIsLoading(false);
    router.push(logoutUrl);
  }



  return (
    <div className='flex items-center justify-between gap-4 lg:gap-6 relative'>
      {
        isLoggedIn ? (
          <button className='rounded-md bg-redColor text-white text-sm px-3 py-2 cursor-pointer hover:bg-white
          hover:ring-1 hover:ring-redColor hover:text-redColor'
            onClick={handleLogout} disabled={isLoading}>{isLoading ? "Logging out" : "Logout"}</button>
        ) : (
          <button className='rounded-md bg-redColor text-white text-sm px-3 py-2 cursor-pointer hover:bg-white
          hover:ring-1 hover:ring-redColor hover:text-redColor' onClick={handleProfile}>{isLoading ? "Logging in" : "Login"}</button>
        )
      }
      <div className='relative cursor-pointer' onClick={handleCartOpen}>
        <Image src={cartImg} alt='cart'
          width={22} height={22}
        />
        <div className='absolute -top-4 -right-4 w-6 h-6 text-white
         bg-redColor rounded-full text-sm flex items-center justify-center'>
          {counter}
        </div>
      </div>
      {isCartOpen && (
        <CardModal cartOpen={setIsCartOpen}/>
      )}
    </div>
  )
}

export default NavIcons
