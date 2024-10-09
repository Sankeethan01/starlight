"use client"

import Image from "next/image";
import { useEffect, useState } from "react"
import menuIcon from '../../public/menu.png';
import Link from "next/link";
import { useCartStore } from "@/hooks/useCartStore";
import { useRouter } from "next/navigation";
import { useWixClient } from "@/hooks/useWixClient";
import Cookies from "js-cookie";

const Menu = () => {

    const [openMenu, setOpenMenu] = useState(false);
    const { isLoggedIn, setLoginStatus, counter,getCart } = useCartStore();
    const router = useRouter();
    const wixClient = useWixClient();

    const handleAccess = async () => {


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

        const handleLogout = async () => {
            setOpenMenu((prev) => !prev)
            Cookies.remove("refreshToken");
            const { logoutUrl } = await wixClient.auth.logout(window.location.href);
            router.push(logoutUrl);
        }

        if (!isLoggedIn) {
            setOpenMenu((prev) => !prev)
            await wixedLogin();
            setLoginStatus(true);
        }
        else {
            handleLogout()
        }

    };


    const handleCart = () => {
        setOpenMenu((prev) => !prev)

        if (!isLoggedIn) {
            handleAccess();
        }
        else {
            router.push("/cart");
        }
    }

    useEffect(() => {
        if (isLoggedIn) {
          getCart(wixClient); 
        }
        router.push("/");
      }, [isLoggedIn, getCart, wixClient]);




    return (
        <div className="">
            <Image src={menuIcon} alt="menu-icon" width={28}
                height={28} className="cursor-pointer"
                onClick={() => setOpenMenu((prev) => !prev)}
            />
            {openMenu &&
                (
                    <div className="absolute bg-black text-white left-0 top-20
                     w-full min-h-[calc(100vh-80px)] flex flex-col items-center justify-center
                      gap-8 text-xl z-10">
                        <Link href='/' onClick={() => setOpenMenu((prev) => !prev)}>Home</Link>
                        <Link href='/list?cat=all-products' onClick={() => setOpenMenu((prev) => !prev)}>Categories</Link>
                        <Link href='/about' onClick={() => setOpenMenu((prev) => !prev)}>About</Link>
                        <Link href='/contact' onClick={() => setOpenMenu((prev) => !prev)}>Contact</Link>
                        <Link href='/' onClick={handleAccess}>{isLoggedIn ? "Logout" : "Login"}</Link>
                        <Link href='/cart' onClick={handleCart}>Cart({counter})</Link>
                    </div>)
            }
        </div>
    )
}

export default Menu
