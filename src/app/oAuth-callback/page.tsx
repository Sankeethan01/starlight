"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useWixClient } from "@/hooks/useWixClient";
import Cookies from "js-cookie";
import { useCartStore } from "@/hooks/useCartStore";
import Loading from "@/components/Loading";
import { toast, Toaster } from "react-hot-toast"; 

const OAuthCallback = () => {
  const router = useRouter();
  const wixClient = useWixClient();
  const {setLoginStatus} = useCartStore();

  useEffect(() => {
    const handleOAuthCallback = async () => {
      try {
        console.log("Parsing OAuth data from URL...");
        const returnedOAuthData = await wixClient.auth.parseFromUrl();
  
        // Check for errors in the returned OAuth data
        if (returnedOAuthData.error) {
          throw new Error(`OAuth Error: ${returnedOAuthData.errorDescription}`);
        }
  
        // Fetch login request data from local storage
        const loginRequestData = JSON.parse(localStorage.getItem("oAuthRedirectData") || "{}");
  
        console.log("Fetching member tokens...");
        const memberTokens = await wixClient.auth.getMemberTokens(
          returnedOAuthData.code,
          returnedOAuthData.state,
          loginRequestData
        );
  
        // Ensure tokens are received
        if (!memberTokens) {
          throw new Error("Failed to fetch member tokens.");
        }
  
        // Store refresh token in cookies and set access tokens
        Cookies.set("refreshToken", JSON.stringify(memberTokens.refreshToken), { expires: 2 });
        wixClient.auth.setTokens(memberTokens);
        
        // Redirect user to home or profile page after successful login
        setLoginStatus(true);
        router.push("/");
  
      } catch (error: any) {
        console.error("Error during OAuth callback:", error);
        toast.error(`An error occurred during login: ${error.message}`);
        router.push("/"); 
      }
    };
  
    handleOAuthCallback();
  }, [router, wixClient]);
  

  return (
    <>
    <Loading loadText="Logging in, please wait..." />
    <Toaster />
    </>
  );
};

export default OAuthCallback;
