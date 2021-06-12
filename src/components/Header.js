import Image from "next/image";
import {
  MenuIcon,
  SearchIcon,
  ShoppingCartIcon,
} from "@heroicons/react/outline";

function Header() {
  return (
    <header>
      {/* Top nav */}

      {/* that are utility classes */}

      {/* p-1 = padding 1, py-2  = padding in y-axis 2 */}
      <div className="flex items-center bg-amazon_blue p-1 flex-grow py-2">
        {/* mt-2 = margin-top of 2, and container should be flex , sm:flex-grow-0 => this for mobile view*/}
        <div className="mt-2 flex items-center flex-grow sm:flex-grow-0">
          <Image
            src="https://links.papareact.com/f90"
            width={150}
            height={40}
            objectFit="contain" // this keep the fit the aspect ratio, from after to biginning
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
          <div className="link">
            <p> hello Atul</p>
            <p className="font-bold md:text-sm">Account & List</p>
          </div>
          <div className="link">
            <p>return</p>
            <p className="font-bold md:text-sm">& Order</p>
          </div>
          <div className="relative link flex items-center">
            <span className="absolute top-0 right-0 md:right-10 h-4 w-4 bg-yellow-400 text-center rounded-full  text-black font-bold">
              0
            </span>

            <ShoppingCartIcon className="h-10" />
            <p className="hidden md:inline font-bold md:text-sm mt-2">Basket</p>
          </div>
        </div>
      </div>

      {/* Bottom nav */}

      <div className="flex item-center space-x-3 p-2 pl-6 bg-amazon_blue-light text-white text-sm">
        <p className="link flex items-ceneter">
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
