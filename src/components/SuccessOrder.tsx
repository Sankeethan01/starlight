import { useRouter } from "next/navigation";
import successIcon from '@/../../public/success.png'
import Image from "next/image";
import Confetti from "react-confetti";

const SuccessOrder = () => {
  const router = useRouter();

  const handleHomeRedirect = () => {
    router.push('/');
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      
      <Confetti width={1500} height={1000} />
     
      <Image
        src={successIcon}
        alt="Success"
        width={150}
        height={150}
        className="mt-6"
      />
      <h1 className="text-2xl font-bold text-green-600 mt-6">Order Submitted Successfully!</h1>
      <p className="text-lg text-gray-700 mt-2">Check your email for further details.</p>
      <button
        onClick={handleHomeRedirect}
        className="mt-6 bg-redColor text-white p-3 rounded-md hover:bg-white hover:text-redColor hover:ring-1 hover:ring-redColor transition duration-200"
      >
        Back to Homepage
      </button>
    </div>
  );
};

export default SuccessOrder;
