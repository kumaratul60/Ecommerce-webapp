import { CheckCircleIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";
import Header from "../components/Header";

function Success() {
  const router = useRouter();

  return (
    <div className="bg-gray-100 h-screen">
      <Header />
      <main className="max-w-screen-lg mx-auto ">
        <div className="flex flex-col p-10 bg-white">
          <div className="flex items-center space-x-2 mb-5">
            <CheckCircleIcon className="text-green-500 h-10" />
            <h1 className="text-3xl">
              {" "}
              Thank you, your order has been confirmed!
            </h1>
          </div>
          {/* If you would like to check
            the status of your order(s),please press the link
            below to countinue the shopping. */}
          <p>
            Thank you for taking the time to complete this order.We'll send a
            confirmation once your order has shipped.If you would like to check
            the status of your order(s),please press the link
            below to see your order.
          </p>
          <button
             onClick={() => router.push("/orders")}
            
            className="button mt-8 "
          >
            Go to my order
          </button>
        </div>
      </main>
    </div>
  );
}

export default Success;
