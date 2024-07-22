"use client";

import Link from "next/link";
import Logo from "./Logo";
import WalletConnect from "./WalletConnect";

const Navbar = () => {
  return (
    <div className="fixed w-full h-14 flex items-center justify-center top-0 left-0 mb-14 bg-black text-white">
      <div className="w-[80%] h-[80%] flex items-center justify-between">
        <Logo />
        <div className="flex items-center justify-center gap-6">
          <Link className="hover:text-gray-400" href="/create">
            + create proposal
          </Link>
          <WalletConnect />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
