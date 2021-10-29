import Image from "next/image";
import {
  MenuIcon,
  SearchIcon,
  ShoppingCartIcon,
} from "@heroicons/react/outline";
import { signIn, signOut, useSession } from "next-auth/client";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { selectItems } from "../slices/basketSlice";

function Header() {
  const [session, loading] = useSession();
  const router = useRouter(); // this router hook gives the object
  const items = useSelector(selectItems);

  return (
    <header>
      {/* Top nav */}

      {/* that are utility classes */}

      {/* p-1 = padding 1, py-2  = padding in y-axis 2 */}
      <div className="flex items-center bg-amazon_blue p-1 flex-grow py-2">
        {/* mt-2 = margin-top of 2, and container should be flex , sm:flex-grow-0 => this for mobile view*/}
        <div className="mt-2 flex items-center flex-grow sm:flex-grow-0">
          <Image
            onClick={() => router.push("/")} // we can use link but link is good for text
            src="https://links.papareact.com/f90"
            width={150}
            height={40}
            objectFit="contain" // this keep the fit the aspect ratio, from after to beginning
            className="cursor-pointer"
          />
        </div>

        {/* Search */}
        <div className="hidden sm:flex items-center h-10 rounded-md flex-grow cursor-pointer bg-yellow-400 hover:bg-yellow-500">
          <input
            className="p-2 h-full w-6 flex-grow flex-shrink rounded-l-md focus:outline-none px-4"
            type="text"
          />

          <SearchIcon className="h-12 p-4 " />
        </div>

        {/* Right */}

        <div className="text-white flex  items-center text-xs space-x-6 mx-6 whitespace-nowrap">
          <div
            onClick={!session ? signIn : signOut}
            className="cursor-pointer link"
          >
            <p className="hover:underline">
              {session ? `Hello, ${session.user.name}` : "Sign In "}
            </p>
            {/* <p className="font-bold md:text-sm">Account & List</p> */}
            <p className="font-bold md:text-sm">
              {session ? "Logout" : "Account & List"}
            </p>
          </div>
          <div
            onClick={() => router.push("/orders  ")}
            className="cursor-pointer link"
          >
            <p>Return</p>
            <p className="font-bold md:text-sm">& Order</p>
          </div>
          <div
            onClick={() => router.push("/checkout")}
            className="relative flex items-center"
          >
            <span className="absolute top-0 right-0 md:right-10 h-4 w-4 bg-yellow-400 text-center rounded-full  text-black font-bold">
              {/* 0 */}
              {items.length}
            </span>

            <ShoppingCartIcon className="h-10 cursor-pointer link" />
            <p className="hidden hover:underline cursor-pointer link md:inline font-bold md:text-sm mt-2">
              Basket
            </p>
          </div>
        </div>
      </div>

      {/* Bottom nav */}

      <div className="flex item-center space-x-3 p-2 pl-6 bg-amazon_blue-light text-white text-sm">
        <p className="link flex items-center">
          <MenuIcon className="h-6 mr-1 hover:cursor-pointer" />
          All
        </p>
        <p className="link"> Fresh</p>

        <p className="link"> Electronics </p>
        <p className="link"> Today's deal </p>
        <p className="link hidden lg:inline-flex"> Mobiles </p>
        <p className="link hidden lg:inline-flex">Sports, Fitness & Outdoors</p>
        <p className="link hidden lg:inline-flex"> Home Improvements </p>
        <p className="link hidden lg:inline-flex">Pet Supplies </p>
        <p className="link hidden lg:inline-flex"> Amazon pay </p>
        <p className="link hidden lg:inline-flex"> Kindle ebooks </p>
        <p className="link hidden lg:inline-flex"> Amazon Prime </p>
      </div>
    </header>
  );
}

export default Header;
